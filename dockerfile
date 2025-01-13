FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/index.js"]