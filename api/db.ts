const Pool = require("pg").Pool;
let pool: any = null;
try {
  pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "booking",
    password: "01655326497",
    port: 5432,
  });
} catch (error) {
  console.error("postgres pool create failed");
  console.error(error);
}

const api = {
  query: (query: any, ...parameters: any[]) => {
    let promise = new Promise(function (resolve, reject) {
      pool.query(query, ...parameters, (error: any, results: unknown, fields: any) => {
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

export default api;
