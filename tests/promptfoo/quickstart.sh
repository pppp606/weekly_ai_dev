#!/bin/bash

# Promptfoo Testing Quick Start Script
# This script sets up and runs the complete test suite

set -e

echo "🚀 Article Guardrail Review - Testing Quick Start"
echo "=================================================="

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d 'v' -f 2)
    MAJOR_VERSION=$(echo "$NODE_VERSION" | cut -d '.' -f 1)
    
    if [ "$MAJOR_VERSION" -lt 18 ]; then
        log_error "Node.js version 18 or higher is required (current: $NODE_VERSION)"
        exit 1
    fi
    
    log_success "Node.js $NODE_VERSION found"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi
    
    log_success "npm found"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    
    if [ -f package-lock.json ]; then
        npm ci
    else
        npm install
    fi
    
    log_success "Dependencies installed"
}

# Setup environment
setup_environment() {
    log_info "Setting up environment..."
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        cp .env.example .env
        log_success "Created .env file from template"
    else
        log_info ".env file already exists"
    fi
    
    # Create output directories
    mkdir -p output
    mkdir -p reports
    log_success "Created output directories"
}

# Run verification
run_verification() {
    log_info "Running verification checks..."
    
    # Check if npm scripts exist
    if npm run verify &> /dev/null; then
        log_success "Verification passed"
    else
        log_warning "Verification script not found, skipping"
    fi
}

# Run tests
run_tests() {
    log_info "Running test suite..."
    
    # Run all tests
    if npm test; then
        log_success "All tests passed!"
    else
        log_warning "Some tests failed, but continuing..."
        return 1
    fi
}

# Generate reports
generate_reports() {
    log_info "Generating test reports..."
    
    if npm run test:report &> /dev/null; then
        log_success "Test reports generated"
        
        if [ -f test-report.html ]; then
            log_info "HTML report: test-report.html"
        fi
        
        if [ -f test-report.json ]; then
            log_info "JSON report: test-report.json"
        fi
    else
        log_warning "Report generation failed"
    fi
}

# Display summary
display_summary() {
    echo ""
    echo "🎉 Quick Start Complete!"
    echo "======================="
    echo ""
    echo "Next steps:"
    echo "• View test results in the output/ directory"
    echo "• Open test-report.html in your browser for detailed results"
    echo "• Run 'npm test' to re-run tests"
    echo "• Run 'npm run test:watch' for continuous testing"
    echo ""
    echo "Available commands:"
    echo "• npm run test:guardrails    - Test article guardrails"
    echo "• npm run test:commands      - Test command functionality" 
    echo "• npm run test:report        - Generate test reports"
    echo "• npm run clean              - Clean up test artifacts"
    echo ""
    echo "Documentation:"
    echo "• docs/setup-guide.md        - Detailed setup instructions"
    echo "• docs/test-writing-guide.md - How to write tests"
    echo "• docs/troubleshooting.md    - Common issues and solutions"
}

# Main execution
main() {
    echo ""
    
    # Parse command line arguments
    SKIP_TESTS=false
    VERBOSE=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --skip-tests)
                SKIP_TESTS=true
                shift
                ;;
            --verbose|-v)
                VERBOSE=true
                shift
                ;;
            --help|-h)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --skip-tests    Setup environment but skip running tests"
                echo "  --verbose, -v   Enable verbose output"
                echo "  --help, -h      Show this help message"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Set verbose mode
    if [ "$VERBOSE" = true ]; then
        set -x
    fi
    
    # Run setup steps
    check_prerequisites
    install_dependencies
    setup_environment
    run_verification
    
    # Run tests unless skipped
    if [ "$SKIP_TESTS" = false ]; then
        if run_tests; then
            generate_reports
        fi
    else
        log_info "Skipping tests as requested"
    fi
    
    # Show summary
    display_summary
}

# Handle errors
trap 'log_error "Quick start failed at line $LINENO"' ERR

# Run main function
main "$@"