# Stage 1: Build the React application
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built React application using Nginx
FROM nginx:alpine

# Remove default nginx configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Copy build files from the build stage to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 9595 instead of 80
EXPOSE 9595

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

