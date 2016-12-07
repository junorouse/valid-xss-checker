var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('db.sqlite3');

db.serialize(function() {
  db.run("CREATE TABLE valid_xss_checker(\
           rId integer primary key   autoincrement,\
           url           TEXT      NOT NULL,\
           form_data            text       NOT NULL,\
           t        TIMESTAMP\
           DEFAULT CURRENT_TIMESTAMP\
  );");

  /*
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Isadfpsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
  */
  
});

db.close();
