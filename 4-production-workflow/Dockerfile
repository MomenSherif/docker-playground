##### Multi step docekr file #####
# Build step
FROM node:alpine as builder
# as stageName
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

# Run step
FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html