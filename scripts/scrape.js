#!/usr/bin/env node
"use strict";

const { chromium } = require("playwright");

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

const ARGS = parseArgs(process.argv);
const SITE = ARGS.site;
const TIMEOUT = Number(ARGS.timeout) || 30000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function withBrowser(fn) {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    });
    context.setDefaultTimeout(TIMEOUT);
    const page = await context.newPage();
    return await fn(page, context);
  } finally {
    await browser.close();
  }
}

async function retry(fn, retries = 1) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

// ---------------------------------------------------------------------------
// Reddit scraper — uses Reddit's public JSON API (no browser needed)
// ---------------------------------------------------------------------------
async function scrapeReddit() {
  const subreddit = ARGS.subreddit || "LocalLLaMA";
  const period = ARGS.period || "week";
  const limit = Number(ARGS.limit) || 10;

  const url = `https://www.reddit.com/r/${subreddit}/top.json?t=${period}&limit=${limit}`;
  const resp = await fetch(url, {
    headers: { "User-Agent": "weekly-ai-digest/1.0" },
  });
  if (!resp.ok) {
    throw new Error(`Reddit API returned ${resp.status}: ${resp.statusText}`);
  }
  const data = await resp.json();
  return data.data.children.map((c) => ({
    title: c.data.title,
    url: `https://www.reddit.com${c.data.permalink}`,
    score: c.data.score,
    comments: c.data.num_comments,
  }));
}

// ---------------------------------------------------------------------------
// note.com scraper — extracts from card structure
// ---------------------------------------------------------------------------
async function scrapeNotecom() {
  const query = ARGS.query || "AI開発";
  const sort = ARGS.sort || "like";
  const limit = Number(ARGS.limit) || 10;

  return withBrowser(async (page) => {
    const url = `https://note.com/search?q=${encodeURIComponent(query)}&sort=${sort}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".m-largeNoteWrapper__card, a[href*='/n/']", { timeout: TIMEOUT }).catch(() => {});
    await page.waitForTimeout(2000);

    const articles = await page.evaluate((lim) => {
      const results = [];
      const seen = new Set();

      // Primary: extract from card wrappers (title is in <a> title attribute)
      document.querySelectorAll(".m-largeNoteWrapper__card").forEach((card) => {
        if (results.length >= lim) return;
        const a = card.querySelector("a[href*='/n/']");
        if (!a) return;

        const href = a.getAttribute("href") || "";
        const fullUrl = href.startsWith("http") ? href : `https://note.com${href}`;
        if (seen.has(fullUrl)) return;
        seen.add(fullUrl);

        // Title from the <a> title attribute or aria-label
        const title = a.getAttribute("title") || a.getAttribute("aria-label") || "";
        if (!title) return;

        // Author: look for user link or text after the title
        const allText = card.textContent || "";
        // Split by title to get the metadata portion
        const metaPart = allText.split(title).pop() || "";
        const metaLines = metaPart.split(/\n/).map((s) => s.trim()).filter(Boolean);
        // First non-empty line after title (skipping price like "¥980") is typically the author
        const author = metaLines.find((line) => !/^[¥$\d]+$/.test(line)) || "";

        // Like count is typically the last number in the card text
        const numbers = metaPart.match(/\d+/g);
        const likes = numbers ? Number(numbers[numbers.length - 1]) : 0;

        results.push({ title, url: fullUrl, author, likes });
      });

      // Fallback: try any article link with title attribute
      if (results.length === 0) {
        document.querySelectorAll("a[href*='/n/'][title]").forEach((a) => {
          if (results.length >= lim) return;
          const href = a.getAttribute("href") || "";
          const fullUrl = href.startsWith("http") ? href : `https://note.com${href}`;
          if (seen.has(fullUrl)) return;
          seen.add(fullUrl);
          const title = a.getAttribute("title") || "";
          if (!title) return;
          results.push({ title, url: fullUrl, author: "", likes: 0 });
        });
      }

      return results;
    }, limit);

    return articles.slice(0, limit);
  });
}

// ---------------------------------------------------------------------------
// Hugging Face Papers scraper
// ---------------------------------------------------------------------------
async function scrapeHuggingfacePapers() {
  const week = ARGS.week; // e.g. "2026-W10"
  const limit = Number(ARGS.limit) || 3;

  if (!week) {
    throw new Error("--week is required for huggingface-papers (e.g. 2026-W10)");
  }

  return withBrowser(async (page) => {
    const url = `https://huggingface.co/papers/week/${week}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("a[href^='/papers/']", { timeout: TIMEOUT }).catch(() => {});
    await page.waitForTimeout(2000);

    const papers = await page.evaluate((lim) => {
      const results = [];
      const seenIds = new Set();

      // Each paper has multiple <a> links with the same href.
      // The one with the title has class containing "line-clamp" and text length > 10.
      document.querySelectorAll("a[href^='/papers/']").forEach((a) => {
        if (results.length >= lim) return;
        const href = a.getAttribute("href") || "";
        // Filter for actual paper links (pattern: /papers/XXXX.XXXXX)
        const match = href.match(/^\/papers\/(\d{4}\.\d+)/);
        if (!match) return;
        const arxivId = match[1];
        if (seenIds.has(arxivId)) return;

        const title = a.textContent?.trim() || "";
        // Only pick links that contain the actual paper title (not icons/badges)
        if (!title || title.length < 10) return;

        seenIds.add(arxivId);
        results.push({
          title,
          url: `https://huggingface.co${href}`,
          arxiv_url: `https://arxiv.org/abs/${arxivId}`,
          arxiv_id: arxivId,
        });
      });
      return results;
    }, limit);

    // For each paper, fetch the arXiv abstract
    const papersWithAbstracts = [];
    for (const paper of papers.slice(0, limit)) {
      try {
        await page.goto(paper.arxiv_url, { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".abstract", { timeout: 15000 }).catch(() => {});

        const abstract = await page.evaluate(() => {
          const el = document.querySelector(".abstract");
          if (!el) return "";
          const text = el.textContent || "";
          return text.replace(/^Abstract:\s*/i, "").trim();
        });

        const authors = await page.evaluate(() => {
          const authorEls = document.querySelectorAll(".authors a");
          return Array.from(authorEls)
            .map((a) => a.textContent?.trim())
            .filter(Boolean)
            .join(", ");
        });

        papersWithAbstracts.push({ ...paper, abstract, authors });
      } catch {
        papersWithAbstracts.push({ ...paper, abstract: "", authors: "" });
      }
    }

    return papersWithAbstracts;
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const SCRAPERS = {
  reddit: scrapeReddit,
  notecom: scrapeNotecom,
  "huggingface-papers": scrapeHuggingfacePapers,
};

async function main() {
  if (!SITE || !SCRAPERS[SITE]) {
    console.error(
      `Usage: node scripts/scrape.js --site <${Object.keys(SCRAPERS).join("|")}> [options]\n\nSites:\n  reddit              --subreddit <name> --period <day|week|month> --limit <n>\n  notecom             --query <search> --sort <like|new> --limit <n>\n  huggingface-papers  --week <YYYY-Wnn> --limit <n>`
    );
    process.exit(1);
  }

  try {
    const result = await retry(() => SCRAPERS[SITE]());
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message, site: SITE }));
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", () => process.exit(130));
process.on("SIGTERM", () => process.exit(143));

main();
