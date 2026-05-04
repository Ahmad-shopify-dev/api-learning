# Subscription API

A clean REST API to manage users, authentication, subscriptions, and automated renewal reminders.  
This project is built for learning backend API design with security, scheduling, and email notification workflows.

## Tech Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Token)
- bcryptjs
- Upstash Workflow (QStash)
- Nodemailer
- Arcjet (bot and rate-limit protection)
- dotenv

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database (local or cloud)
- Upstash QStash account
- SMTP credentials for email sending

### Installation

```bash
npm install
```

### Environment Setup

Create an environment file named:

```bash
.env.development.local
```

Add the following variables:

```env
PORT=3000
NODE_ENV=development
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
SERVER_URL=http://localhost:3000

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

QSTASH_URL=your_qstash_url
QSTASH_TOKEN=your_qstash_token

MAILER_EMAIL=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```

### Run the Project

```bash
npm run dev
```

or

```bash
npm start
```

Server runs on:

```bash
http://localhost:3000
```

## Simple Example

### 1) Register User

```bash
curl -X POST http://localhost:3000/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Ali Khan\",\"email\":\"ali@example.com\",\"password\":\"123456\"}"
```

### 2) Create Subscription (Authorized)

```bash
curl -X POST http://localhost:3000/api/v1/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -d "{\"name\":\"Netflix\",\"price\":12,\"currency\":\"USD\",\"frequency\":\"Monthly\",\"category\":\"Entertainment\",\"paymentMethod\":\"Card\"}"
```

## Workflow

1. User signs up or signs in and receives a JWT token.
2. Authorized user creates a subscription.
3. Subscription is stored in MongoDB with user relation.
4. API triggers an Upstash workflow for reminders.
5. Workflow waits for reminder dates (7, 5, 2, and 1 day before renewal).
6. Reminder email is sent to the user on due reminder dates.

## API Endpoints

### Auth

- `POST /api/v1/auth/sign-up` - Register a new user
- `POST /api/v1/auth/sign-in` - Login and get token
- `POST /api/v1/auth/sign-out` - Logout response

### Users

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get single user (authorized)

### Subscriptions

- `POST /api/v1/subscriptions` - Create subscription (authorized)
- `GET /api/v1/subscriptions/user/:id` - Get subscriptions by user (authorized)
- `GET /api/v1/subscriptions` - Placeholder route
- `GET /api/v1/subscriptions/:id` - Placeholder route

### Workflows

- `POST /api/v1/workflows/subscription/reminder` - Trigger reminder workflow

## Design Architecture

- **Routes Layer**: Defines API endpoints and maps requests to controllers.
- **Controller Layer**: Handles request logic, validation flow, and responses.
- **Model Layer**: Defines MongoDB schemas and data constraints.
- **Middleware Layer**:
  - JWT authorization
  - Arcjet security (rate limiting and bot protection)
  - centralized error handling
- **External Services**:
  - Upstash Workflow for delayed reminder orchestration
  - Nodemailer for reminder emails

Flow:

`Client -> Express Route -> Middleware -> Controller -> MongoDB / Upstash / Mail Service -> Response`

## License

This project is open source and available for everyone to use, learn from, and modify.

## Author

**StackWise Dev**  
Created for learning purpose.
