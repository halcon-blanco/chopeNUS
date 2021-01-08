const {Pool} = require('pg');
const chopenus = require('pg').Pool;

const pool = new Pool({
    "user":"postgres",
    "host": "localhost",
    "port": 5432,
    "database": "chopenus"
});

module.exports = pool;