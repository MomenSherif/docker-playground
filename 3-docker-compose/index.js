const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
  // We can pass container name instead of external URL, as docker will see that we want to connect to other container and will redirect us
  host: 'redis-server',
  port: 6379,
});

client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set('visits', +visits + 1);
  });
});

app.listen('8081', () => {
  console.log('Listenin on port 8081');
});
