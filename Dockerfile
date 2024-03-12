# Use the official Node.js 16 image as a parent image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build your NestJS application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "start:prod"]
