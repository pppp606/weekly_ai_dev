#!/bin/bash

# Script to run evaluator validation tests
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Article Guardrail Evaluator Test Suite${NC}"
echo "=================================================="

# Change to the correct directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if required dependencies are available
echo -e "${YELLOW}Checking dependencies...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed or not in PATH${NC}"
    exit 1
fi

if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npx is not available${NC}"
    exit 1
fi

# Check if package.json exists and install dependencies if needed
if [ -f "package.json" ]; then
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Installing dependencies...${NC}"
        npm install
    fi
fi

# Create test results directory
mkdir -p test-results

echo -e "${GREEN}✅ Dependencies ready${NC}"
echo ""

# Function to run a single test configuration
run_test_config() {
    local config_file="$1"
    local test_name="$2"
    
    echo -e "${BLUE}🔬 Running $test_name...${NC}"
    
    if [ -f "$config_file" ]; then
        # Run the test with timeout
        timeout 300 npx promptfoo eval --config "$config_file" --verbose || {
            echo -e "${RED}❌ $test_name failed or timed out${NC}"
            return 1
        }
        echo -e "${GREEN}✅ $test_name completed${NC}"
    else
        echo -e "${RED}❌ Configuration file not found: $config_file${NC}"
        return 1
    fi
    
    echo ""
}

# Function to run evaluator unit tests
run_evaluator_unit_tests() {
    echo -e "${BLUE}🔧 Running evaluator unit tests...${NC}"
    
    # Compile TypeScript if needed
    if command -v tsc &> /dev/null; then
        echo -e "${YELLOW}Compiling TypeScript...${NC}"
        npx tsc --noEmit --skipLibCheck scripts/test-evaluators.ts || {
            echo -e "${YELLOW}⚠️  TypeScript compilation warnings (continuing anyway)${NC}"
        }
    fi
    
    # Run the evaluator tests
    npx ts-node scripts/test-evaluators.ts || {
        echo -e "${RED}❌ Evaluator unit tests failed${NC}"
        return 1
    }
    
    echo -e "${GREEN}✅ Evaluator unit tests completed${NC}"
    echo ""
}

# Main test execution
main() {
    local exit_code=0
    
    echo -e "${BLUE}📋 Test Execution Plan:${NC}"
    echo "1. Evaluator unit tests"
    echo "2. Evaluator validation suite"
    echo "3. Main article guardrail tests with custom evaluators"
    echo "4. Guardrail scenarios with custom evaluators"
    echo ""
    
    # Run evaluator unit tests first
    run_evaluator_unit_tests || exit_code=1
    
    # Run evaluator validation suite
    run_test_config "configs/evaluator-validation.yaml" "Evaluator Validation Suite" || exit_code=1
    
    # Run main tests with custom evaluators
    run_test_config "configs/article-guardrail-review.yaml" "Main Article Guardrail Tests" || exit_code=1
    
    # Run guardrail scenarios
    run_test_config "configs/test-suites/guardrail-scenarios.yaml" "Guardrail Scenarios" || exit_code=1
    
    echo -e "${BLUE}📊 Test Summary${NC}"
    echo "=============================================="
    
    if [ $exit_code -eq 0 ]; then
        echo -e "${GREEN}🎉 All evaluator tests passed successfully!${NC}"
        echo ""
        echo -e "${BLUE}📁 Results available in:${NC}"
        echo "  - test-results/evaluator-test-results.json"
        echo "  - test-results/evaluator-validation-results.json" 
        echo "  - test-results/article-guardrail-review-results.json"
        echo "  - test-results/guardrail-scenarios-results.json"
        echo ""
        echo -e "${GREEN}✅ Custom evaluator system is working correctly!${NC}"
    else
        echo -e "${RED}❌ Some tests failed. Check the output above for details.${NC}"
        echo ""
        echo -e "${YELLOW}🔍 Troubleshooting tips:${NC}"
        echo "  1. Check that all mock files exist in mocks/articles/"
        echo "  2. Verify evaluator TypeScript compilation"
        echo "  3. Review test configuration files"
        echo "  4. Check promptfoo-errors.log for detailed errors"
    fi
    
    return $exit_code
}

# Parse command line arguments
VERBOSE=false
QUICK=false
EVALUATOR_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --verbose|-v)
            VERBOSE=true
            shift
            ;;
        --quick|-q)
            QUICK=true
            echo -e "${YELLOW}Running in quick mode (skipping some test suites)${NC}"
            shift
            ;;
        --evaluator-only|-e)
            EVALUATOR_ONLY=true
            echo -e "${YELLOW}Running evaluator unit tests only${NC}"
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --verbose, -v        Show verbose output"
            echo "  --quick, -q          Run quick test suite only"
            echo "  --evaluator-only, -e Run evaluator unit tests only"
            echo "  --help, -h          Show this help message"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Run tests based on options
if [ "$EVALUATOR_ONLY" = true ]; then
    run_evaluator_unit_tests
    exit $?
elif [ "$QUICK" = true ]; then
    run_evaluator_unit_tests || exit 1
    run_test_config "configs/evaluator-validation.yaml" "Quick Evaluator Validation" || exit 1
    echo -e "${GREEN}✅ Quick tests completed${NC}"
else
    main
    exit $?
fi