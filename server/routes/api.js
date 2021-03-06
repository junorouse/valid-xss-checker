import express from 'express';
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.sqlite3');


// get starts with given url
router.get('/get/:url', function (req, res) {
  let url = req.params.url;
  db.serialize(function () {
    db.all("select * from valid_xss_checker where nickname like '%"+url+"%';", function (err, rows) {
      res.send(rows);
    });
  });
});

// put successfull signal
// update count
router.get('/r/:rId', function (req, res) {
  const rId = req.params.rId;
  const referer = req.header('Referer');
  console.log(referer);

  db.serialize(function () {
    let response = Object();
    db.run("update valid_xss_checker set count=count+1, referer=?, latest=CURRENT_TIMESTAMP where rId=?", referer, rId);
    response.rId = rId;
    response.status = "success";
    res.send(response);
  });
});

router.post('/new', function (req, res) {
  let url = "";
  let nickname = "";

  if (req.body.nickname) {
    nickname = req.body.nickname;
  } else {
    nickname = "default";
  }

  if (req.body.url) {
    url = req.body.url
  } else {
    url = "http://default.com/";
  }
  let form_data = {};
  if (req.body.form_data) {
    form_data = req.body.form_data;
  } else {
    form_data = '{"a": "TEST"}';
  }

  try {
    db.serialize(function () {
      const insert = db.prepare("insert into valid_xss_checker (nickname, url, form_data) values (?, ?, ?)");
      insert.run(nickname, url, form_data);
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

export default router;
