FROM node:20.11

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Prisma CLI
RUN npm install prisma --save-dev

# Generate Prisma Client
RUN npx prisma migrate dev

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["sh", "-c", "node app.js"]
