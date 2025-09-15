# Use official Node LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app code
COPY . .

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
