FROM node:latest

COPY ./app /app
WORKDIR /app
RUN npm i 
RUN npx playwright install
RUN npx playwright install-deps 
#RUN npm init playwright@latest

CMD ["node","app.js"]
