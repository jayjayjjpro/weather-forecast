# Use the latest Node.js image
FROM node:latest

# Set working directory inside container
WORKDIR /app

# Copy only dependency files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server (accessible on localhost:5173)
CMD ["npm", "run", "dev", "--", "--host"]