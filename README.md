# CipherSQLStudio – Full Stack SQL Practice Platform

CipherSQLStudio is a full-stack web application that allows users to practice SQL queries in a **secure, isolated PostgreSQL sandbox**.  
Assignments and users are stored in **MongoDB Atlas**, while SQL execution happens in **temporary PostgreSQL schemas** created per session.

The platform also includes **authentication**, **AI-powered hints**, and a **modern SQL editor (Monaco Editor)**.

---

## 🚀 Features

- SQL assignment listing
- Assignment attempt page with:
  - Problem statement
  - Sample table schema
  - SQL editor (Monaco)
  - Query result viewer
- Secure SQL execution using PostgreSQL
- Dynamic workspace (schema) per session
- Login & Register using MongoDB Atlas
- JWT-based authentication
- Protected routes
- AI-powered hints (with fallback)
- Automatic cleanup of inactive workspaces
- Modern UI with SCSS, animations, loaders

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router
- Monaco Editor
- SCSS (Sass)

### Backend
- Node.js
- Express.js

### Databases
- **MongoDB Atlas** – users, assignments, session metadata
- **PostgreSQL** – SQL execution engine (sandbox)

### Authentication
- JWT (JSON Web Tokens)

### AI
- Groq / OpenAI-compatible LLM (used only for hints)

---

---

## 🧱 Prerequisites

Make sure the following are installed:

- Node.js (v18+ recommended)
- npm
- Git
- PostgreSQL
- pgAdmin (optional but recommended)
- MongoDB Atlas account

---

## 🔹 Frontend Setup
```bash
cd ciphersqlstudio-frontend
npm install
npm run dev

## 🔹 Backend Setup
### Navigate to backend directory
```bash
cd ciphersqlstudio-backend
npm install
npm run dev

🗄️ Database Usage
MongoDB Atlas
Used for:
Users (Login / Register)
Assignments
Workspace session metadata

##Seed assignment data:
node src/scripts/seedFromJson.js
