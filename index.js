const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('a');
});

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("http://%s:%s", host, port);
});
