"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const bookingRouter = express_1.default.Router();
bookingRouter.get("/", (_req, res) => {
    db_1.default.query("SELECT * FROM booking")
        .then((results) => {
        res.send(results.rows);
    })
        .catch(() => {
        res.sendStatus(500);
    });
});
bookingRouter.get("/email", async (req, res) => {
    let error;
    let email = req.query.email;
    let page = req.query.page;
    console.log(page);
    let userId = null;
    if (email) {
        userId = await db_1.default
            .query("SELECT * from user_account where email = $1", [email])
            .then((result) => {
            return result.rows[0].user_id;
        })
            .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    }
    else {
        error = {
            error: true,
            message: "Email is not filled",
        };
        res.send(error);
    }
    if (userId) {
        let param = [userId];
        let skip = (parseInt(page) - 1) * 10;
        let query = "SELECT * FROM booking where user_id = $1 ORDER BY start_time ASC limit 5";
        if (page) {
            query =
                "SELECT * FROM booking where user_id = $1 ORDER BY start_time ASC limit 5 OFFSET $2";
            param = [userId, skip];
        }
        db_1.default.query(query, param)
            .then((results) => {
            res.send(results.rows);
        })
            .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    }
    else {
        error = {
            error: true,
            message: "User not found",
        };
        res.send(error);
    }
});
bookingRouter.post("/", (req, res) => {
    const body = req.body;
    console.log(body);
    db_1.default.query("INSERT INTO booking (user_id, venue, start_time, end_time, price) VALUES ($1,$2,$3,$4,$5)", [body.userId, body.venue, body.startTime, body.endTime, body.price])
        .then(() => {
        res.sendStatus(201);
    })
        .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});
exports.default = bookingRouter;
//# sourceMappingURL=booking.js.map