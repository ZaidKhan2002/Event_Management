# Virtual Event Management Platform - Backend

## Overview

This project is a RESTful backend application for a **Virtual Event Management Platform** built using **Node.js**, **Express.js**, and **Bun**. It provides secure user authentication, event management, and participant registration using JSON file storage instead of a database.

The application follows a layered architecture consisting of **Routes → Controllers → Services → Models**, making the code modular and easy to maintain.

---

## Features

### User Management

* User registration
* User login
* Password hashing using **bcryptjs**
* JWT-based authentication
* Role-based authorization (Organizer and Attendee)

### Event Management

* Create events
* View all events
* View a specific event
* Update events
* Delete events

### Security

* Password hashing
* JWT authentication
* Protected routes
* Role-based access control
* Request validation

### Storage

* JSON file-based persistence (no database required)

---

## Technologies Used

* Node.js
* Express.js
* Bun
* bcryptjs
* JSON Web Token (JWT)
* UUID
* dotenv
* CORS

---

## Project Structure

```text
Event_Management/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── data/
│   ├── users.json
│   └── events.json
│
├── tests/
│   ├── userService.test.js
│   └── eventService.test.js
│
├── .env
├── package.json
└── README.md
```

---

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Navigate to the project directory.

```bash
cd Event_Management
```

Install dependencies using Bun.

```bash
bun install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

---

## Running the Application

Start the development server.

```bash
bun run src/server.js
```

The server will start at:

```
http://localhost:5000
```

---

## Running Tests

Execute all tests using Bun.

```bash
bun test
```

---

## API Endpoints

### Authentication

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| POST   | `/api/register` | Register a new user   |
| POST   | `/api/login`    | Login and receive JWT |

---

### Users

| Method | Endpoint     | Description   | Authorization |
| ------ | ------------ | ------------- | ------------- |
| GET    | `/api/users` | Get all users | Organizer     |

---

### Events

| Method | Endpoint          | Description     | Authorization      |
| ------ | ----------------- | --------------- | ------------------ |
| GET    | `/api/events`     | Get all events  | Authenticated User |
| GET    | `/api/events/:id` | Get event by ID | Authenticated User |
| POST   | `/api/events`     | Create an event | Organizer          |
| PUT    | `/api/events/:id` | Update an event | Organizer (Owner)  |
| DELETE | `/api/events/:id` | Delete an event | Organizer (Owner)  |

---

## Authentication

Protected endpoints require a JWT in the `Authorization` header.

```
Authorization: Bearer <your_jwt_token>
```

---

## Sample User Registration

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password@123",
    "role": "organizer"
}
```

---

## Sample Event Creation

```json
{
    "title": "Node.js Workshop",
    "description": "Introduction to Express.js and REST APIs.",
    "date": "2026-08-15",
    "location": "Mumbai"
}
```

---

## Design Highlights

* Layered architecture (Controller → Service → Model)
* JWT authentication
* Role-based authorization
* Input validation middleware
* File-based persistence
* Async/await for asynchronous operations
* Modular and maintainable codebase

---

## Future Improvements

* Event participant registration
* Email notifications after successful registration
* Pagination and filtering
* Database integration (MongoDB/PostgreSQL)
* Swagger/OpenAPI documentation
* Docker support
* CI/CD pipeline

---

## Author

**Zaid Khan**
