# Use official Node.js image as the base
FROM node:20-alpine

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json .
# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm build

# Expose the port Next.js is running on (default: 3000)
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]
