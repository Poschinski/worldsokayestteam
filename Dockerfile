# Use Node 20.11 alpine as parent image
FROM node:20.11.0-alpine3.19 as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to Docker environment
COPY package*.json ./

# Install dependencies in the Docker container
RUN npm install


# Copy the rest of the codebase into the Docker container
COPY . .

# Build the app
RUN npm run build

# Stage 2: Run the app
FROM node:20.11.0-alpine3.19

WORKDIR /app

# Set the API key as an environment variable
ENV VITE_RIOT_API_KEY=$RIOT_API_KEY

# Copy the built app from the build stage
COPY --from=build /app/build ./build
COPY package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "./build/index.js"]

