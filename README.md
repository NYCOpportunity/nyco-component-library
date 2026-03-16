# NYC Opportunity Component Library

A React component library for NYC Opportunity projects, built with TypeScript, Tailwind CSS, and Storybook.

## Features

- **Tailwind CSS** - Utility-first styling with customizable design system
- **TypeScript** - Full type safety and excellent developer experience
- **Storybook** - Interactive component documentation and development environment
- **Vite** - Fast build tooling and HMR
- **ESLint & Prettier** - Code quality and consistent formatting
- **Tree-shakeable** - Optimized bundle size with ES modules

## Installation

```bash
npm install @nycopportunity/component-library
# or
pnpm add @nycopportunity/component-library
# or
yarn add @nycopportunity/component-library
```

## Usage

### Import Components

```tsx
import { Button } from '@nycopportunity/component-library';
import '@nycopportunity/component-library/style.css';

function App() {
  return (
    <Button variant="primary" size="medium">
      Click Me
    </Button>
  );
}
```

### Available Components

- **Button** - Versatile button component with multiple variants and sizes

_More components coming soon..._

## Development

### Prerequisites

- Node.js 18+
- pnpm 10+ (recommended)

### Setup

```bash
# Clone the repository
git clone https://github.com/NYCOpportunity/nyco-component-library.git
cd nyco-component-library

# Install dependencies
pnpm install

# Start Storybook development server
pnpm run storybook
```

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
   ```

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

Built with ❤️ by NYC Opportunity
