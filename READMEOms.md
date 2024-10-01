# Developer Guidelines

This document outlines the coding standards, directory structures, and best practices for developing the **Order Management System (OMS)** frontend.

## Developer Considerations

### Suggested Folder Structure and Naming Conventions:

Here is a **detailed folder structure** with a clear breakdown of naming conventions and explanations for each directory and file. This structure promotes scalability, modularity, and maintainability in your project.

---

### **Project Folder Structure**

```
OMS-V2/
├── .vscode/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── store.ts
│   └── assets/
│   │   ├── images/
│   │   ├── fonts/
│   │   └── styles/
│   ├── components/
│   │   └── navbar/
│   │       └── Navbar.tsx
│   ├── constants/
│   │   └── colors.ts
│   ├── context/
│   │   └── authContext.tsx
│   ├── features/
│   │   ├── api/
│   │   │   └── apiSlice.ts
│   │   ├── auth/
│   │   │   ├── authApi.ts
│   │   │   └── authSlice.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── page/
│   │   ├── HomePage.tsx
│   │   └── LoginPage.tsx
│   ├── router/
│   │   └── AppRouter.tsx
│   ├── types/
│   │   ├── authResponse.ts
│   │   └── user.ts
│   ├── ui/
│   │   └── button/
│   │       └── Button.tsx
│   ├── utils/
│   │   ├── formatDate.ts
│   │   └── calculateTax.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

### **Folder Structure Breakdown and Naming Conventions**

#### 1. **`.vscode/`**
   - Purpose: Configuration files specific to your Visual Studio Code workspace.
   - Files like settings, extensions, and debugging configurations can be stored here.
   - **Naming Convention**: Use default naming for any `.vscode` settings or tasks.

#### 2. **`node_modules/`**
   - Purpose: Contains all installed dependencies.
   - Managed by `npm` or `yarn`, no need to manually modify.
   - **Naming Convention**: Automatically handled by the package manager.

#### 3. **`public/`**
   - Purpose: Public files like `index.html` and other static resources (favicon, logos) accessible to the app.
   - **Naming Convention**: Keep file names **kebab-case** (e.g., `favicon.ico`, `index.html`).

#### 4. **`src/`** 
   - Purpose: Contains all the application’s source code.
   - **Naming Convention**: Folder names in **lowercase**, **PascalCase** for TypeScript components.

---

### **Subfolders inside `src/`**

#### **`app/`**
   - Purpose: Global configurations, typically for state management (e.g., Redux store).
   - Example:
     - `store.ts`: Handles the configuration of the Redux store.
   - **Naming Convention**: Files in **PascalCase** (e.g., `Store.ts`).

#### **`assets/`**
   - Purpose: Holds static assets like images, fonts, and styles.
   - Example:
     - `images/`, `fonts/`, `styles/`.
   - **Naming Convention**: Folders in **lowercase**, files in **kebab-case** (e.g., `background-image.png`, `main.css`).

#### **`components/`**
   - Purpose: Reusable UI components.
   - Example:
     - `Button.tsx`, `Navbar.tsx`.
   - **Naming Convention**: **PascalCase** for components (e.g., `Card.tsx`, `Header.tsx`).

#### **`constants/`**
   - Purpose: Holds application-wide constants such as API URLs, color codes, or other fixed values.
   - Example:
     - `colors.ts` for theme colors or status codes.
   - **Naming Convention**: **ALL_CAPS** for constants (e.g., `export const PRIMARY_COLOR = '#123456'`).

#### **`context/`**
   - Purpose: Holds React Context files used for global state management.
   - Example:
     - `AuthContext.tsx`: Handles authentication-related context.
   - **Naming Convention**: Files in **PascalCase** (e.g., `ThemeContext.tsx`).

#### **`features/`**
   - Purpose: Groups by feature (e.g., `auth/`, `user/`) which contains feature-specific code.
   - Subfolders:
     - `api/`: For feature-related API slices (e.g., `apiSlice.ts`).
     - `auth/`: For authentication-related functionality (e.g., `authSlice.ts`, `authApi.ts`).
   - **Naming Convention**: Folder names in **lowercase**, **PascalCase** for TypeScript files.

#### **`hooks/`**
   - Purpose: Stores custom React hooks.
   - Example:
     - `useAuth.ts`: Handles authentication-related logic.
   - **Naming Convention**: **camelCase** for hook files (e.g., `useFetch.ts`).

#### **`page/`**
   - Purpose: Contains the main views or pages of your application.
   - Example:
     - `HomePage.tsx`, `LoginPage.tsx`.
   - **Naming Convention**: **PascalCase** for page files (e.g., `DashboardPage.tsx`).

#### **`router/`**
   - Purpose: Defines the app’s routing logic.
   - Example:
     - `AppRouter.tsx`: Manages the route definitions for different pages.
   - **Naming Convention**: **PascalCase** for router files (e.g., `MainRouter.tsx`).

#### **`types/`**
   - Purpose: Stores TypeScript types and interfaces.
   - Example:
     - `AuthResponse.ts`: Defines the shape of an authentication response object.
   - **Naming Convention**: **PascalCase** for type files (e.g., `User.ts`, `ApiResponse.ts`).

#### **`ui/`**
   - Purpose: Contains theme-related utilities such as styled components or theme configurations.
   - Example:
     - `theme.ts`: Stores theme settings like colors or typography.
   - **Naming Convention**: **PascalCase** for files.

#### **`utils/`**
   - Purpose: Stores utility/helper functions used throughout the application.
   - Example:
     - `formatDate.ts`, `calculateTax.ts`.
   - **Naming Convention**: **camelCase** for utility files (e.g., `debounce.ts`).

---

### **Main Files in Root of `src/`**

- **`App.tsx`**: The root component that initializes and wraps the app with necessary providers (context, routers, etc.).
- **`index.css`**: Global styles applied to the entire app.
- **`main.tsx`**: The entry point of the React app, rendering `App.tsx` and connecting it to the DOM.
- **`vite-env.d.ts`**: Environment variable typings for Vite configuration.
- **Naming Convention**: Files in **PascalCase** where relevant.

---

### **Other Configurations**

- **`.gitignore`**: Specifies files and folders to be ignored by Git.
- **`eslint.config.js`**: ESLint configuration for maintaining consistent coding standards.
- **`tailwind.config.js`**: Configuration for Tailwind CSS, specifying theme settings and customizations.
- **`tsconfig.json`**: TypeScript configuration file, defining how TypeScript should transpile your code.
- **`vite.config.ts`**: Configuration for Vite, defining build settings, plugins, and more.

---

### **Key Structural Decisions**

1. **Feature-based Grouping**: 
   - Features are grouped by functionality in the `features/` directory, making it easy to locate all code related to a specific feature (e.g., authentication).
   - Each feature (like `auth`) has subfolders like `api` for API slices and `slice` for Redux slices.

2. **Component Reusability**:
   - Reusable UI components are placed in the `components/` folder. This promotes reusability and DRY (Don't Repeat Yourself) principles.

3. **Centralized Constants and Utilities**:
   - Global constants and utility functions are placed in the `constants/` and `utils/` folders, respectively, ensuring a single source of truth across the app.

4. **Modularization with Hooks and Context API**:
   - Custom hooks are separated into `hooks/`, while Context API global state is managed in `context/`. This ensures separation of concerns.

---

By following this structure, Our project will be organized, scalable, and maintainable, allowing for a clean separation of concerns and making it easier for our team to collaborate.


Here’s the updated version of the write-up with the inclusion of the **date** element for Git commits and branch naming conventions:

---

### Project Summary

#### Git Commit Conventions

When committing to the project, follow the commit message structure for consistency and clarity. This helps in tracking changes effectively and makes collaboration easier.

##### Commit Message Format:
```
<type>(<dir>)[sub-folder/file]: <short commit message> - <YYYY/MM/DD>
```

- **type**: Describes the kind of change being made (e.g., `feat`, `fix`, `refactor`).
- **dir**: The directory where the change was made (e.g., `components`, `utils`).
- **sub-folder/file**: Specific sub-folder or file involved in the change (optional).
- **date**: The date the commit was made in `YYYY/MM/DD` format.

#### Common Commit Types:

1. **feat**: For adding new features.
   - Example: `feat(components)[Button]: add primary button variant - 2024/10/01`

2. **refactor**: For updating or improving existing code without adding new features.
   - Example: `refactor(services)[auth]: simplify login logic - 2024/10/01`

3. **chore**: For tasks that involve maintenance or non-functional updates.
   - Example: `chore(config): update ESLint rules - 2024/10/01`

4. **style**: For adding or updating styles (e.g., CSS changes).
   - Example: `style(ui)[Navbar]: update mobile responsiveness - 2024/10/01`

5. **fix**: For bug fixes or problem resolution.
   - Example: `fix(features)[auth]: correct token validation logic - 2024/10/01`

---

#### Branch Naming Conventions

To enhance clarity and traceability, include the creation date in the branch name using the `YYYY/MM/DD` format.

##### Branch Name Format:
```
<type>/<issue-id>-<feature-or-task-name>/YYYY/MM/DD
```

- **type**: The type of branch being created (e.g., `feature`, `bugfix`, `hotfix`).
- **issue-id**: Reference to the Jira issue ID or GitHub issue number.
- **feature-or-task-name**: A brief description of the task or feature.
- **date**: The branch creation date in `YYYY/MM/DD` format.

##### Example Branch Names:

1. **Feature Branch**:  
   For new feature implementation.
   ```
   feature/PROJ-1234-add-login-flow/2024/10/01
   ```

2. **Bug Fix Branch**:  
   For fixing a bug.
   ```
   bugfix/PROJ-5678-fix-login-error/2024/10/01
   ```

3. **Hotfix Branch**:  
   For critical hotfixes.
   ```
   hotfix/PROJ-9101-patch-crash-issue/2024/10/01
   ```

4. **Chore Branch**:  
   For non-functional updates or maintenance.
   ```
   chore/update-eslint-config/2024/10/01
   ```

---

#### Issue Management

We manage all new features and bugs using **Jira Issues** integrated into GitHub. For each change, reference the corresponding Jira issue to keep track of progress and ensure proper communication across the team.

---

This ensures that both commit messages and branch names are clear, informative, and traceable by date, making collaboration more efficient!