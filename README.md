## Quest App: Full-Stack CI/CD & AWS Infrastructure

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

This repository demonstrates the complete DevOps lifecycle, cloud infrastructure setup, and automated CI/CD pipeline for a full-stack Node.js and MongoDB web application. 

It serves as a practical showcase of cloud architecture, containerization, and deployment automation using **AWS Elastic Beanstalk**, **EC2**, and **GitHub Actions**.

---

## Architecture Overview

The application is deployed across AWS using a decoupled architecture, separating the application layer from the database layer for better security and scalability.

1.  **Application Tier:** Hosted on **AWS Elastic Beanstalk** (Node.js platform).
2.  **Database Tier:** A self-managed **MongoDB** instance running inside a Docker container on an **AWS EC2 (Ubuntu)** instance.
3.  **Storage:** **AWS S3** is used to store application version artifacts during the CI/CD process.
4.  **Automation:** **GitHub Actions** handles the Continuous Integration (building the artifact) and Continuous Deployment (pushing to AWS).

---

## Project Development Journey

### 1. Application Development
* **Backend:** Utilized a pre-existing Node.js REST API (`quests-api`) as the core kernel.
* **Frontend:** Generated and integrated a dynamic frontend featuring distinct User and Admin dashboards.
* **Environment Configuration:** Implemented the 12-Factor App methodology by decoupling hardcoded database URIs and ports, allowing the app to dynamically connect using `process.env` variables across local and production environments.

### 2. Containerization (Docker)
* Authored a `Dockerfile` to package the Node.js application.
* Created a `docker-compose.yml` file to orchestrate the application, MongoDB, and Mongo-Express for seamless local development and testing.

### 3. Cloud Infrastructure Setup (AWS)
* **Database Server:** Provisioned an AWS EC2 instance. Configured security groups (port `22` for SSH, port `27017` for DB access), installed Docker, and launched a secure, authenticated MongoDB container.
* **Web Server:** Created an AWS Elastic Beanstalk environment. Injected the secure `MONGO_URI` via Elastic Beanstalk's environment properties to allow the Node.js app to securely communicate with the custom EC2 database.

### 4. CI/CD Pipeline (GitHub Actions)
Built a fully automated CI/CD pipeline triggered by a push to the `main` branch. 
* **Continuous Integration (CI):** * Checks out the repository code.
    * Creates a lightweight deployment `.zip` package (excluding `node_modules` and Git files).
    * Authenticates with AWS via IAM security credentials.
    * Uploads the artifact to an **AWS S3** bucket.
* **Continuous Deployment (CD):**
    * Registers a new application version in Elastic Beanstalk using the S3 artifact.
    * Triggers an environment update, seamlessly rolling out the new code to the live server.

---

## 📂 Repository Structure

```text
├── .github/
│   └── workflows/
│       └── main.yml   # GitHub Actions CI/CD configuration
├── config/
│   └── db.js              # Database connection logic & environment variables
├── models/
│   ├── room.js            # MongoDB schema for Quest Rooms
│   └── theme.js           # MongoDB schema for Quest Themes
├── public/                # Static assets served to the client
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── routes/                # Express API route handlers
│   ├── admin.js           # Routes for the Admin dashboard
│   └── index.js           # Routes for the User-facing pages
├── views/                 # Frontend HTML templates
│   ├── admin.html
│   └── index.html
├── app.js                 # Main Node.js/Express application entry point
├── docker-compose.yaml    # Local environment orchestration (App + DB + Mongo-Express)
├── Dockerfile             # Container blueprint for the Node.js app
├── package-lock.json      # Dependency lockfile
└── package.json           # Node.js dependencies and run scripts
```
## How to Run Locally

To run this project locally, we will first build the application image using the `Dockerfile`, and then orchestrate the database and app networks using `docker-compose`.

**1. Clone the repository:**
```bash
git clone https://github.com/balayantsDAVID/quest-aws-cicd-pipeline.git
cd quest-aws-cicd-pipeline
```

**2. Build the Application Image:**
```bash
docker build -t quest:v1 .
```

**3. Start the Infrastructure:**
```bash
docker-compose up -d
```

**4. Access the Environment:**
 * Quest App (Frontend/Backend): http://localhost:3001
 * Mongo Express (Database GUI): http://localhost:8081

**5. Stop the Environment:**
```bash
docker-compose down
```
