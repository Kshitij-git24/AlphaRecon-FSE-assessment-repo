# AlphaRecon FSE Assessment

## Overview

This repository contains the frontend application for a small user-management system. The UI allows a user to:

- list users from a backend data store
- create a user
- update an existing user
- delete a user

The frontend is implemented as a standalone Angular application and communicates with a backend API over HTTP. The backend is expected to own persistence and database access; that backend is not included in this repository.

## System Architecture

At a high level, the system follows a simple client/server model:

1. The Angular SPA renders the user-management experience in the browser.
2. The frontend calls a REST API at `/api/users`.
3. During local development, Angular proxies `/api/*` requests to `http://localhost:8080`.
4. The backend performs validation, business logic, and persistence against the database.

### Runtime flow

- The browser loads the Angular application.
- Routing sends the user to the `/users` page.
- The users page requests the current user list from the backend.
- Form submissions trigger `POST` or `PUT` requests.
- Delete actions trigger a `DELETE` request.
- After each mutation, the frontend refreshes the list to keep the UI aligned with the database state.

## Repository Scope

This repository currently contains:

- Angular frontend application
- UI components for listing and editing users
- API integration logic for CRUD operations
- local development proxy configuration

This repository does not currently contain:

- backend service implementation
- database schema or migration files
- containerization or deployment manifests
- end-to-end test suite

## Frontend Structure

The frontend follows a feature-oriented Angular structure under `src/app`:

### App shell

- `src/app/app.ts`: root application component
- `src/app/app.html`: app shell layout
- `src/app/app.routes.ts`: route definitions
- `src/app/app.config.ts`: Angular providers such as router, HTTP client, and animations

### Core

- `src/app/core/constants/api-endpoints.ts`: central place for API endpoint definitions

### Features

- `src/app/features/users/models/user.model.ts`: TypeScript interfaces for `User` and `UserPayload`
- `src/app/features/users/services/user.service.ts`: HTTP service for list/create/update/delete operations
- `src/app/features/users/pages/user-management-page/*`: page-level UI, table, loading state, and interaction orchestration
- `src/app/features/users/components/user-form/*`: reusable create/update form

### Shared

- `src/app/shared/components/confirm-dialog/*`: shared confirmation dialog used before deleting a user

## Backend Integration

The frontend assumes a REST API with the following contract:

- `GET /users`: return all users
- `POST /users`: create a user
- `PUT /users/{id}`: update a user
- `DELETE /users/{id}`: delete a user

In the Angular app, those routes are referenced through `/api/users`. The development proxy in `proxy.conf.json` rewrites `/api/users` to `http://localhost:8080/users`, which keeps the browser on a same-origin path during local development and avoids CORS issues.

## Why These Technologies

### Angular

Angular is a good fit here because:

- it provides strong structure for small-to-medium business applications
- TypeScript is first-class, which improves maintainability and refactoring safety
- forms, routing, and HTTP concerns are well supported out of the box
- standalone components reduce module boilerplate in newer Angular versions

### Angular Material

Angular Material was chosen because:

- it speeds up delivery of a polished CRUD interface
- it provides accessible primitives for tables, dialogs, form fields, buttons, and feedback components
- it keeps the UI implementation consistent without building a full design system from scratch

### RxJS

RxJS is used because Angular’s HTTP client returns observables natively, making it a natural choice for asynchronous data flows and request lifecycle handling.

### Tailwind/PostCSS

The project includes Tailwind/PostCSS tooling, although the current implementation relies primarily on Angular Material plus component-scoped CSS. This is a reasonable middle ground for quick iteration without introducing unnecessary styling complexity into a small app.

## Key Design Decisions

### Feature-oriented folder layout

The user-management capability is grouped into `models`, `services`, `components`, and `pages`, which makes the feature easier to extend without scattering related code across the app.

### Thin page + service split

The page component owns UI state and user interaction. The service owns HTTP communication. This keeps API calls centralized and makes future reuse easier.

### Standalone components

Using Angular standalone components simplifies composition and reduces NgModule overhead, which is especially helpful in a compact assessment project.

### Proxy-based local API access

Using `/api` plus `proxy.conf.json` is simpler and safer than hardcoding a backend URL in development. It also mirrors how a reverse proxy would typically be configured in production.

## Tradeoffs

- The application is intentionally simple and keeps most state local to the page component. This reduces complexity, but it would become harder to scale if many screens started sharing the same data.
- The app refreshes the full user list after create/update/delete instead of applying optimistic UI updates. This is simpler and more reliable, but less efficient than updating local state in place.
- The UI is built quickly on top of Angular Material rather than a bespoke design system. This accelerates delivery, but limits deep customization unless additional styling work is added.
- The frontend assumes a backend contract rather than generating API clients from a schema. This keeps setup light, but increases the chance of frontend/backend drift over time.

## Current Limitations

- The backend is not part of this repository, so the project cannot be run fully end-to-end without an external service running on `localhost:8080`.
- Error handling is user-friendly but still basic; there is no retry strategy, centralized error interceptor, or structured API error mapping.
- There is minimal automated test coverage in the current implementation.
- Authentication and authorization are not present.
- There is no pagination, filtering, or sorting for larger user datasets.
- Environment handling is lightweight; there are no separate Angular environment files or deployment-specific runtime configuration.

## Improvements With More Time

- add unit tests for the page component, form component, and service
- add API contract documentation or OpenAPI generation
- introduce stronger validation and server-side error mapping
- add pagination, search, and sorting to the user table
- move API base URL handling to environment-specific configuration
- add loading/error state helpers or a small state-management layer if the app grows
- add CI checks for linting, tests, and production builds
- add Docker support and deployment documentation

## Prerequisites

To run this project locally, you need:

- Node.js 20+ recommended
- npm
- a backend API running locally on `http://localhost:8080`

The backend should expose the REST endpoints described above and be connected to its database.

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the backend

Run the backend separately on `http://localhost:8080`.

The frontend expects the backend to serve:

```text
GET    /users
POST   /users
PUT    /users/{id}
DELETE /users/{id}
```

### 3. Start the frontend

```bash
npm start
```

or:

```bash
ng serve
```

The Angular dev server runs on:

```text
http://localhost:4200
```

Because `proxy.conf.json` is already configured in `angular.json`, requests to `/api/*` from the frontend will be proxied automatically to `http://localhost:8080/*`.

## Build

To create a production build:

```bash
npm run build
```

Build output is written to:

```text
dist/AlphaRecon-fse-assessment-v1/browser
```

## Test

To run the configured test command:

```bash
npm test
```

## Environment Notes

- No `.env` file is currently required by the frontend.
- The most important local environment dependency is that the backend must be reachable at `http://localhost:8080`.
- If the backend runs elsewhere, update the proxy target in `proxy.conf.json` or switch the frontend API configuration accordingly.

## Production Considerations

For production deployment, a better setup would be:

- serve the Angular build behind Nginx, Apache, or another reverse proxy
- route `/api` requests from the same origin to the backend service
- add backend CORS policy only if frontend and backend must live on different origins
- use environment-specific configuration for API base URLs and observability settings

## Summary

This project is a focused Angular frontend for user CRUD operations. Its design favors clarity, fast delivery, and low setup complexity. The codebase is structured cleanly enough for extension, while still leaving room for stronger testing, backend contract formalization, and deployment hardening in a production-grade version.
