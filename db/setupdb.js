const sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database('db.sqlite3');

db.serialize(function() {
  db.run("CREATE TABLE valid_xss_checker(\
           rId integer primary key   autoincrement,\
           count unsigned integer default 0,\
           nickname           TEXT      NOT NULL,\
           url           TEXT      NOT NULL,\
           referer           TEXT default 'nothing',\
           form_data            text       NOT NULL,\
           creation        TIMESTAMP\
           DEFAULT CURRENT_TIMESTAMP,\
           latest        TIMESTAMP\
           DEFAULT CURRENT_TIMESTAMP\
  );");
});

db.close();
