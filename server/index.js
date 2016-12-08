import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const app = express();

let port = 8080;
let devPort = 7070;

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(__dirname + '/../public'));

import routes from './routes/api';
app.use('/api', routes);

const server = app.listen(port, () => {
  console.log("run port => ", port);
});
