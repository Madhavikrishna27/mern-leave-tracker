# 🚀 MERN Leave & Attendance Tracker

A full-stack **Leave & Attendance Management System** built using the **MERN stack** (MongoDB, Express, React + Vite, Node.js).  
It provides authentication, role-based access, leave requests, approvals, and reporting for employees, managers, and admins.  

---

## 📌 Features
- 🔑 **Authentication & Authorization** (JWT, role-based: Employee, Manager, Admin)
- 👨‍💼 **Employee**: Apply leave, view leave history
- 👩‍💼 **Manager**: Approve/Reject leave requests, view team reports
- 🛡 **Admin**: Manage users (Employees/Managers/Admins), view overall leave reports
- 📊 **Reports & Dashboards** for attendance and leave tracking
- ⚡ Built with **React + Vite** for fast frontend
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
│── .gitignore # Ignored files (node_modules, env, etc.)
Cleaned duplicate project structure heading
