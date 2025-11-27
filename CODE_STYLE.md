Code style & formatting
-----------------------

This project uses Prettier and ESLint to keep code clean and consistent.

Recommended commands (run from `web-frontend-challenge`):

 - Format all files with Prettier:
   ```bash
   npm run format
   ```

 - Run ESLint and fix problems automatically when possible:
   ```bash
   npm run lint:fix
   ```

Notes
 - ESLint is configured in `.eslintrc.json` (recommended rules + TypeScript support).
 - Prettier settings live in `.prettierrc`.
 - Please avoid committing `console.log` debug statements; prefer `console.warn`/`console.error`.
