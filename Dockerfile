FROM node:8 as builder
ADD . /app
WORKDIR /app
RUN cd build/musereum-fundraiser-lib && npm i && npm link
RUN npm link musereum-fundraiser-lib && npm i && npm run build-dev

FROM nginx:1.12-alpine
COPY --from=builder /app/dist /app
COPY build/nginx /etc/nginx
VOLUME /var/log/nginx
