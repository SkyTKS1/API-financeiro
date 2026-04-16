const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres.nlygqrmyhugkuijlccjk',
    host: 'aws-1-us-east-2.pooler.supabase.com',
    database: 'postgres',
    password: '211502Jal@',
    port: 5432
})

module.exports = pool;