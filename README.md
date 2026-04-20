# AlphaRecon-FSE-assessment-repo
This repo is my submission for the Aplha Recon Full Stack Software Engineer assessment and contains frontend and backend codebases with respective readme files explaining the codebases as requested and a main readme file in the root dir of the repo explaining how to run the project locally.



🧩 Full Stack User Management Application
Overview

This project consists of two separate codebases:

Backend: Spring Boot REST API for managing users
Frontend: Angular SPA for interacting with the API

Together, they form a complete User Management system supporting:

Create users
View users
Update users
Delete users



Make sure you have the following installed:

### Backend
- Java 17+ (Java 21+ recommended)
- `JAVA_HOME` configured

### Frontend
- Node.js (v18+ recommended, v20 ideal)
- npm

---

## 🚀 How To Run Locally

You must run **both backend and frontend** for the application to work.

---

## ▶️ Step 1: Start Backend

Navigate to the backend project:

```bash
cd assessment-service
```

Windows
.\mvnw.cmd spring-boot:run

macOS / Linux
./mvnw spring-boot:run

Backend will start on:
http://localhost:8080

▶️ Step 3: Start Frontend

Open a new terminal and navigate to frontend:

cd assessment-frontend

Install dependencies:

npm install

Run the Angular app:

npm start

or

ng serve

🌐 Access the Application

Frontend runs on:

http://localhost:4200

Open this URL in your browser to use the application.
