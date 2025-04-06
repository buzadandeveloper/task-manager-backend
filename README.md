
<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <b>Task Manager Backend</b> – A scalable and secure API for task management, built with NestJS, Prisma, and PostgreSQL.
</p>

---

## 🚀 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Authentication**: Google & GitHub OAuth + JWT (stored in HttpOnly cookies)
- **Deployment**: Railway (Backend), Vercel (Frontend)
- **Security**: CORS, JWT, Rate Limiting, HttpOnly Cookies

---

## 📦 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/buzadandeveloper/task-manager-backend.git
cd task-manager-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.dev` file in the root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

> Make sure your `.env.dev` file is excluded from Git (`.gitignore` includes it by default).

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the app locally

```bash
# Development
npm run start:dev
```

---

## ✅ Features

- 🔐 OAuth login via Google & GitHub
- 🍪 JWT-based auth stored in secure HttpOnly cookies
- 🧩 Profile endpoint to get current user
- 🚪 Logout endpoint that clears the cookie
- 🌍 CORS configured for frontend access
- ⏳ JWT expiration and token validation
- 🛡 Global rate limiting to prevent spam/abuse
- 📚 Swagger API docs (available at `/api` when running locally)

---

## 🌐 Deployment

Backend is deployed using **[Railway](https://railway.app/)**.  
Frontend is deployed on **[Vercel](https://vercel.com/)**.

Make sure to set all your environment variables inside Railway's **Environment** tab (same as in `.env.dev`).

---

## 📘 Swagger Docs

When running locally, Swagger is available at:

```
http://localhost:3000/api
```

---

## 🧠 Useful Tips

- Use Postman to test protected routes by setting the `token` cookie manually.
- Don't forget to restart the server when adding new routes for them to appear in Swagger.
- JWTs expire in 24 hours and are verified using guards (`JwtAuthGuard`).

---
