import constant from "./constant";

const Pool = require("pg").Pool;
let pool: any = null;
try {
  pool = new Pool(constant);
} catch (error) {
  console.error("postgres pool create failed");
  console.error(error);
}

const api = {
  query: (query: any, ...parameters: any[]) => {
    let promise = new Promise(function (resolve, reject) {
      pool.query(
        query,
        ...parameters,
        (error: any, results: unknown, _fields: any) => {
          if (error) {
            reject(error);
          }

          resolve(results);
        }
      );
    });

    return promise;
  },
  closeAll: () => {
    pool.end();
  },
};

export default api;
