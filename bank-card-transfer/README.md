# Bank Card Stock Management System

A full-stack web application for managing bank card stock with role-based authentication and access control.

## Features

- **Authentication**: Email + password login with JWT tokens
- **Role-based Access Control**: USER and SUPER_ADMIN roles
- **User Management**: Super admins can manage all users
- **Responsive Design**: Works on desktop and mobile devices
- **Secure**: Password hashing with bcrypt, JWT authentication
- **Database**: PostgreSQL with Prisma ORM
- **CI/CD**: GitHub Actions workflow for automated testing and deployment

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **Prisma ORM** for database management
- **PostgreSQL** database
- **bcrypt** for password hashing
- **JWT** for authentication
- **Zod** for input validation

### Frontend
- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** for styling

### DevOps
- **GitHub Actions** for CI/CD
- **Docker** ready (optional)
- **ESLint** for code linting

## Project Structure

```
bank-card-stock-management/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Authentication & error handling
│   │   ├── seed.ts         # Database seeding
│   │   └── server.ts       # Express server setup
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── main.tsx        # App entry point
│   ├── package.json
│   └── vite.config.ts
├── .github/workflows/      # GitHub Actions
├── .env.example           # Environment variables template
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bank-card-stock-management
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/bank_card_db"
# JWT_SECRET="your-super-secret-jwt-key"
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb bank_card_db

# Or using psql
psql -U postgres -c "CREATE DATABASE bank_card_db;"
```

### 4. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npm run generate

# Run database migrations
npm run migrate

# Seed database with default users
npm run seed

# Start development server
npm run dev
```

The backend will be running at `http://localhost:5000`

### 5. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be running at `http://localhost:3000`

## Default Users

After running the seed script, you can login with:

### Super Admin
- **Email**: `admin@admin.com`
- **Password**: `admin123`
- **Access**: Full system access, user management

### Regular User
- **Email**: `user@example.com`
- **Password**: `user123`
- **Access**: Basic user dashboard

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Create new user
- `POST /api/auth/create-super-admin` - Create super admin (manual)

### Users (Protected)
- `GET /api/users` - Get all users (Super Admin only)
- `GET /api/users/me` - Get current user profile
- `DELETE /api/users/:id` - Delete user (Super Admin only)

### Health Check
- `GET /api/health` - Server health status

## Development

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

### Database Operations

```bash
cd backend

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

## Deployment

### Using GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Sets up PostgreSQL service
2. Installs dependencies for both backend and frontend
3. Runs database migrations
4. Seeds the database
5. Runs tests
6. Builds both applications

### Manual Deployment

1. **Prepare Production Environment**
   ```bash
   # Set production environment variables
   export NODE_ENV=production
   export DATABASE_URL="your-production-db-url"
   export JWT_SECRET="your-production-jwt-secret"
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   npm ci --only=production
   npm run build
   npm run migrate:prod
   npm run seed
   npm start
   ```

3. **Deploy Frontend**
   ```bash
   cd frontend
   npm ci
   npm run build
   # Serve the dist/ folder with a web server
   ```

### Docker Deployment (Optional)

Create `Dockerfile` for containerized deployment:

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## Security Considerations

- **Environment Variables**: Never commit `.env` files
- **JWT Secret**: Use a strong, random secret in production
- **Database**: Use connection pooling and proper indexes
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure CORS properly for your domain
- **Rate Limiting**: Consider adding rate limiting for API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
