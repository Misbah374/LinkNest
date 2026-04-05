# 🔗 LinkNest

A full-stack link management application where users can save, categorize, and track their important links in one place.

---

## 🚀 Features

* 🔐 User Authentication (Register/Login)
* 📁 Category-based link organization
* 🔗 Shortened links support
* 📊 Click tracking for each link
* 🧠 Clean and simple UI

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Misbah374/LinkNest.git
cd linknest
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:
```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:
```
VITE_API_URL=http://localhost:5000
```

Run frontend:
```bash
npm run dev
```

---
