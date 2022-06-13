const red = {port:6379,srv:"redis"};
const redis = require('redis');
const subscriber  = redis.createClient({"url":"redis://redis:6379"});
subscriber.connect();

const cypress = require('cypress');

subscriber.subscribe('messagerie', (message) => {
  console.log(message.toString()); // <Buffer 6d 65 73 73 61 67 65>

  cypress
  .run({
    // the path is relative to the current working directory
    spec: './cypress/integration/chall.spec.js',
    config:{
	userAgent:"CypressUA"
    }
  })
  .then((results) => {
    console.log(results)
  })
  .catch((err) => {
    console.error(err)
  })


}, true);

var cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log(message.toString()); // <Buffer 6d 65 73 73 61 67 65>

  cypress
  .run({
    // the path is relative to the current working directory
    spec: './cypress/integration/chall.spec.js',
    config:{
        userAgent:"CypressUA"
    }
  })
  .then((results) => {
    console.log(results)
  })
  .catch((err) => {
    console.error(err)
  });
});




  cypress
  .run({
    // the path is relative to the current working directory
    spec: './cypress/integration/first.spec.js',
    config:{
	userAgent:"CypressUA"
    }
  })
  .then((results) => {
    console.log(results)
  })
  .catch((err) => {
    console.error(err)
  })

