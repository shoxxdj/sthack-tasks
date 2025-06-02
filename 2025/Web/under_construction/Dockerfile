FROM node:latest

COPY ./app /app
WORKDIR /app
RUN npm i 
# RUN apt update && apt install -y libnss3-tools curl 
# RUN curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64" && cp mkcert-v*-linux-amd64 mkcert && chmod +x mkcert && ./mkcert -install
# RUN ./mkcert under_construction admin_website.local localhost 127.0.0.1



CMD ["node","app.js"]
