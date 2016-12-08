'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', _express2.default.static(__dirname + '/../public'));

app.use('/api', _api2.default);

var server = app.listen(port, function () {
  console.log("run port => ", port);
});