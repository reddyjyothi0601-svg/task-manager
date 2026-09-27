# Task Manager — MERN Stack Full-Stack Project

A full-stack Task Manager app with user authentication (JWT) and complete
CRUD for tasks. Built with **MongoDB, Express, React (Vite), and Node.js**.

## Features
- User registration & login with hashed passwords (bcrypt) and JWT auth
- Protected API routes (only logged-in users can see/manage their own tasks)
- Create, read, update (cycle status), and delete tasks
- Clean React frontend with Context API for auth state
- Ready to deploy (backend on Render/Railway, frontend on Vercel/Netlify)

## Tech Stack
| Layer     | Technology                      |
|-----------|----------------------------------|
| Frontend  | React 18, Vite, React Router, Axios |
| Backend   | Node.js, Express                |
| Database  | MongoDB (Mongoose ODM)          |
| Auth      | JWT, bcryptjs                   |

## Project Structure
```
fullstack-task-manager/
├── backend/
│   ├── config/db.js
│   ├── models/User.js
│   ├── models/Task.js
│   ├── routes/authRoutes.js
│   ├── routes/taskRoutes.js
│   ├── middleware/authMiddleware.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── components/Navbar.jsx
    │   ├── pages/Login.jsx
    │   ├── pages/Register.jsx
    │   ├── pages/Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── .env.example
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running locally OR a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd fullstack-task-manager
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set MONGO_URI and JWT_SECRET
npm run dev
```
Backend runs on `http://localhost:5000`.

### 3. Frontend setup
Open a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs on `http://localhost:3000`.

### 4. Use the app
Open `http://localhost:3000`, register a new account, then start
adding, updating, and deleting tasks.

## API Endpoints
| Method | Endpoint            | Description          | Auth required |
|--------|----------------------|-----------------------|----------------|
| POST   | /api/auth/register  | Register new user     | No |
| POST   | /api/auth/login      | Login user             | No |
| GET    | /api/tasks           | Get all user's tasks   | Yes |
| POST   | /api/tasks           | Create a task          | Yes |
| PUT    | /api/tasks/:id        | Update a task          | Yes |
| DELETE | /api/tasks/:id        | Delete a task          | Yes |

## Pushing to GitHub
```bash
cd fullstack-task-manager
git init
git add .
git commit -m "Initial commit: full-stack task manager"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

## Possible Enhancements (good for course marks)
- Add task due-date reminders
- Add pagination/search/filtering
- Add unit tests (Jest + Supertest for backend, React Testing Library for frontend)
- Deploy live (Render + Vercel) and add the live link to this README
- Add dark mode toggle

## License
MIT — free to use for learning and coursework.
