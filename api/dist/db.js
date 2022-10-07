"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = __importDefault(require("./constant"));
const Pool = require("pg").Pool;
let pool = null;
try {
    pool = new Pool(constant_1.default);
}
catch (error) {
    console.error("postgres pool create failed");
    console.error(error);
}
const api = {
    query: (query, ...parameters) => {
        let promise = new Promise(function (resolve, reject) {
            pool.query(query, ...parameters, (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        return promise;
    },
    closeAll: () => {
        pool.end();
    },
};
exports.default = api;
//# sourceMappingURL=db.js.map