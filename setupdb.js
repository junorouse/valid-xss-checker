const sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database('db.sqlite3');

db.serialize(function() {
  db.run("CREATE TABLE valid_xss_checker(\
           rId integer primary key   autoincrement,\
           count unsigned integer default 0,\
           url           TEXT      NOT NULL,\
           form_data            text       NOT NULL,\
           t        TIMESTAMP\
           DEFAULT CURRENT_TIMESTAMP\
  );");
});

db.close();
