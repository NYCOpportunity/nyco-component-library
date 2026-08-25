# Project Guidelines

## Project Structure

- This is a React component library written in TypeScript, built with Vite and documented in Storybook.
- Components live in `src/components/<ComponentName>/` with implementation, stories, and an `index.ts` re-export.
- Export public components and types through `src/index.ts`; shared interfaces belong in `src/types/components.ts`.
- Use existing components, hooks, and `cx` in `src/` before introducing new abstractions.

## Styling And Tokens

- Define shared colors, typography, spacing, and other design values in `src/styles.css` as CSS custom properties.
- Prefer the existing Tailwind preset and token-backed utilities over hard-coded colors or new one-off values.
- Keep component styling consistent with nearby components and preserve the existing responsive hover-device patterns.
- Use `opacity: 0.4` for disabled buttons, as documented in `src/styles.css`.

## Storybook

- Add or update a colocated `<ComponentName>.stories.tsx` file when changing a component's documented behavior.
- Follow the existing `Meta` and `StoryObj` patterns and include `tags: ['autodocs']` for component stories.
- Use `STORYBOOK.md` for Storybook setup and story conventions.

## Validation

- Use pnpm; the repository pins pnpm in `package.json`.
- Install with `pnpm install --frozen-lockfile` when dependencies are needed.
- Run `pnpm run check` before completing changes. It runs strict lint, TypeScript type checking, and Prettier validation.
- For library output, run `pnpm run build`; for Storybook changes, run `pnpm run build:storybook`.
- Prefer the narrowest relevant check during iteration, then run the full check for shared or public API changes.

## Documentation

- See [README.md](../README.md) for consumer installation, Tailwind preset usage, publishing, and the complete script list.
- See [STORYBOOK.md](../STORYBOOK.md) for local Storybook development and story creation.
