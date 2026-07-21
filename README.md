# NYC Opportunity Component Library

A React component library for NYC Opportunity projects, built with TypeScript, Tailwind CSS, and Storybook. Published to Azure Artifacts.

## Features

- **React 18** — peer dependency, supports React 18 and 19
- **TypeScript** — full type safety and IntelliSense
- **Tailwind CSS** — design-token-driven styling via CSS custom properties
- **Storybook 10** — interactive component documentation
- **Vite 7** — fast library build (ES + CJS)
- **Tree-shakeable** — named imports only ship the code you use

---

## Using the library (consumers)

### 1. Authenticate to Azure Artifacts (once per machine)

```bash
npx @azure/ado-npm-auth --config .npmrc
```

This opens a browser login to Azure DevOps and writes credentials to `~/.npmrc`.

### 2. Add the scoped registry to your project

Create or edit `.npmrc` in your project root:

```ini
@nycopportunity:registry=https://pkgs.dev.azure.com/doitt-compute-services/nyco-products/_packaging/nycopportunity/npm/registry/
//pkgs.dev.azure.com/doitt-compute-services/nyco-products/_packaging/nycopportunity/npm/registry/:always-auth=true
```

### 3. Install the package

```bash
pnpm add @nycopportunity/component-library
# or
npm install @nycopportunity/component-library
```

### 4. Import and use

```tsx
// Import the stylesheet once at your app root (e.g. main.tsx)
import '@nycopportunity/component-library/style.css';

// Import components by name — unused components are tree-shaken
import { Button, Card, Accordion } from '@nycopportunity/component-library';

function App() {
  return <Button variant="primary">Click Me</Button>;
}
```

---

## Updating the library in your project

When a new version is published to Azure Artifacts, update it in your consuming project:

```bash
# Update to the latest published version
pnpm update @nycopportunity/component-library
# or
npm update @nycopportunity/component-library
```

To pin to a specific version, edit your `package.json`:

```json
"@nycopportunity/component-library": "0.1.4"
```

Then run `pnpm install`.

### Check what version you have

```bash
pnpm list @nycopportunity/component-library
```

### Check what versions are available on the feed

```bash
pnpm view @nycopportunity/component-library versions
```

---

## Available components

Accordion · Breadcrumbs · Button · Card · CardCarousel · Chip · ChipGroup · Divider · Dropdown · DropdownMenu · ExpandableSelect · ExpandableSelectGroup · Footer · GlobalNavigation · Icon · InputField · ListItem · NavDrawer · NavItem · Pagination · SiteNavigation · ToastMessage · Tooltip

See the live **Storybook** for examples, prop documentation, and design token references:

> 🔗 **https://nycopportunity.github.io/nyco-component-library/**

Storybook is hosted on **GitHub Pages** and automatically redeployed whenever code is merged to `dev` or `production`.

---

## Local development

### Prerequisites

- Node.js 20+
- pnpm 10.29.2+

### First-time setup

```bash
# Clone the repo
git clone https://github.com/NYCOpportunity/nyco-component-library.git
cd nyco-component-library

# Install dependencies
pnpm install
```

### Run Storybook

```bash
pnpm run storybook
# Opens at http://localhost:6006
```

### Available scripts

| Script                     | Description                                  |
| -------------------------- | -------------------------------------------- |
| `pnpm run storybook`       | Start Storybook dev server                   |
| `pnpm run build`           | Build the library (`dist/`)                  |
| `pnpm run build:storybook` | Build static Storybook                       |
| `pnpm run type-check`      | TypeScript type check                        |
| `pnpm run lint`            | ESLint                                       |
| `pnpm run lint:fix`        | ESLint with auto-fix                         |
| `pnpm run format`          | Prettier format                              |
| `pnpm run check`           | Lint + type-check + format check (full gate) |

---

## Workflow — deploying changes

### Branching strategy

```
feature/my-change  →  dev (review)  →  production  →  (pipeline publishes)
```

1. Create a feature branch off `dev`.
2. Make changes and open a **Pull Request → `dev`** for review.
3. Once approved, open a **Pull Request → `production`**.
4. When that PR is **merged to `production`**, the Azure Pipeline triggers automatically.

### What happens when a PR is merged to `production`

The pipeline (`azure-pipelines.yml`) runs these steps:

| Step | Action                                              |
| ---- | --------------------------------------------------- |
| 1    | Checkout full git history                           |
| 2    | Install Node.js 20 + pnpm                           |
| 3    | `pnpm install`                                      |
| 4    | Quality gate — lint, type-check, format check       |
| 5    | Generate `.npmrc` with auth token                   |
| 6    | `npm version patch` — bumps e.g. `0.1.3` → `0.1.4`  |
| 7    | `pnpm run build` — compiles `dist/`                 |
| 8    | `pnpm publish` → Azure Artifacts                    |
| 9    | Commits the version bump + creates git tag `v0.1.4` |
| 10   | Pushes commit + tag back to `production`            |

The version commit uses `[skip ci]` so it does **not** re-trigger the pipeline.

### Publishing manually (if needed)

```bash
# 1. Run the quality gate
pnpm run check

# 2. Bump version
npm version patch   # or minor / major

# 3. Build and publish
pnpm publish        # prepublishOnly runs clean + build automatically

# 4. Push the version commit and tag
git push && git push --tags
```

---

## Pipeline setup (one-time, for admins)

### Azure DevOps — repository permissions

**Project Settings → Repos → your repo → Security**  
Set for `[Project] Build Service`:

- **Contribute** → Allow
- **Create tag** → Allow

### Azure DevOps — pipeline secret variable

**Pipelines → your pipeline → Edit → Variables → + Add**

| Name                                    | Value                                        | Secret |
| --------------------------------------- | -------------------------------------------- | ------ |
| `NYCO_COMPONENT_LIBRARY_NPM_AUTH_TOKEN` | Base64-encoded PAT with Packaging read/write | ✅     |

To generate the base64 PAT value:

```bash
printf '%s' 'YOUR_PAT' | base64
```

---

## Package details

| Field        | Value                                     |
| ------------ | ----------------------------------------- |
| Package name | `@nycopportunity/component-library`       |
| Registry     | Azure Artifacts — `nycopportunity` feed   |
| ES module    | `dist/index.mjs`                          |
| CommonJS     | `dist/index.cjs`                          |
| Types        | `dist/index.d.ts`                         |
| Stylesheet   | `dist/style.css` (40 KB / 7.6 KB gzipped) |

---

## License

MIT — NYC Opportunity

# Install dependencies

pnpm install

# Start Storybook development server

pnpm run storybook

````

### Available Scripts

#### Development

- `pnpm run storybook` - Start Storybook on http://localhost:6006
- `pnpm run type-check` - Run TypeScript type checking

#### Building

- `pnpm run build` - Build the library for production
- `pnpm run build:ts` - Build TypeScript declarations
- `pnpm run build:vite` - Build with Vite
- `pnpm run build:storybook` - Build static Storybook site

#### Code Quality

- `pnpm run lint` - Lint code with ESLint
- `pnpm run lint:fix` - Fix ESLint issues automatically
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting

#### Other

- `pnpm run clean` - Remove build artifacts
- `pnpm run pack` - Create npm package tarball

## VS Code

This project includes VS Code configuration for optimal development experience:

- **Tasks**: Run builds, linting, and formatting via `Cmd+Shift+P` → "Run Task"
- **Auto-formatting**: Code formats on save with Prettier
- **Auto-fixing**: ESLint fixes issues on save
- **Extensions**: Recommended extensions for full feature support

## Contributing

1. Create a feature branch from `dev`

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
````

2. Make your changes and commit

   ```bash
   git add .
   git commit -m "Add your feature"
   ```

3. Push and create a Pull Request
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Standards

- Follow TypeScript best practices
- Write tests for new components
- Document components with Storybook stories
- Ensure all linting and type-checking passes
- Format code with Prettier before committing

## Publishing

```bash
# Update version in package.json
npm version patch|minor|major

# Build the library
pnpm run build

```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

See [LICENSE](LICENSE) file for details.

## Support

For issues and questions, please [open an issue](https://github.com/NYCOpportunity/nyco-component-library/issues) on GitHub.

---

Built by NYC Opportunity
