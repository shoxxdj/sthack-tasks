FROM node:18.1.0
RUN apt update
RUN apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y
COPY code /src
WORKDIR /src
RUN npm install 
CMD ["npm","start"]
