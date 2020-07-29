const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database(
  "./db/highscores.db",
  sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the highscores database.");
  }
);

// something

db.close((error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Closed the database connection successfully.");
});
