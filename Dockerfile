# 1. Use the official Node.js image as a base
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the entire project into the container
COPY . .

# 6. Expose the port (make sure it matches your Express app’s port)
EXPOSE 5000

# 7. Start the application
CMD ["npm", "run", "dev"]
