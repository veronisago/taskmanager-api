# Task Management API

This project is a backend API built with Node.js, Express, and MongoDB for a Task Management Dashboard. It provides user authentication and task management functionality including creating, retrieving, updating, and deleting tasks. This API is designed to work in tandem with a frontend application and was developed as part of a technical interview.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)


## Features

- **User Authentication:**  
  - Register a new user.
  - Log in and receive a token for authenticated requests.
- **Task Management:**  
  - Create, retrieve, update, and delete tasks.
  - Tasks are associated with users and are grouped by status ("To Do", "In Progress", "Done").
- **Security:**  
  - Uses Helmet for basic HTTP security.
  - Implements JWT-based authentication.
- **Database Persistence:**  
  - Data is stored in MongoDB, ensuring persistence between sessions.

## Technologies Used

- **Express:** Web framework for Node.js.
- **MongoDB & Mongoose:** Database and ODM for data persistence.
- **JWT:** For user authentication.
- **BcryptJS:** For password hashing.
- **Cors & Helmet:** For enabling CORS and enhancing security.
- **Dotenv:** For managing environment variables.

## Project Structure

The backend follows the Model-View-Controller (MVC) architecture, which promotes separation of concerns and enhances scalability and maintainability.

🔹 Model-View-Controller (MVC)
The backend is structured into three key layers:

**Model (M)**

Handles data structure and interactions with MongoDB via Mongoose.
Defines schemas for entities like User and Task.

**Controller (C)**

Contains business logic and processes incoming requests.
Handles authentication, task management, and database interactions.

**Routes (View Equivalent)**

Defines API endpoints and connects them with the respective controllers.
Uses Express.js for handling HTTP requests.


## 🏗️ **Installation and Configuration**

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/veronisago/taskmanager-api.git
cd taskmanager-api
```

### **2️⃣ Install dependencies**
```sh
npm install
```

### **3️⃣ Configure environment variables**
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=mongodb_connection_string
JWT_SECRET=supersecreto
```

### **4️⃣ Run the application**
```sh
npm run dev
```
The server will start at `http://localhost:5000`.

## 📜 **Usage**
### **User Authentication**
- Use authentication endpoints to register a new user or log in.
- After logging in, a token is provided, which must be included in the `Authorization` header using the format `Bearer <token>` to access protected routes.

### **Task Management**
- Once authenticated, use the task endpoints to create, retrieve, update, or delete tasks.
- Tasks are associated with the authenticated user and grouped by status.

## 📜 **Backend Endpoints**

### **Authentication**
#### **User Registration**
`POST /api/auth/register`
##### **Request Body**:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "yourpassword"
}
```
##### **Response**:
```json
{
  "token": "jwt_token_here",
  "user": { "id": "user_id", "name": "User Name", "email": "user@example.com" }
}
```

#### **Login**
`POST /api/auth/login`
##### **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
##### **Response**:
```json
{
  "token": "jwt_token_here",
  "user": { "id": "user_id", "name": "User Name", "email": "user@example.com" }
}
```

### **Task Management**
📌 **Note**: All task endpoints require an `Authorization` header with a valid JWT token.

#### **Create Task**
`POST /api/tasks`
##### **Request Body**:
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "To Do"
}
```
##### **Response**: Newly created task object.

#### **Get Tasks**
`GET /api/tasks`
##### **Response**:
```json
{
  "To Do": [ { "id": "task_id", "title": "...", ... } ],
  "In Progress": [ ... ],
  "Done": [ ... ]
}
```

#### **Get Task by ID**
`GET /api/tasks/:id`
##### **Response**: Task object for the specified ID.

#### **Update Task**
`PUT /api/tasks/:id`
##### **Request Body**: Object with updated task fields.
##### **Response**: Updated task object.

#### **Delete Task**
`DELETE /api/tasks/:id`
##### **Response**:
```json
{ "message": "Task deleted" }
```

## 🔮 **Future Improvements**
### **Better Error Handling**
✔️ Improve error responses and logging for better debugging and feedback.

### **Additional Security Measures**
✔️ Implement security enhancements and request rate limiting.

### **Automated Testing**
✔️ Add unit and integration tests to ensure API reliability.

