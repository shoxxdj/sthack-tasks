const red = {port:6379,srv:"redis"};
const redis = require('redis');
const subscriber  = redis.createClient({"url":"redis://redis:6379"});
subscriber.connect();

const { exec, spawn } = require('node:child_process');

subscriber.subscribe('messages', (message) => {
  console.log(message.toString()); // <Buffer 6d 65 73 73 61 67 65>
  //Do stuff here
  exec('ID='+message+' npx playwright test')
});
