# Project Folder Structure

When you first get started with React, the folder structure usually looks like this:

```
src/
  ├── components/
  ├── hooks/
  ├── pages/
  ├── services/
  ├── lib/
  ├── utils/
  ├── stores/
  ├── ...
```

This good-old folder structure is simple and works well for small to medium-sized applications, and in fact, this is still the solid foundation of many other folder structures. However, as the application grows, this structure can lead to several issues:

- **Scalability**: As the application grows, the number of files and folders can become overwhelming, making it difficult to navigate and find specific components or features.
- **Feature Coupling**: Related files for a specific feature (e.g., components, hooks, services) are often scattered across different folders, making it harder to understand and maintain the feature as a whole.
- **Team Collaboration**: In a team setting, multiple developers working on different features may lead to merge conflicts and coordination challenges when files are spread across various folders. (I know this is controversial, but I have seen this happen in real life)

To address these issues, a more modular and feature-based folder structure is often recommended. Hence, in the `src/` folder of this project, there will be:

```
src/
  ├── base/
  ├── modules/
```

- `base/`: This folder contains the most **foundational, general building blocks** of the application that are shared across multiple features. The code in this folder **does not have a context**.
- `modules/`: This folder contains feature-specific code, where each feature has its own subfolder containing all related files (components, hooks, services, etc.). The modules can be divided based on entities or simply just follows the modules in the back-end project.

Then in each folder, the folder structure follows the good-old structure mentioned above. For example, the module `users` (`src/modules/users/` folder) may look like this:

```
src/
  └── modules/
      └── users/
        ├── components/
        │   ├── user-avatar-uploader.tsx
        │   ├── user-avatar.tsx
        │   └── user-profile-form.tsx
        ├── pages/
        │   └── update-user-profile.page.tsx
        ├── services/
        │   └── users.service.ts
        ├── utils/
        │    └── set-user-to-cookies.util.ts
        └── types.ts
```

Let's compare [`Form`](../src/base/components/form.tsx) with [`UserProfileForm`](../src/modules/users/components/user-profile-form.tsx), so that you can understand the difference between `base/` and `modules/` folders:

- `Form` is just a generic component representing a form. It does not have any specific context. It only provides different types of input fields, labels, basic validation.
- Whereas `UserProfileForm`:
  - Is a specific form component tailored for user profile updates.
  - It has its own context, which is the user profile.
  - This form contains 3 fields: `firstName`, `lastName`, and `avatar`.
  - It has its own validation rules: `firstName` and `lastName` are required, while `avatar` is optional.
  - It also has its own submission logic: when the form is submitted, it calls the API endpoint ([`usersService.updateUserProfile()`](../src/modules/users/services/users.service.ts#L8)) to update the user's profile.

In the `src/` folder, there is also a `routes/` folder that contains all the route definitions of the application, used by TanStack Router to automatically generate the routes based on the file structure. For more details, please check out the [File-based routing with TanStack Router](./tanstack-router.md) documentation.
