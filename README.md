# Playwright Automation Screening Task

This project contains Playwright Test tests written in TypeScript for the Playwright documentation site and the TodoMVC demo.

## Requirements

- Node.js 20 or later
- npm

## Install

Install the project dependencies and Chromium browser:

```bash
npm ci
npx playwright install chromium
```

## Run the tests

Run the complete suite in headless Chromium:

```bash
npm test
```

Open a visible browser while running the suite:

```bash
npm run test:headed
```

The tests visit the public Playwright documentation and TodoMVC demo sites, so an internet connection is required.

## View the HTML report

After a test run, open the report with:

```bash
npm run report
```

The report shows which tests passed or failed and includes failure details. Playwright records a trace on the first retry of a failed test; traces can be opened from the HTML report.

## Project layout

- `playwright.config.ts` configures Chromium, the documentation base URL, the HTML reporter, and retry traces.
- `tests/docs.spec.ts` contains the documentation-site scenarios.
- `tests/todo.spec.ts` contains the TodoMVC scenarios, including a data-driven set of todo items.
- `tests/todo-page.ts` is the TodoMVC Page Object, which groups page actions and locators.
- `.github/workflows/playwright.yml` runs the suite on GitHub Actions for pushes and pull requests.
