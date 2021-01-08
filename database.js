const {Pool} = require('pg');
const chopenus = require('pg').Pool;
require("dotenv").config();

const devConfig = {
   user : process.env.PG_USER,
   host: process.env.PG_HOST,
   database: process.env.PG_DATABASE,
   port:process.env.PORT,
   ssl : true
};

const proConfing = {
    connectionString: process.env.DATABASE_URL
}
const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfing : devConfig);

module.exports = pool;