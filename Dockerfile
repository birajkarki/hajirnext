FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM nginx:alpine

#COPY --from=builder /app/out /usr/share/nginx/html

COPY --from=builder /app/.next /usr/share/nginx/html/.next

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

