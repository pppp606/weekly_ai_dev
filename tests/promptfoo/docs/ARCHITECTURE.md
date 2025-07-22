# Promptfoo Testing Framework - Architecture Documentation

## System Overview

The Promptfoo testing framework for Weekly AI Dev is designed as a modular, extensible system for testing AI-powered content generation. It validates the quality, consistency, and reliability of various digest generation processes.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Test Orchestration Layer                 │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   CLI/NPM   │  │   GitHub     │  │   Scheduled     │   │
│  │  Commands   │  │   Actions    │  │     Jobs        │   │
│  └─────┬───────┘  └──────┬───────┘  └────────┬────────┘   │
└────────┼─────────────────┼───────────────────┼─────────────┘
         │                 │                   │
         ▼                 ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    Promptfoo Core Engine                     │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Config    │  │   Provider   │  │    Assertion    │   │
│  │   Loader    │  │   Manager    │  │     Engine      │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         │                 │                   │
         ▼                 ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    Custom Components Layer                   │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Evaluators  │  │   Prompts    │  │   Test Data     │   │
│  │   (TS)      │  │  Templates   │  │    Sets         │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         │                 │                   │
         ▼                 ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      Results Layer                           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Reports   │  │   Metrics    │  │   Artifacts     │   │
│  │   (HTML)    │  │   (JSON)     │  │   Storage       │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Configuration System

#### Structure
```typescript
interface TestConfig {
  providers: Provider[];
  prompts: PromptTemplate[];
  tests: TestCase[];
  evaluators: Evaluator[];
  output: OutputConfig;
}
```

#### Configuration Files
- `configs/release-digest.yaml` - Release information testing
- `configs/ai-news.yaml` - AI news digest testing
- `configs/trending-repos.yaml` - Repository analysis testing
- `configs/article-generation.yaml` - Final article testing

### 2. Provider System

#### Supported Providers
```typescript
type Provider = 
  | OpenAIProvider
  | AnthropicProvider
  | CustomProvider;

interface ProviderConfig {
  id: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}
```

#### Provider Manager
- Handles API authentication
- Manages rate limiting
- Implements retry logic
- Tracks token usage

### 3. Evaluator System

#### Base Evaluator Interface
```typescript
interface Evaluator {
  name: string;
  evaluate(output: string, context: EvalContext): EvalResult;
}

interface EvalResult {
  score: number;
  passed: boolean;
  reason?: string;
  metadata?: Record<string, any>;
}
```

#### Custom Evaluators

1. **Structure Validator**
   - Validates markdown structure
   - Checks required sections
   - Ensures proper formatting

2. **Content Validator**
   - Verifies information accuracy
   - Checks for hallucinations
   - Validates data completeness

3. **Language Validator**
   - Ensures Japanese content
   - Checks for proper formatting
   - Validates cultural appropriateness

4. **Performance Validator**
   - Measures response time
   - Tracks token usage
   - Calculates cost metrics

### 4. Prompt Management

#### Template System
```typescript
interface PromptTemplate {
  id: string;
  content: string;
  variables: Variable[];
  metadata: PromptMetadata;
}
```

#### Variable Injection
- Date formatting
- Repository lists
- Dynamic content
- Context injection

### 5. Test Data Management

#### Data Structure
```yaml
testData:
  - id: "test-001"
    vars:
      date: "2024-03-15"
      repositories: ["langchain", "pytorch"]
    expected:
      sections: ["releases", "summary"]
      language: "ja"
```

#### Data Sources
- Static YAML files
- Generated test cases
- Historical data
- Edge case scenarios

## Data Flow

### 1. Test Execution Flow

```
[Config] → [Promptfoo Engine] → [Provider API] → [Response]
                ↓                                      ↓
         [Test Variables]                    [Evaluators]
                                                      ↓
                                              [Test Results]
```

### 2. Evaluation Pipeline

```
Raw Output → Structure Check → Content Validation → Language Check → Score
     ↓              ↓                   ↓                ↓            ↓
  [Cache]    [Format Score]    [Relevance Score]  [Lang Score]  [Final]
```

### 3. Report Generation

```
Test Results → Aggregation → Formatting → Output
      ↓             ↓            ↓          ↓
   [JSON]      [Metrics]     [HTML]    [Files]
```

## Extension Points

### 1. Adding New Evaluators

Location: `src/evaluators/`

```typescript
export class CustomEvaluator implements Evaluator {
  name = 'custom-evaluator';
  
  evaluate(output: string, context: EvalContext): EvalResult {
    // Implementation
    return {
      score: 0.95,
      passed: true,
      reason: 'All checks passed'
    };
  }
}
```

### 2. Custom Providers

Location: `src/providers/`

```typescript
export class CustomProvider implements Provider {
  async generate(prompt: string, config: Config): Promise<string> {
    // Implementation
    return generatedContent;
  }
}
```

### 3. New Test Types

Location: `configs/`

```yaml
description: "Custom test suite"
providers:
  - id: custom-provider
tests:
  - vars:
      customVar: "value"
```

## Performance Considerations

### 1. Caching Strategy

- Response caching for identical prompts
- Provider result caching
- Evaluation result caching
- Time-based cache invalidation

### 2. Concurrency Control

```typescript
const config = {
  maxConcurrency: 5,  // Parallel test execution
  rateLimit: {
    requests: 100,
    period: 60000    // per minute
  }
};
```

### 3. Resource Management

- Token usage tracking
- Memory usage monitoring
- Cleanup procedures
- Error recovery

## Security Architecture

### 1. API Key Management

- Environment variable storage
- Secure key rotation
- Access control
- Audit logging

### 2. Data Protection

- No sensitive data in logs
- Encrypted storage
- Secure transmission
- Access restrictions

## Monitoring and Observability

### 1. Metrics Collection

```typescript
interface Metrics {
  testDuration: number;
  tokenUsage: number;
  apiCalls: number;
  errorRate: number;
  successRate: number;
}
```

### 2. Logging Strategy

- Structured logging
- Log levels (DEBUG, INFO, WARN, ERROR)
- Correlation IDs
- Performance tracking

### 3. Alerting

- Test failure notifications
- Performance degradation alerts
- Cost threshold warnings
- System health checks

## Deployment Architecture

### 1. Local Development

```
Developer Machine
    ├── Node.js Runtime
    ├── Test Framework
    └── Local Storage
```

### 2. CI/CD Pipeline

```
GitHub Repository
    ├── GitHub Actions
    ├── Test Execution
    ├── Result Storage
    └── Notifications
```

### 3. Production Testing

```
Scheduled Jobs
    ├── Cron Triggers
    ├── Test Suites
    ├── Result Aggregation
    └── Report Distribution
```

## Future Architecture Considerations

### 1. Scalability

- Distributed test execution
- Cloud-based infrastructure
- Horizontal scaling
- Load balancing

### 2. Integration

- API endpoints for results
- Webhook notifications
- Third-party integrations
- Dashboard development

### 3. Advanced Features

- ML-based evaluation
- Automated test generation
- Predictive analytics
- Real-time monitoring