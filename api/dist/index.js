"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const port = 4000;
app.get("/", (_req, res) => {
    res.send("First request ");
});
Promise.all([
    db_1.default.query(`CREATE TABLE IF NOT EXISTS account1 (
      username varchar(45) NOT NULL,
      password varchar(450) NOT NULL,
      email varchar(45) NOT NULL,
      PRIMARY KEY (username)
    )`),
]).then(() => {
    console.log("database initialize");
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
//# sourceMappingURL=index.js.map