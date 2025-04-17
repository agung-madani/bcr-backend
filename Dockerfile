# -------- Build Stage --------
    FROM node:20 AS builder

    WORKDIR /app
    
    # Copy package files and install all dependencies (including dev)
    COPY package*.json tsconfig.json ./
    RUN npm install
    
    # Copy source files and the .env file
    COPY . .
    
    # Build TypeScript to JS
    RUN npm run build
    
    # -------- Production Stage --------
    FROM node:20-slim
    
    WORKDIR /app
    
    # Copy only package files and install production deps
    COPY package*.json ./
    RUN npm install --only=production
    
    # Copy built files from previous stage
    COPY --from=builder /app/dist ./dist
    
    # Copy .env file from the build stage
    COPY --from=builder /app/.env ./
    
    # Expose the port the app listens on
    EXPOSE 3030
    
    # Run the compiled JS file (not the .ts file)
    CMD ["node", "dist/index.js"]
    