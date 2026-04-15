const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '10.68.102.50',
    database: 'financeiro',
    password: '123456',
    port: 5432
})

module.exports = pool;