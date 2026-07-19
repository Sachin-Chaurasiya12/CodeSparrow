# 🧠 CodeSparrow

A developer-focused platform to **practice DSA, store reusable code, and build a personal knowledge system**—all in one place.

---

## 🚀 Overview

**CodeSparrow** is designed to solve a common problem:

> Developers solve problems but forget patterns and struggle to reuse solutions later, and the most important they have to use different platforms for different task

This platform connects learning, storing, and reusing code into a single workflow:

**Solve Problem → Extract Pattern → Save Snippet → Reuse Anytime**

---

## 🎯 Core Idea

Instead of using multiple tools for different purposes, CodeSparrow combines:

* DSA Practice
* Code Snippet Storage
* Personal Knowledge Management

into one unified system focused on **learning retention and reuse**.

---

## ✨ Features

### 📦 Inventory

* Store reusable code snippets
* Tag-based organization
* Search by keyword or use-case
* Favorite important snippets

### 🧠 DSA Arena

* Practice coding problems (Easy / Medium / Hard)
* Track attempts and solutions
* Learn patterns through structured problems

### 🔄 XP Vault (Core Feature)

* Buy Study Material
* Buy Snippets 
* Reuse it in future problems
* every thing with your earned points *no real Money!*

### 👥 Shared Knowledge (Friends Mode)

* Share snippets with friends or groups
* View and reuse shared code
* Upvote or save useful patterns

### 💰 Points & Unlock System

* Earn points by solving problems
* Unlock:

  * Hints
  * Approaches
  * Solutions

---

## 🏗️ Architecture

Frontend (React)
↓
API Layer (JWT Authentication)
↓

---

| Code Vault Service              |
| DSA Service                     |
| Points Service                  |
-----------------------------------

```
    ↓
```

Database (MySQL)

---

## 🧰 Tech Stack

### Backend

* Java Spring Boot
* Spring Security
* JWT Authentication
* REST APIs

### Frontend

* React.js
* JavaScript
* HTML / CSS

### Database

* MySQL

### Containerization

* Docker
* Docker Compose

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Supabase

---

## 🐳 Docker Support

CodeSparrow supports running backend services using Docker.

The repository does not include actual configuration files containing credentials.

Create your own `application.properties` or environment variables using the examples below.

### Example Docker Configuration

```properties
spring.datasource.url=jdbc:mysql://host.docker.internal:3306/codesparrow?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.initialization-fail-timeout=60000
```

### Example Local Development Configuration

```properties
spring.application.name=DashboardService

spring.datasource.url=jdbc:mysql://localhost:3306/codesparrow
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.initialization-fail-timeout=60000

jwt.secret=YOUR_SECRET_KEY

server.port=8080
```

### Security Note

The following files should not be committed to GitHub:

```gitignore
application.properties
application-docker.yml
.env
```

Use environment variables or local configuration files instead.

---

## 🔐 Security

* JWT-based authentication
* Secure API endpoints
* User-based data isolation
* Protected snippet and problem access

---

## ⚙️ How It Works

1. User logs in
2. Solves a DSA problem
3. Gains points
4. Saves useful code/snippets
5. Tags and organizes them
6. Unlocks useful learning resources
7. Reuses or shares knowledge with friends

---

## 📁 Project Structure

```text
codesparrow/
├── backend/
│   ├── auth/
│   ├── snippets/
│   ├── dsa/
│   ├── points/
│   └── api/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── services/
└── README.md
```

---

## 🧠 Learning Outcomes

* Modular system design
* JWT authentication implementation
* Database design for real-world applications
* Full-stack development
* REST API design and integration
* Docker containerization

---

## 🚧 Future Improvements

* AI-powered code suggestions
* Semantic code search
* Interview preparation mode
* Leaderboards and streaks
* Mobile application
* Collaborative coding rooms

---

## 🎯 Vision

Build a system where developers don’t just solve problems—but **retain and reuse knowledge effectively**.

---

## 👨‍💻 Author

Developed by Sachin Chaurasiya

GitHub:
https://github.com/Sachin-Chaurasiya12

---

## 📜 License

Licensed under the Apache License 2.0.

## You can be a Co-Working Partner In this project : 
For Contribution **Gmail** on *sachinchau444@gmail.com*
