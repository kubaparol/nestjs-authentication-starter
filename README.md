# NestJS Authentication Starter

A starter template for NestJS applications with built-in authentication using JWT, Passport, and Prisma.

## Features

- 🔐 JWT Authentication
- 📱 Local Authentication Strategy
- 🔄 Passport Integration
- 📚 Swagger API Documentation
- 🗃️ Prisma ORM
- 🐳 Docker support for development database
- ✨ Input validation using class-validator
- 🔒 Password hashing with bcrypt

## Prerequisites

- Node.js
- pnpm
- Docker (for development database)

## Getting Started

1. Clone the repository

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment:

```bash
# Copy the example environment file
cp .env.example .env

# Open .env and update the values:
DATABASE_URL="postgresql://postgres:123@localhost:5432/nest?schema=public"
JWT_SECRET="your-secret-key"           # Change this to a secure random string
BCRYPT_SALT_ROUNDS=10
PORT=5000
```

4. Set up Docker environment:

```bash
# Create and start the PostgreSQL container
docker compose up db -d

# Verify the container is running
docker compose ps

# Check container logs if needed
docker compose logs db
```

5. Initialize the database:

```bash
# Apply database migrations
pnpm prisma:dev:deploy

# Alternative: Restart database (removes existing data)
pnpm db:dev:restart
```

6. Start the application:

```bash
pnpm start:dev
```

## API Documentation

Once the application is running, visit `http://localhost:5000/api` to access the Swagger documentation.

### Available Endpoints

#### Auth

- POST `/auth/signin` - Sign in with email and password
- POST `/auth/signup` - Create a new user account

#### Users

- GET `/users/me` - Get current user information

## Technologies

- NestJS
- PostgreSQL
- Prisma
- Passport
- JWT
- Swagger

## Development Tools

### Database Management

- **Prisma Studio**: Web-based database browser

  ```bash
  npx prisma studio
  ```

  Access at `http://localhost:5555`

- **Docker Commands**:

  ```bash
  # View database logs
  docker compose logs db

  # Stop all containers
  docker compose down

  # Rebuild containers
  docker compose up --build
  ```

### API Testing

- Swagger UI: `http://localhost:5000/api`
- Example cURL requests:

  ```bash
  # Sign up
  curl -X POST http://localhost:5000/auth/signup \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}'

  # Sign in
  curl -X POST http://localhost:5000/auth/signin \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"password123"}'
  ```

## Docker Configuration

The project uses Docker Compose for local development. The default configuration:

```yaml
# PostgreSQL Database
- Port: 5432 (external) -> 5432 (internal)
- Username: postgres
- Password: 123
- Database: nest
```

Useful Docker commands:

```bash
# Start specific service
docker compose up db -d

# Stop all services
docker compose down

# Remove database volume and container
pnpm db:dev:rm

# View logs
docker compose logs db -f

# Rebuild container
docker compose up db --build
```

## Scripts

- `pnpm start:dev` - Start the application in development mode
- `pnpm db:dev:restart` - Restart the development database
- `pnpm build` - Build the application
- `pnpm test` - Run tests
- `pnpm lint` - Lint the codebase
