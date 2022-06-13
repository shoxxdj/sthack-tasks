FROM node:18.1.0
COPY code /src
WORKDIR /src
RUN npm install
RUN npm run build
RUN npm i -g serve
CMD ["serve","-s","dist","-l","3000"]
