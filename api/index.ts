import express from "express";
import bodyParser from "body-parser";
import db from "./db";
import userRouter from "./routes/user";
import bookingRouter from "./routes/booking";
import cors from "cors";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors);
app.use("/user", userRouter);
app.use("/booking", bookingRouter);

app.get("/", (_req, res) => {
  res.send("First request ");
});

Promise.all([
  db.query(
    `CREATE TABLE IF NOT EXISTS user_account (
      user_id SERIAL NOT NULL PRIMARY KEY,
      username varchar(45) NOT NULL,
      password varchar(450) NOT NULL,
      email varchar(45) NOT NULL UNIQUE
    );`
  ),
  // Add more table create statements if you need more tables
]).then(() => {
  Promise.all([
    db.query(
      `CREATE TABLE IF NOT EXISTS booking (
          booking_id SERIAL NOT NULL PRIMARY KEY,
          user_id INT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          venue varchar(45) NOT NULL,
          start_time TIMESTAMPTZ NOT NULL,
          end_time TIMESTAMPTZ NOT NULL,
          price DECIMAL NOT NULL,
          CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES user_account(user_id)
        );`
    ),
  ])
    .then(() => {
      console.log("database initialize");
    })
    .catch((error) => console.log(error));
  console.log("database initialize");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
