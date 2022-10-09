"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const userRouter = express_1.default.Router();
userRouter.get("/", (_req, res) => {
    db_1.default.query("SELECT * FROM user_account")
        .then((results) => {
        res.send(results.rows);
    })
        .catch(() => {
        res.sendStatus(500);
    });
});
userRouter.post("/", (req, res) => {
    const body = req.body;
    console.log(body);
    db_1.default.query("INSERT INTO user_account (username, password, email) VALUES ($1,$2,$3)", [body.username, body.password, body.email])
        .then(() => {
        res.sendStatus(201);
    })
        .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map