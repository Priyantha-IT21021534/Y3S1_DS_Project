# Use the official Node.js runtime as a parent image
FROM node:10

# Set the working directory to /app
WORKDIR /index

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the required dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will listen on
EXPOSE 5000

# Start the application with nodemon for automatic reloading
CMD [ "nodemon"]
