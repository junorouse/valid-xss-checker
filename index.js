const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello world!');
});

// put successfull signal
// update count
app.get('/r/:rId', function (req, res) {
  const rId = req.params.rId;

  db.serialize(function () {
    let response = Object();
    db.run("update valid_xss_checker set count=count+1 where rId=?", rId);
    response.rId = rId;
    response.status = "success";
    res.send(response);
  });
});

app.post('/new', function (req, res) {
  let url = "";
  if (req.body.url) {
    url = req.body.url
  } else {
    url = "http://default.com/";
  }
  // TODO : query parser to json
  let form_data = {};
  if (req.body.form_data) {
    form_data = req.body.form_data;
  } else {
    form_data = '{"a": "TEST"}';
  }

  try {
    db.serialize(function () {
      const insert = db.prepare("insert into valid_xss_checker (url, form_data) values (?, ?)");
      insert.run(url, form_data);
      insert.finalize();
      db.each("select last_insert_rowid() from valid_xss_checker limit 1;", function (err, row) {
        let response = Object();
        response.rId = row['last_insert_rowid()'];
        response.url = url;
        response.form_data = form_data;
        res.send(response);
      });
    });
  } catch (exception) {
    res.send("Error !");
  }
});

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("run => http://%s:%s", host, port);
});
