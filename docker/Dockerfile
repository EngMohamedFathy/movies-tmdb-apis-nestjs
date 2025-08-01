
# Development stage
FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY .. .
CMD ["npm", "run", "start:dev"]

# Production stage
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY .. .
RUN npm run build
CMD ["node", "dist/main.js"]
