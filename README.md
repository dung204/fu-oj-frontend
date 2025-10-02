# FPT University Online Judge (FU-OJ) Frontend

The frontend web application for FPT University Online Judge (FU-OJ) - a platform for practicing programming exercises, made for FPT University. This project is the Capstone Project for the Software Engineering program at FPT University.

## 👥 Authors

The project is developed by group 128 of the SEP490 (Capstone Project) course at FPT University. The team members are:

- Hồ Anh Dũng - HE181529 - [@dung204](https://github.com/dung204)
- Hoàng Gia Trọng - HE172557 - [@GiaTrongHocBe](https://github.com/GiaTrong2003)
- Phạm Ngọc Tùng Lâm - HE173556 - [@lampnthe173556](https://github.com/lampnthe173556)
- Lê Đức Đạt - HE171371 - [@LeDatFPT](https://github.com/LeDatFPT)
- Lê Minh Chiến - HE141150 - [@MilkOCD](https://github.com/MilkOCD)

## 📋 Features

> Working in progress... 🚧

## 🛠️ Prerequisites

- [Bun](https://bun.sh/) 1.2.0 or higher
- Setup of the back-end project ([fu-oj-backend](https://github.com/dung204/fu-oj-backend))
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (highly recommended)

## 📦 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/dung204/fu-oj-frontend.git
```

2. Change directory to the project folder:

```bash
cd fu-oj-frontend
```

3. Install dependencies:

```bash
bun install --frozen-lockfile
```

4. Setup and start the back-end server (follow the [README instructions](https://github.com/dung204/fu-oj-backend/blob/main/README.md) in the back-end project).

5. Create the `.env` file in the root of the project and configure the back-end API URL, for example:

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
