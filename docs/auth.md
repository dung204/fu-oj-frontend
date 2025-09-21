# Authentication & Authorization

This documentation provides an overview of the authentication and authorization mechanisms implemented in this template.

## Table of Contents

- [Before we start](#before-we-start)
- [Layouts](#layouts)
- [Authentication flow](#authentication-flow)
- [Specifying the private routes](#specifying-the-private-routes)
- [Specifying the private API endpoints](#specifying-the-private-api-endpoints)
- [Utilities](#utilities)

## Before we start

This template uses TanStack Start, which is a full-stack framework for building SSR web applications. Hence, there will two runtimes/environments:

- **Client-side**: This is where the front-end code runs, typically in the user's browser. It is responsible for rendering the UI and handling user interactions.
- **Server-side**: This is where the code is executed on the server. This server is started by running the command `bun start` or `bun dev`. Notice that this server is different from the back-end server (e.g., a REST API server) that provides data to the front-end application, it's usually responsible for enhancing the client-side (SEO, performance, bypassing the CORS policy, working with HTTP-only cookies, etc.).

You should also be familiar with file-based routing with TanStack Router, along with the following official docs:

- [Data Loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading) (especially the `loader` function)
- [Navigation](https://tanstack.com/router/latest/docs/framework/react/guide/navigation)

## Layouts

In the `src/routes` folder, you will see the following folders & files:

```
src
└── routes
    ├── _not-auth/
    ├── auth/
    ├── _not-auth.tsx
    └── auth.tsx
```

There are 2 layouts here:

- `auth` layout: this layout is used for auth-related pages, such as login, register, forgot password. The file `_not-auth.tsx` is to configure the logic for this layout.
- `_not-auth` layout: this layout is used for all other pages that are not auth-related pages. Any pages, no matter their content, will be wrapped in this layout. The file `auth.tsx` is to configure the logic for this layout.

## Authentication flow

The authentication flow is as follows:

1. When a user logs in or registers successfully, the back-end server will return a JWT access token, a JWT refresh token, and the user profile.
2. The tokens and user profile will be stored in the browser's cookies, with the following attributes:
   - `HttpOnly`: This attribute is to prevent client-side JavaScript from accessing it. This helps mitigate the risk of XSS attacks. Only server-side code can access this cookie.
   - `Secure`: This ensures that the cookies are only sent over HTTPS connections (in production).
   - `SameSite`: This attribute is set to `Lax` to provide a balance between security and usability, helping to prevent CSRF attacks while still allowing some cross-site requests.
3. The client-side app will be redirected to the home page (or any other page set as default page).
4. This step is broken down into the following independent scenarios:
   - For every request to a route in the `auth` layout (e.g., `/auth/login`, `/auth/register`) - see the [`beforeLoad` function in `src/routes/auth.tsx`](../src/routes/auth.tsx):
     - The tokens and user profile retrieved from the cookies will be checked.
     - If the tokens and user profile are valid, the user will be redirected to the home page (or any other page set as default page).
     - Or else, the user will be allowed to access the requested page.
   - For every request to a route in the `_not-auth` layout (e.g., `/`, `/posts/me`) - see the [`beforeLoad` function in `src/routes/_not-auth.tsx`](../src/routes/_not-auth.tsx):
     - The tokens and user profile retrieved from the cookies will be checked.
     - If the tokens and user profile are valid, the user will be allowed to access the requested page.
     - Or else, the user will be redirected to the login page (or any other page set as default page).
   - For every subsequent requests to the back-end server (e.g., fetching posts, creating a new post) - see the [`onSuccessRequest` function in `src/base/lib/http-client.lib.ts`](../src/base/lib/http-client.lib.ts#L38):
     - The access token will be retrieved included in the `Authorization` header as a Bearer token.
     - If the access token is expired/invalid/unavailable, the refresh token will be used to get a new access token (this is done automatically by the `axios` instance, you don't need to worry about it).
     - If the refresh token is also expired/invalid/unavailable, the user will be redirected to the login page (or any other page set as default page).
     - Or else, the access token will be included in the `Authorization` header as a Bearer token, and the request will be sent to the back-end server.

## Specifying the private routes

When defining a new route for the `_not-auth` layout, you need to specify whether the route is private or not. Currently, this template only supports public routes (accessible by anyone) and private routes (accessible only by authenticated users).

Go to the [`src/base/utils/route.utils.ts`](../src/base/utils/route.utils.ts) file, you will see the following code:

```ts
import { pathToRegexp } from "path-to-regexp";

export const publicRoutes = ["/"];

export const privateRoutes = [
  "/user/*path",
  "/posts/me",
  "/posts/new",
  "/posts/:postId/edit",
  "/profile",
];

export function checkIsPrivateRoute(route: string) {
  return privateRoutes.some((r) => pathToRegexp(r).regexp.test(route));
}
```

Now you can add the new route to either `publicRoutes` or `privateRoutes` array, depending on your need. The route can be an exact route, or a pattern using [path-to-regexp](https://github.com/pillarjs/path-to-regexp?tab=readme-ov-file#usage).

You can also add custom route types (e.g., admin-only routes) if needed, by defining a new array and a new function to check the route type. For example:

```ts
export const adminOnlyRoutes = ["/admin/*path"];

export function checkIsAdminOnlyRoute(route: string) {
  return adminOnlyRoutes.some((r) => pathToRegexp(r).regexp.test(route));
}
```

Then you can use the `checkIsAdminOnlyRoute` function in the [`beforeLoad` function of the `_not-auth` layout](../src/routes/_not-auth.tsx) to check if the route is an admin-only route, and redirect the user to an appropriate page if they are not an admin.

## Specifying the private API endpoints

When you are using the `httpClient` instance from [`src/base/lib/http-client.lib.ts`](../src/base/lib/http-client.lib.ts) to make requests to the back-end server, you need to specify whether the API endpoint is private or not. This is done by setting the `isPrivateRoute` option in the request config. When this option is set to `true`, [the `onSuccessRequest` function](../src/base/lib/http-client.lib.ts#L38) will include the access token in the `Authorization` header as a Bearer token.

```ts
import { httpClient } from "@/base/lib";

// Private API endpoint
function getPrivateData() {
  return httpClient.get("/private-data", {
    isPrivateRoute: true,
  });
}
```

The `isPrivateRoute` option can be useful for optional private routes, where the user can access the route without being authenticated, but if they are authenticated, they will get more data. For example, a blog post page that shows more options (e.g. whether the signed in user is following the author, or he can edit the post or not, etc.) if the user is the author of the post. For example:

```ts
import { httpClient } from "@/base/lib";

// Optional private API endpoint
function getPost(postId: string, fetchWithCurrentUser? boolean) {
  return httpClient.get(`/posts/${postId}`, {
    isPrivateRoute: fetchWithCurrentUser,
  });
}

// Usage
let user: User | undefined = getUser();
let post = getPost("postId", !!user);
```

## Utilities

The following utilities are provided to help you work with authentication & authorization. They are powered by the [server functions of TanStack Start](https://tanstack.com/start/latest/docs/api/server) due to the need to access HTTP-only cookies.

- [`setTokensToCookies()`](../src/modules/auth/utils/set-tokens-to-cookie.util.ts): This function sets the access token, refresh token, and user profile to the cookies.
- [`getTokensFromCookies()`](../src/modules/auth/utils/get-tokens-from-cookie.util.ts): This function retrieves the access token, refresh token, and user profile from the cookies. Refreshing the access tokens, then setting them to the cookies are also performed in this function if needed.
- [`deleteTokensInCookies()`](../src/modules/auth/utils/delete-tokens-in-cookie.util.ts): This function removes the access token, refresh token, and user profile from the cookies.
