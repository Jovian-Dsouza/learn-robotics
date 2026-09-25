# Bench Notebook — Learn Robotics

A six-month, project-first roadmap into robotics engineering, with a built-in progress tracker. Built from a
resource-dense article on breaking into robotics: electronics and tools, microcontrollers/motors/sensors, CAD and
manufacturing, ROS 2 and simulation, the maths underneath, and modern robot learning — every section ends with
something you have to build.

## What it does

- Walks through all six months, each with resources, focus-point checklists, a practice "work order," and a
  milestone check.
- Tracks progress locally (no account, no backend): checked items, career-direction choice, resource bookmarks,
  and a build log ("what broke and how I fixed it") per task.
- Lets you export/import your progress as JSON, so you can back it up or move between browsers.
- A searchable resource library, a portfolio/interview-prep guide, and an honest look at pay and hiring demand.

## Stack

Vite + React + TypeScript + Tailwind CSS v4, `react-router-dom` (hash routing, so it deploys as a static site
anywhere), Zod for validating anything read from `localStorage` or imported. Vitest + Testing Library for unit
tests, Playwright for end-to-end tests.

## Development

```bash
bun install
bun run dev          # start the dev server
bun run test         # unit tests
bun run test:coverage
bun run e2e          # Playwright end-to-end tests (builds + serves first)
bun run build        # type-check and production build
```

## Project structure

```
src/
  content/      # the roadmap as typed data — one file per month, plus intro/directions/portfolio/outlook
  progress/     # pure, immutable progress state: schema (Zod), reducer, localStorage, selectors, React context
  components/   # layout, generic UI primitives, and roadmap-specific components
  pages/        # one component per route
docs/source-article.txt   # the source article all content in src/content is drawn from
```

Progress is keyed by stable content IDs (e.g. `m2.motors.practice`), so editing roadmap copy never orphans a
user's saved progress — see `src/content/index.test.ts` for the integrity checks that enforce this.
