FROM node:latest

COPY ./app /app
WORKDIR /app
RUN npm i
COPY ./localCA/rootCA.pem /usr/local/share/ca-certificates/mkcert-rootCA.crt
RUN update-ca-certificates

CMD ["node","app.js"]
