# Use the official Node.js image as our base
FROM node:21

# Set the working directory inside the container
WORKDIR /usr/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install app dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of our app's source code into the container
COPY . .
# Expose the port the app will run on

# The command to run our app
CMD ["npm", "run", "dev"]
