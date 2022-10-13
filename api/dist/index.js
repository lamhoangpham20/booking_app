"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const user_1 = __importDefault(require("./routes/user"));
const booking_1 = __importDefault(require("./routes/booking"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 4000;
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use("/user", user_1.default);
app.use("/booking", booking_1.default);
Promise.all([
    db_1.default.query(`CREATE TABLE IF NOT EXISTS user_account (
      user_id SERIAL NOT NULL PRIMARY KEY,
      username varchar(45) NOT NULL,
      password varchar(450) NOT NULL,
      email varchar(45) NOT NULL UNIQUE
    );`),
]).then(() => {
    Promise.all([
        db_1.default.query(`CREATE TABLE IF NOT EXISTS booking (
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
        );`),
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
//# sourceMappingURL=index.js.map