# Used Cars Platform task

Live demo: [https://used-cars-platform.vercel.app](https://used-cars-platform.vercel.app)

![Website](https://img.shields.io/website?url=https%3A%2F%2Fused-cars-platform.vercel.app)

## Running the project

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Tools and Dependencies

I have chosen to use [Vite](https://vitejs.dev/) with [React](https://react.dev/) for this task. On top of React I have used [Tanstack Router](https://tanstack.com/router) for type-safe routing including handling of query parameters as state. I have used the routers own data loading for fetching and caching the listings and user, as opposed to using something like [Tanstack/React Query](https://tanstack.com/query). [Tailwind CSS](https://tailwindcss.com/) is used for styling. My solution is written in [TypeScript](https://www.typescriptlang.org/), and I have used [Valibot](https://valibot.dev/) (a modern alternative to Zod) for runtime schema validation.
