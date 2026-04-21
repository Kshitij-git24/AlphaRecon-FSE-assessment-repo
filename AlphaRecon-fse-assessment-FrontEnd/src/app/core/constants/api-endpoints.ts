/**
 * Use a same-origin path so `ng serve` can proxy to Spring Boot (see repo root `proxy.conf.json`).
 * This avoids browser CORS blocking when the UI is on :4200 and the API is on :8080.
 * Production: host the SPA behind a reverse proxy that maps `/api` → your API, or switch to a full backend URL + CORS.
 */
export const API_ENDPOINTS = {
  users: '/api/users'
} as const;
