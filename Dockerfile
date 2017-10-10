FROM node:8 as builder

RUN cd musereum-fundraiser-lib && npm i && npm link musereum-fundraiser-lib && \
  cd .. && npm i && npm run build-dev

FROM nginx:1.12.1
COPY --from=builder /dist /dist
VOLUME /var/log/nginx
