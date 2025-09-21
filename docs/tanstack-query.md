# 🔎 Data fetching with TanStack Query

The project uses TanStack Query for data fetching, caching, and state management. The following are the recommended official docs to get started:

- [Quick Start](https://tanstack.com/query/latest/docs/framework/react/quick-start)
- [Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [Query Functions](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions)
- [Query Options](https://tanstack.com/query/latest/docs/framework/react/guides/query-options)
- [Infinite Queries](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)
- [Query Invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
- [Suspense](https://tanstack.com/query/latest/docs/framework/react/guides/suspense)
- [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Prefetching & Router Integration](https://tanstack.com/query/latest/docs/framework/react/guides/prefetching) (optional but recommended to read)

Besides, I also recommended these 2 tutorial videos to get started:

- [React Query - Complete Tutorial](https://youtu.be/8K1N3fE-cDs?si=pJ1T7INCOwJqNoXq) by Cosden Solutions
- [Learn React Query In 50 Minutes](https://youtu.be/r8Dg0KVnfMA?si=YROyA5ChranRe99B) by Web Dev Simplified

---

In this starter template:

- Infinite queries are implemented in the following routes:
  - [`/`](http://localhost:5173/): the source code is in [`src/modules/posts/pages/public-posts.page.tsx`](../src/modules/posts/pages/public-posts.page.tsx)
  - [`/posts/me`](http://localhost:5173/posts/me): the source code is in [`src/modules/posts/pages/my-posts.page.tsx`](../src/modules/posts/pages/my-posts.page.tsx)
- For every queries (and even infinite queries), [suspense queries](https://tanstack.com/query/latest/docs/framework/react/guides/suspense) are used. This is because:
  - It simplifies the code by removing the need to handle loading and error states manually.
  - It provides a better user experience by allowing you to show a fallback UI while the data is being fetched.
  - It works seamlessly with React's concurrent features, such as `React.Suspense` and `React.lazy`.
- Prefetching is implemented in every routes, using the `loader` function of TanStack Router. For example, in the [`/posts/me`](http://localhost:5173/posts/me) route, the prefetching logic is in [`src/routes/_not-auth/posts/me.index.tsx`](../src/routes/_not-auth/posts/me.index.tsx#L21-L23).
