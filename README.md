# 🚀 MERN Leave & Attendance Tracker

A full-stack **Leave & Attendance Management System** built using the **MERN stack** (MongoDB, Express, React + Vite, Node.js).  
It provides authentication, role-based access, leave requests, approvals, and reporting for employees, managers, and admins.

---

## 🔑 Features
- 🔐 **Authentication & Authorization** (JWT, role-based: Employee, Manager, Admin)
- 👨‍💼 **Employee**: Apply leave, view leave history
- 👩‍💼 **Manager**: Approve/Reject leave requests, view team reports
- 🛡️ **Admin**: Manage users (Employees/Managers/Admins), view overall leave reports
- 📊 **Reports & Dashboards** for attendance and leave tracking
- ⚡ Built with **React + Vite** for a fast frontend
- ⚙️ Backend with **Express.js + MongoDB**
- 🔒 Secure password storage & authentication

---

## 🛠 Tech Stack

**Frontend**
- React + Vite
- Axios
- TailwindCSS (optional styling)

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication

---

## 📂 Project Structure
mern-leave-tracker/
│── client/ # React + Vite frontend
│ ├── src/ # Components, pages, context
│ ├── public/ # Static assets
│ └── package.json # Frontend dependencies
│
│── server/ # Node.js + Express backend
│ ├── src/ # Routes, controllers, middleware
│ ├── models/ # Mongoose schemas
│ ├── package.json # Backend dependencies
│ └── .env.example # Example environment variables
│
│── README.md # Documentation
└── .gitignore # Ignored files (node_modules, env, etc.)

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/madhavikrishna27/mern-leave-tracker.git
cd mern-leave-tracker
2. Backend setup
cd server
cp .env.example .env
npm install
npm run dev
3. Frontend setup
cd ../client
cp .env.example .env
npm install
npm run dev
👉 Open the frontend on: http://localhost:5173
👉 Backend runs on: http://localhost:4000

---

✅ This way, GitHub will properly format your backend and frontend commands separately.  

Do you want me to also prepare a **badge section (MongoDB, Express, React, Node)** at the very top so your README looks like a professional open-source project?
