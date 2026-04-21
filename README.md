# AlphaRecon-FSE-assessment-repo
This repo is my submission for the Aplha Recon Full Stack Software Engineer assessment and contains frontend and backend codebases with respective readme files explaining the codebases as requested and a main readme file in the root dir of the repo explaining how to run the project locally.

There are ReadMe files in both the frontEnd and the BackEnd repo for better understanding, explaining stuff that was expected as per the requirements.
This readMe is purely for running this full stack app locally.


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
- Java 25
- `JAVA_HOME` configured

### Frontend
- Node.js (v18+ recommended, v20 ideal)
- npm

---

## 🚀 How To Run Locally

You must run **both backend and frontend** for the application to work.

---

Clone the repository and open in vscode. Open two terminals, one for each folder((1)AlphaRecon-fse-assessment-BackEnd and (2)AlphaRecon-fse-assessment-FrontEnd) in the root directory.

## ▶️ Step 1: Start Backend

Navigate to the backend project:

```bash
cd AlphaRecon-fse-assessment-BackEnd
```

Windows - 
```bash
.\mvnw.cmd spring-boot:run
```
------OR------ 

macOS / Linux - 

```bash
./mvnw spring-boot:run
```

Backend will start on:

http://localhost:8080

## ▶️ Step 2: Start Frontend

Open a new terminal and navigate to frontend:

```bash
cd AlphaRecon-fse-assessment-FrontEnd
```

Install dependencies:

```bash
npm install
```
Run the Angular app:

```bash
npm start
```
or

```bash
ng serve
```

## ▶️ Step 3: 🌐 Access the Application

Frontend runs on:

```bash
http://localhost:4200/users
```

Open this URL in your browser to use the application.


## 🧪 Quick Test Flow
Open http://localhost:4200
Create a new user
See it appear in the list
Edit the user
Delete the user

## ⚠️ Important Notes
In-Memory Database  
The backend uses H2 (in-memory)  
All data is lost when the backend restarts  
Backend Must Be Running First  
Frontend depends on backend APIs  
If backend is not running, UI will not function correctly  
Default Ports  
Backend: 8080   
Frontend: 4200  


## 🐛 Troubleshooting  
Frontend shows no data
Ensure backend is running
Test API:
```bash
curl http://localhost:8080/users
```
API errors (500)    
Check backend logs in terminal  
Most issues come from validation or exceptions  

To run the full application:  

Start backend (AlphaRecon-fse-assessment-BackEnd)  
Start frontend (AlphaRecon-fse-assessment-FrontEnd)  
Open http://localhost:4200  

You're now running the full stack locally 🚀  
