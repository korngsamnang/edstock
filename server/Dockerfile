# Use the Node 20 Alpine image for a lightweight container
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma client (this will create .prisma folder inside node_modules)
RUN npx prisma generate

# Run the Prisma migration to create the database schema
RUN npx prisma migrate dev --name init

# Build the TypeScript code
RUN npm run build

# Start the Node.js application from the built code
CMD ["node", "dist/src/app.js"]
