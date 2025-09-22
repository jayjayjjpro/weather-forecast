FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Vite default dev server port
EXPOSE 5173

# Run in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
