import express from 'express';

const app = express();

let port = 8080;

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(__dirname + '/../public'));

import routes from './routes/api';
app.use('/api', routes);

const server = app.listen(port, () => {
  console.log("run port => ", port);
});
