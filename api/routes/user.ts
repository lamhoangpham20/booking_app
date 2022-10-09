import express, { Request, Response } from "express";
import db from "../db";
const userRouter = express.Router();

type User = {
  username: string;
  password: string;
  email: string;
};

userRouter.get("/", (_req: Request, res: Response) => {
  db.query("SELECT * FROM user_account")
    .then((results: any) => {
      res.send(results.rows);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

userRouter.post("/", (req: Request, res: Response) => {
  const body: User = req.body;
  console.log(body);
  db.query(
    "INSERT INTO user_account (username, password, email) VALUES ($1,$2,$3)",
    [body.username, body.password, body.email]
  )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

export default userRouter;
