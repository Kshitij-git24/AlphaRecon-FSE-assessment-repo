# Assessment Service

## Overview

This project is a small Spring Boot REST API for managing users. It exposes CRUD-style endpoints for creating, listing, updating, and deleting user records, and stores data in an in-memory H2 database.

The current implementation is backend-only. There is no separate frontend application in this repository, so the API itself is the primary interface for local development and testing.

## System Architecture

The service follows a conventional layered Spring Boot structure:

1. `controller` handles HTTP requests and response codes.
2. `service` contains the application logic for working with users.
3. `repository` provides persistence through Spring Data JPA.
4. `model` defines the database entity.
5. `dto` isolates API request/response payloads from the persistence model.
6. `exception` centralizes error handling and API error responses.

Request flow:

`HTTP request -> UserController -> UserService -> UserRepository -> H2 database`

Response flow:

`Database/entity -> service mapping -> UserResponse DTO -> JSON response`

## Project Structure

```text
src/
  main/
    java/com/alphaReconFSE/assessment/
      controller/     REST endpoints
      dto/            Request and response payloads
      exception/      Error types and global exception handling
      model/          JPA entity definitions
      repository/     Spring Data repositories
      service/        Business logic
      AssessmentApplication.java
    resources/
      application.properties
  test/
    java/com/alphaReconFSE/assessment/
      AssessmentApplicationTests.java
```

## Backend Components

### Controller Layer

`UserController` exposes the API under `/users`:

- `GET /users` returns all users
- `POST /users` creates a new user
- `PUT /users/{id}` updates an existing user
- `DELETE /users/{id}` deletes a user

Validation is applied to incoming request bodies using Jakarta Bean Validation.

### Service Layer

`UserServiceImpl` contains the core user operations:

- fetch all users
- create a user from a request DTO
- update an existing user after loading it by ID
- delete a user after verifying it exists

This layer also maps the `User` entity to the outward-facing `UserResponse` DTO.

### Persistence Layer

`UserRepository` extends `JpaRepository<User, Long>`, which keeps the data-access layer intentionally small and relies on Spring Data JPA for standard CRUD behavior.

The `User` entity maps to a `users` table and includes:

- `id`
- `name`
- `email` with a uniqueness constraint
- `note`

### Error Handling

`GlobalExceptionHandler` standardizes API failures:

- `404 Not Found` for missing users
- `400 Bad Request` for validation failures
- `500 Internal Server Error` for unexpected exceptions

The API returns a structured `ApiErrorResponse` object with a timestamp, status code, error label, and message.

## Frontend Structure

There is no frontend component in the current repository.

If a frontend were added later, a practical next step would be to keep it separate from the Spring Boot codebase and have it consume the `/users` API over HTTP. That would preserve a clean backend boundary and make deployment options more flexible.

## Technology Choices

### Spring Boot

Spring Boot was chosen because it provides fast setup for production-style REST services, embedded server support, and strong integration across web, validation, and persistence concerns.

### Spring Web

Used to implement REST endpoints, request routing, JSON serialization, and HTTP response handling.

### Spring Data JPA

Used to reduce boilerplate for persistence and repository operations. It fits well for simple CRUD applications and keeps the repository layer concise.

### H2 Database

H2 was selected for simplicity and low setup overhead during local development and assessment use. Because it runs in memory, developers can start the project without provisioning an external database.

### Jakarta Validation

Validation annotations on `UserRequest` make request validation explicit and keep controller logic cleaner.

### Lombok

Lombok reduces repetitive boilerplate such as constructors, getters/setters, and builders, making the code more concise.

### Maven

Maven is used as the build tool because it integrates cleanly with Spring Boot and provides a familiar Java project structure for dependency management, packaging, and test execution.

## Design Tradeoffs

- Using an in-memory H2 database makes local setup very easy, but data is lost whenever the application restarts.
- Relying on generated JPA repository methods keeps the code small, but it also means there is little room yet for richer query logic or domain-specific repository behavior.
- DTOs provide separation between API payloads and entities, but the mapping is currently manual inside the service layer rather than centralized in a mapper class.
- A global catch-all exception handler prevents raw stack traces from leaking to clients, but it currently hides the underlying cause of unexpected failures from API consumers.
- The codebase is intentionally lightweight, but that also means there are only minimal automated tests at the moment.

## Current Limitations

- The database is in-memory only and not suitable for persistent environments.
- Only a basic `contextLoads` test exists; controller, service, repository, and validation behavior are not thoroughly tested yet.
- There is no pagination, filtering, or sorting on `GET /users`.
- Duplicate email conflicts rely on the database constraint and are not translated into a dedicated API error response.
- There is no authentication, authorization, or rate limiting.
- Logging is present, but there is no structured observability setup such as metrics or tracing.
- Environment-specific configuration is minimal.

## Improvements With More Time

- Add unit and integration tests for the controller, service, repository, and exception handling.
- Add dedicated handling for database constraint violations such as duplicate emails.
- Replace H2 with a persistent database such as PostgreSQL for non-local environments.
- Introduce pagination and optional filtering for user listing endpoints.
- Add API documentation with OpenAPI/Swagger.
- Extract DTO/entity mapping into a dedicated mapper layer.
- Add profiles for local, test, and production configurations.
- Add containerization support with Docker and, if needed, `docker-compose`.
- Build a small frontend client for managing users through the API.

## Prerequisites

Before running the project locally, make sure you have:

- Java 25 installed
- `JAVA_HOME` configured to that JDK

The repository includes Maven Wrapper scripts (`mvnw` and `mvnw.cmd`), so installing Maven separately is optional.

## Environment Configuration

The application is configured through `src/main/resources/application.properties`.

Current defaults:

- application name: `assessment`
- database URL: `jdbc:h2:mem:userdb`
- H2 console enabled at `/h2-console`
- Hibernate DDL mode: `update`

No additional environment variables are required for the current implementation.

## Build And Run Locally

### Windows

```powershell
.\mvnw.cmd spring-boot:run
```

### macOS / Linux

```bash
./mvnw spring-boot:run
```

By default, the application starts on:

`http://localhost:8080`


## Running Tests

### Windows

```powershell
.\mvnw.cmd test
```

### macOS / Linux

```bash
./mvnw test
```

## Example API Usage

Create a user:

```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Jane Doe\",\"email\":\"jane@example.com\",\"note\":\"First user\"}"
```

List users:

```bash
curl http://localhost:8080/users
```

Update a user:

```bash
curl -X PUT http://localhost:8080/users/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Jane Smith\",\"email\":\"jane.smith@example.com\",\"note\":\"Updated note\"}"
```

Delete a user:

```bash
curl -X DELETE http://localhost:8080/users/1
```

## Notes For Engineers

- This repository currently implements only the backend portion of the system.
- Because `spring.jpa.hibernate.ddl-auto=update` is enabled, the schema is managed automatically during startup for the in-memory database.
- The `email` column is unique at the database level, so repeated inserts with the same email will fail.
