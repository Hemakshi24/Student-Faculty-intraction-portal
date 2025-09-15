# Deployment & Hosting Guide

This guide covers common deployment options for the portal backend.

## Environment
Set environment variables:
- MONGO_URI
- JWT_SECRET
- JWT_REFRESH_SECRET
- PORT (optional)

## Docker
Build and run locally:
```bash
docker build -t portal-backend .
docker run -e MONGO_URI=mongodb://host:27017/portal_db -p 5000:5000 portal-backend
```
Or with docker-compose:
```bash
docker-compose up --build
```

## Heroku
- Create app
- Set config vars (MONGO_URI, JWT_SECRET, JWT_REFRESH_SECRET)
- Push to Heroku (git push heroku main)
- Ensure Procfile exists (`web: node backend/server.js`)

## Render
- Create a Web Service
- Connect repository
- Set Build Command: `cd backend && npm install`
- Start Command: `node server.js`
- Set environment variables

## Security & Production notes
- Use strong secrets
- Use HTTPS (managed by hosting provider)
- Consider using a managed MongoDB (Atlas)
- Remove `seed` script in production or protect it

