# 🚀 NestJS Movies APIs - TMDB Integration

A scalable backend application built with **NestJS**, **PostgreSQL**, and **Redis** following modular design, and best coding practices.

### TMDB Integration & Movie Sync

This application integrates with **[TMDB](https://www.themoviedb.org/)** to sync movies and genres into the local database.

####  Sync Methods

There are two ways to sync data from TMDB:

```
1. Manual Sync (triggered by Admin) call api (POST /api/admin/movies/tmdb/sync)
2. Automatic Sync (scheduled via Cron Job run every day at **3:00 AM** )
```

- (CRUD) After Syncing data you can make your actions on local database movies as you like.

---

## Features

- **NestJS** modular architecture (as a backend code)
- **PostgreSQL** via TypeORM (as a database)
- **Redis** for caching (as a caching system)
- **APIs Security** via JWT auth (and ready for Role-based Access Control)
- **Clean folder structure** by applying Software Design Principles & Design Patterns

---
## Tech Stack

- **[NestJS](https://nestjs.com/)** – Node.js framework
- **[PostgreSQL](https://www.postgresql.org/)** – Relational DB
- **[Redis](https://redis.io/)** – In-memory store
- **[TypeORM](https://typeorm.io/)** or Prisma – ORM
- **[Jest](https://jestjs.io/)** – Testing framework
- **[Docker](https://www.docker.com/)** – Containerization

---

## 📁 Project Structure

```bash
src/
├── common/                # Global constants, decorators, pipes, filters
│   ├── helpers/           # Global helpers functions
│   ├── filters/           # Global exception filters
│   └── interceptors/      # Global interceptors  
│
├── shared/                # Reusable logic shared across multiple modules
│   ├── cache/             # Cache Module to use it in all system

├── modules/               # Feature modules
│   ├── movies/            # Main Business/Domain Module  
          ├── intergrations # Integrations with TMDB
          └── ...          # Other main folders & files
│   ├── users/             # Users & Authentication Modules
          ├── auth/        # Authentication module (JWT, guards, decorators)
          ├── client/      # Client module (Login, Register, profile, ..)
          ├── admin/       # Admin module (Login, profile, ..)
│   └── ...                # Other feature modules 
│
├── i18n/                  # Localization & Translations
├── migrations/            # Migrations files
├── seeder/                # Seed Main Data
├── ...                    # Other main files
```

---

### 🔧 Setup

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/EngMohamedFathy/movies-tmdb-apis-nestjs.git
cd your-nestjs-project
```

2. Start the application using Docker:

```bash
docker-compose up
```

3. Once the containers are running, open your browser and navigate to:

```
http://localhost:8080/api
```

This will open the **Swagger UI** to explore the API documentation.

---

### 🔧 APIs Documentation
- The API endpoints are grouped in Swagger as follows:
- Or Use Postman collection is included in the project:
  - (TMDB APIs [nestjs].postman_collection.json)

```
📁 Client Authentication
  - POST /api/client/auth/register
  - POST /api/client/auth/login

📁 Admin Authentication
  - POST /api/admin/auth/login

📁 Client APIs
  - GET /api/client/movies
  - GET /api/client/movies/{slug}
  - POST /api/client/movies/watchlist
  - POST /api/client/movies/rating

📁 Admin APIs
  - POST /api/admin/movies
  - GET /api/admin/movies
  - GET /api/admin/movies/{id}
  - PUT /api/admin/movies/{id}
  - DELETE /api/admin/movies/{id}
  - POST /api/admin/movies/tmdb/sync
  
📁 Lookups APIs
  - GET /api/lookups/genres
```

> You can test each endpoint directly from the Swagger interface using JWT tokens after login.

### 👥 User Roles & Authentication

The system supports two types of users:

```
1. Admin
2. Client
```

Each user type has a set of secured APIs, and some public APIs are accessible without authentication.

You can use the following test accounts to authenticate and get JWT tokens for secured endpoints:

```
Admin User
Email:    admin@email.com
Password: 123456

Client User
Email:    client@email.com
Password: 123456
```
```
Key:   Authorization
Value: Bearer YOUR_JWT_TOKEN
```

### ⚡ Redis Caching Strategy
- We applied cache system by using Strategy Design Pattern.
- To improve performance and reduce database load, Redis caching is applied to some **highly-used public APIs**.

These APIs are frequently accessed by many users, so caching helps to:

- Reduce repeated database queries
- Improve response times
- Scale efficiently under high traffic

```
Caching is applied on the following public endpoints:

1. GET /api/client/movies
   - Cache Key: movies::filters::{filter_string}

2. GET /api/client/movies/{slug}
   - Cache Key: movies::slug::{slug}
```

> ⚠️ Cache is automatically **cleared** when related movie data is updated. The next request will regenerate and store the updated response in cache.



