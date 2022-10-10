import express, { Request, Response } from "express";
import db from "../db";
const bookingRouter = express.Router();

type Booking = {
  userId: number;
  venue: string;
  startTime: string;
  endTime: string;
  price: number;
};

type ErrorMessage = {
  error: boolean;
  message: string;
};

bookingRouter.get("/", (_req: Request, res: Response) => {
  db.query("SELECT * FROM booking")
    .then((results: any) => {
      res.send(results.rows);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

bookingRouter.get("/email", async (req: Request, res: Response) => {
  let error: ErrorMessage;
  let email = req.query.email;
  let page: string | any = req.query.page;
  console.log(page);
  let userId = null;
  if (email) {
    userId = await db
      .query("SELECT * from user_account where email = $1", [email])
      .then((result: any) => {
        return result.rows[0].user_id;
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    error = {
      error: true,
      message: "Email is not filled",
    };
    res.send(error);
  }
  if (userId) {
    let param = [userId];
    let skip = (parseInt(page) - 1) * 10;
    let query =
      "SELECT * FROM booking where user_id = $1 ORDER BY start_time ASC";
    if (page) {
      query =
        "SELECT * FROM booking where user_id = $1 ORDER BY start_time ASC limit 5 OFFSET $2";
      param = [userId, skip];
    }
    db.query(query, param)
      .then((results: any) => {
        res.send(results.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    error = {
      error: true,
      message: "User not found",
    };
    res.send(error);
  }
});

bookingRouter.post("/", (req: Request, res: Response) => {
  const body: Booking = req.body;
  console.log(body);
  db.query(
    "INSERT INTO booking (user_id, venue, start_time, end_time, price) VALUES ($1,$2,$3,$4,$5)",
    [body.userId, body.venue, body.startTime, body.endTime, body.price]
  )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

export default bookingRouter;
