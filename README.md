# Web Technologies Final Project (Backend)

This repository is the official Node.js + Express backend template for the final project.
Focus on building your API features. The project already includes automated checks for structure, linting, and syntax.

## Install dependencies

```bash
npm install
```

## Run the project locally

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

API available at `http://localhost:3000/api`
Swagger docs at `http://localhost:3000/api-docs`

## Quality checks (local)

Run all checks:

```bash
npm run quality
```

Teacher grading (score + report):

```bash
npm run grade
```

Run individual checks:

```bash
npm run validate
npm run lint
npm run syntax
```

What each check does:

- `validate`: ensures the minimum required project structure exists.
- `lint`: runs ESLint to enforce basic code quality.
- `syntax`: verifies Node.js can parse the main files without syntax errors.

## Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

## Files and folders students should not edit

Do not edit:

- .github/workflows/\*\*
- scripts/\*\*
- package.json
- package-lock.json
- eslint.config.\*
- src/app.js _(only add routes — do not remove existing config)_
- src/config/swagger.js _(only update info fields)_

You can edit / create:

- src/routes/\*\*
- src/controllers/\*\*
- src/models/\*\*
- src/middleware/\*\* _(except errorHandler.js)_
- .env
- PROJECT_INFO.md
- README.md _(only the project-specific sections)_

## Project structure

```
src/
├── server.js           ← entry point
├── app.js              ← Express app (routes, middleware)
├── config/
│   └── swagger.js      ← Swagger/OpenAPI configuration
├── routes/
│   └── index.js        ← route aggregator (add your routes here)
├── controllers/        ← controller functions (create your own)
├── models/             ← data models / schema (create your own)
└── middleware/
    └── errorHandler.js ← global error handler
```

## Project-specific sections to complete

- Fill in [PROJECT_INFO.md](PROJECT_INFO.md) with your group and project details.
- Add any project notes in this README below.

### Project Notes

Add your project-specific notes here.
