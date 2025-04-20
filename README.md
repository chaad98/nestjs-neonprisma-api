## 🚀 About This Project

This is an **all-in-one NestJS course project** built as part of my journey to understand how to properly structure and build a scalable backend application using [NestJS](https://nestjs.com/).

It focuses on core concepts and real-world practices that every NestJS developer should learn, from routing to database integration and custom logging. Below are the major topics and tools that this project covers:

---

### 📁 Project Structure Highlights

- **📦 Controller**  
  Manages all incoming HTTP requests (GET, POST, PATCH, DELETE, etc.) and delegates business logic to services.  
  Each route is cleanly separated and follows RESTful principles.

- **🧩 Module**  
  Used to organize features into cohesive blocks of functionality.  
  Helps make the app scalable and maintainable.

- **🛠️ Service**  
  Where the real business logic lives.  
  Services talk to the database, handle data processing, and are injected into controllers.

- **🪵 Custom Logger**  
  Built my own logging service using a provider (`MyLoggerService`) to capture and store every request.  
  Supports both success logs and error logs, and can be extended to log into files, databases, or external platforms.

---

### 🧠 What I Learned

- How NestJS organizes code in a modular and clean way
- How to build and expose RESTful API endpoints
- How to connect NestJS with **Neon DB** using **Prisma ORM**
- How to implement **custom logging logic** to track all activity across the backend
- How to apply **Rate Limiting** and skip it when necessary using decorators like `@SkipThrottle()`

---

### 🧰 Tech Stack

- **⚙️ NestJS** – Main backend framework (built on Express)
- **📡 Prisma ORM** – Type-safe ORM for database access and modeling
- **☁️ Neon (via Prisma)** – Cloud-hosted database solution, no raw SQL needed
- **🧪 REST API** – Fully functioning endpoints for CRUD operations
- **🪵 Custom Logging** – Used to track all request activity and errors

---

### 💡 Bonus Skills

- Decorators like `@Controller()`, `@Get()`, `@Post()`
- Dependency injection for services and logging
- Custom log formatting using service classes
- Type safety using DTOs and Prisma types
- Handling query parameters, path variables, and request bodies

---

If you're also learning NestJS, this is a great starter + intermediate project to understand not just the syntax — but **why** things are structured the way they are.
