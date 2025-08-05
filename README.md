# Backend API Learning Project

A learning project showcasing backend development with Node.js, TypeScript, and modern web technologies.

## Tech Stack

- **Backend**: Node.js, TypeScript, Fastify
- **Database**: MySQL with Sequelize ORM
- **Frontend**: React, TypeScript, Vite
- **Tools**: ESLint, Nodemon, pnpm, Tailwind CSS

## Features

- RESTful API design
- Account management (CRUD operations)
- Database modeling with Sequelize
- TypeScript for type safety
- Input validation with TypeBox
- Structured project architecture

## Getting Started

### Prerequisites

- Node.js (v22+)
- MySQL
- pnpm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce-backend
```

2. Install dependencies (from root directory)
```bash
pnpm install
```

4. Set up environment variables
```bash
# Create .env file in server directory (use .env.sample as template)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=database_name
DB_USERNAME=username
DB_PASSWORD=password
```

5. Run database migrations
```bash
pnpm --filter server migrate:up
```

6. Start the development servers
```bash
# Option 1: Run both simultaneously (from root)
pnpm dev

# Option 2: Run individually
pnpm dev:server  # Backend only
pnpm dev:client  # Frontend only
```

## Project Structure

```
├── server/                 # Backend API
│   ├── src/
│   │   ├── domains/        # Domain-specific modules
│   │   ├── shared/         # Shared utilities
│   │   └── config/         # Configuration files
│   └── migrations/         # Database migrations
└── client/                 # Frontend React app
    └── src/
```

## API Endpoints (WIP)

- `GET /api/accounts` - List all accounts
- `POST /api/accounts` - Create new account
- `GET /api/accounts/:id` - Get account by ID
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account

## Learning Goals

- Modern Node.js backend architecture
- TypeScript best practices
- Database design and ORM usage
- API design patterns
- Frontend-backend integration
- Code organization and project structure

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About

This is a learning project created to practice and demonstrate backend development skills. Feel free to explore the code and use it as a reference for your own learning journey.
