import express from "express";
import db from "./db";
const app = express();
const port = 4000;

app.get("/", (_req, res) => {
  res.send("First request ");
});
Promise.all([
  db.query(
    `CREATE TABLE IF NOT EXISTS account1 (
      username varchar(45) NOT NULL,
      password varchar(450) NOT NULL,
      email varchar(45) NOT NULL,
      PRIMARY KEY (username)
    )`
  ),
  // Add more table create statements if you need more tables
]).then(() => {
  console.log("database initialize");
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
