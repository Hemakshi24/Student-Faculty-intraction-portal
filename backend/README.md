# Backend Starter (Faculty-Student Interaction Portal)

This is a simple Node + Express + MongoDB starter for authentication (register/login) with JWT and role-based middleware.

## Setup

1. Copy `.env.example` to `.env` and update values:
```
MONGO_URI=your-mongo-uri
JWT_SECRET=your-secret
PORT=5000
```

2. Install dependencies:
```bash
npm install
```

3. Start server (development):
```bash
npm run dev
```

4. API endpoints:
- POST /api/auth/register  -> { name, email, password, role }
- POST /api/auth/login     -> { email, password }
- GET /api/dashboard       -> Protected (Authorization: Bearer <token>)
- GET /api/faculty-section -> Protected + requireRole('faculty')

