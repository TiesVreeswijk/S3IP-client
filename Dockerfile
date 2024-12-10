# Step 1: Build the React app
FROM node:20.17.0 AS builder
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable
COPY public /usr/share/nginx/html/public
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
