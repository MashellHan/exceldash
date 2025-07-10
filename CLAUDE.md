# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Excel Office Add-in project that enables embedding HTML dashboards directly into Excel worksheets. The project supports both Content App and Task Pane App types for different integration scenarios.

## Key Architecture

- **Dual Add-in Types**: Both Content App (`manifest_contentapp.xml`) and Task Pane App (`manifest_taskpane.xml`) manifests
- **Office.js Integration**: Uses Office.js API with SharedRuntime for enhanced functionality
- **Webpack Build System**: Modern JavaScript build pipeline with Babel transpilation
- **Domain Configuration**: Supports multiple trusted domains (GitHub Pages, development servers)

## Development Commands

Navigate to `Library/htmlembeding/` directory for main development work:

```bash
cd Library/htmlembeding/
```

### Build Commands
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run watch` - Watch mode for development

### Development Server
- `npm run dev-server` - Start webpack dev server on port 4000

### Testing & Validation
- `npm run validate` - Validate manifest files
- `npm run lint` - Run linting
- `npm run lint:fix` - Auto-fix linting issues

### Add-in Development
- `npm run start` - Start Office Add-in debugging
- `npm run stop` - Stop Office Add-in debugging

## File Structure

- `AddIns/` - Manifest files for Office Add-in registration
- `Library/htmlembeding/` - Main development codebase with webpack configuration
- `Library/AddInAuto/` - Python automation tools for Excel file manipulation
- `Library/Design/` - Architecture and design documentation
- Root HTML files (`index.html`, `index_smart.html`, `index_ie_compatible.html`) - Different dashboard entry points

## Manifest Configuration

Two manifest types are maintained:
- Content App: Embeds directly into worksheet cells
- Task Pane: Provides sidebar interface with SharedRuntime

Both use `ReadWriteDocument` permissions and point to `https://mashellhan.github.io/exceldash/` as the source location.

## Development Notes

- The project uses IE11 compatibility (`browserslist` includes "ie 11")
- SharedRuntime is enabled for enhanced Excel API access
- Multiple trusted domains configured for development and production environments
- Python automation tools available for Excel file manipulation and add-in embedding