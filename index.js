const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');


app.get('/', function (req, res) {
  res.send('a');
});

// put successfull signal
app.get('/r/:rId', function (req, res) {
  const rId = req.params.rId;

  res.send("Ok. " + rId);
});

app.post('/new', function (req, res) {
  let url = req.body.url;
  // TODO : query parser to json
  let form_data = req.body.form_data;

  db.serialize(function () {
    const insert = db.prepare("insert into valid_xss_checker (url, form_data) values (?, ?)");
    insert.run(url, form_data);
    insert.finalize();
    db.each("select last_insert_rowid() from valid_xss_checker limit 1;", function (err, row) {
      let response = Object();
      response.rId = row['last_insert_rowid()'];
      response.url = url;
      response.form_data = form_data;
      res.send(JSON.stringify(response));
    });
  });
});

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("http://%s:%s", host, port);
});
