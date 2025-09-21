# TanStack Start Starter Template

A project starter template using [TanStack Start](https://tanstack.com/start) framework. This template provides a solid foundation for building SSR (Server-Side Rendering) web applications with modern tools and best practices.

## 🚀 Features

- **File-based routing** with [TanStack Router](https://tanstack.com/router)
- **State management, data fetching, and caching** with [TanStack Query](https://tanstack.com/query)
- Build tools powered by [Vite](https://vitejs.dev/)
- Comprehensive linting & formatting with [Biome](https://biomejs.dev/)
- Package management with [Bun](https://bun.sh/)
- Internalization (i18n) support with [paraglide-js](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)

## 🛠️ Prerequisites

- [Bun](https://bun.sh/) 1.2.0 or higher
- Setup of an back-end starter project (for example, [spring-rest-api-starter-template](https://github.com/dung204/spring-rest-api-starter-template))
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (highly recommended)

## 📦 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/dung204/tanstack-start-starter-template.git
```

2. Change directory to the project folder:

```bash
cd tanstack-start-stater-template
```

3. Install dependencies:

```bash
bun install --frozen-lockfile
```

4. Setup and start the back-end server (follow the README instructions in the back-end starter project).

5. Configure the back-end API URL in the `.env` file, for example:

```env
# Change this to your back-end API URL
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

6. Start the development server:

```bash
bun dev
```

7. Open your browser and navigate to [`http://localhost:5173`](http://localhost:5173) to see the application in action.

8. (Optional) If using VS Code, head over to the Extensions tab and install the recommended extensions from [`.vscode/extensions.json`](.vscode/extensions.json). This will help you with linting, formatting, and overall development experience.

## 📦 Libraries (dependencies)

Core libraries:

- [TanStack Start](https://tanstack.com/start): The full-stack framework for building SSR web applications.
- [TanStack Router](https://tanstack.com/router): A type-safe, powerful and flexible routing library.
- [TanStack Query](https://tanstack.com/query): A powerful asynchronous state management, server-state utilities and data fetching
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language

---

UI libraries:

- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [shadcn/ui](https://ui.shadcn.com/): A collection of accessible, reusable, and customizable components built with Radix UI and Tailwind CSS.

---

Linting, formatting, building, and misc. tools:

- [Vite](https://vitejs.dev/): A fast build tool and development server.
- [husky](https://typicode.github.io/husky/#/): A tool for managing Git hooks.
- [Biome](https://biomejs.dev/): An all-in-one code linter, formatter, and more.
- [commitlint](https://commitlint.js.org/): A tool to enforce consistent commit messages.

## 📚 Documentations

Detailed documentations are available in the `docs/` folder:

- [Project folder structure](docs/folder-structure.md)
- [File-based routing with TanStack Router](docs/tanstack-router.md)
- [Data fetching with TanStack Query](docs/tanstack-query.md)
- [Authentication & Authorization](docs/auth.md)
- [Internalization (i18n)](docs/i18n.md)
- [The `<Form />` Component](docs/form.md)

Happy coding! 🚀
