"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require("pg").Pool;
let pool = null;
try {
    pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "booking",
        password: "01655326497",
        port: 5432,
    });
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