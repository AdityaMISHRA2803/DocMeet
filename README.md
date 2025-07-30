# 🩺 DocMeet – Smart Appointment Booking with Medicine & Diet Tracking


## 📌 Overview

**DocMeet** is a smart and secure full-stack web application designed for healthcare management. It allows users to:

- 📅 Book and manage medical appointments
- 💊 Track medicine schedules
- 🥗 Monitor personalized diet plans
- 🧑‍⚕️ Doctors can manage their schedules and patient data

The platform features secure authentication, dynamic server-rendered pages using **EJS**, and modular architecture using **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- ✅ Secure user authentication (JWT + bcrypt)
- 📅 Smart appointment booking system
- 💊 Medicine tracking 
- 🥗 Diet tracking and personalized plans
- 📱 Responsive UI using EJS and CSS
- 🧾 Server-rendered views with EJS templates

---

## 🛠️ Tech Stack

| Layer        | Technologies                    |
|--------------|----------------------------------|
| **Frontend** | EJS, HTML, CSS, JavaScript       |
| **Backend**  | Node.js, Express.js              |
| **Database** | MongoDB (with Mongoose)          |
| **Auth**     | JSON Web Tokens (JWT), bcrypt.js |
| **Views**    | Server-rendered using EJS        |

---

## 📁 Folder Structure

DocMeet/
├── config/ # Database config and secrets
├── controller/ # Route logic and handlers
├── middleware/ # Authentication & error handlers
├── models/ # Mongoose models
├── node_modules/
├── public/ # Static assets (CSS, JS, images)
├── routes/ # Application routes
├── views/ # EJS templates (pages, partials)
│ ├── partials/
│ ├── auth.ejs
│ ├── dashboard.ejs
│ └── ...
├── index.js # Entry point of the server
├── package.json
└── .env # Environment variables

---

✅ Best Practices Implemented
Modular MVC architecture

Passwords hashed using bcrypt

JWT for session management

Clean separation of logic (routes/controllers/models/views)

RESTful API structure with EJS views



---



## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AdityaMISHRA2803/DocMeet.git

## How to run the project

#### 1. Install the dependencies

`npm install`

#### 2. Run the project

`npm start`

