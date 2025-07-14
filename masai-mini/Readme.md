# 📚 Books Library Management App (MERN Stack)

A simplified Goodreads-like web app built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can register, log in, browse a book list, track reading progress, and rate books.

---

## ✨ Features

### 👤 User Authentication
- Register & login using JWT
- HTTP-only cookies for secure sessions
- Logout functionality
- Protected routes using middleware

### 📚 Book Management
- Browse all available books
- Add books to your personal reading list
- Track reading status: _Want to Read_, _Currently Reading_, _Read_
- Rate books (1–5 stars)

---

## 🔗 Project URLs

- 🚀 **Frontend Live**: [https://mini-project-tau-ruddy.vercel.app](https://mini-project-tau-ruddy.vercel.app)
- 🔧 **Backend API**: [https://mini-project-mme9.onrender.com/](https://mini-project-mme9.onrender.com/)

> ℹ️ Replace with your actual deployment URLs

---

## 🛠️ Tech Stack

| Frontend              | Backend               | Other Tools        |
|-----------------------|------------------------|---------------------|
| React + Vite          | Node.js + Express.js   | JWT, bcryptjs       |
| Context API or Redux  | MongoDB + Mongoose     | Axios, Tailwind CSS |
| React Router DOM      | Cookie-based sessions  | dotenv, cors        |

---


---

## 🔐 Environment Variables

Create a `.env` file in `/server`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret




## 🚀 Running the App Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/books-library-app.git
cd books-library-app

### 2.install backend dependencies
 ```bash
 cd server
npm install

### 3.install frontend dependencies
 ```bash
 cd server
npm install


### 4.Run Both Servers in Development Mode
 ```bash
npm run dev
