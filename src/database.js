import { createPool } from "mysql2";
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
    host: "junction.proxy.rlwy.net",
    user: "root",
    password: "rfIpHuDcUxWcMApaDJWBiQUcjtDgftjR",
    database: "railway",
    port: 28665,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conexão bem sucedida, ID da conexão: ' + connection.threadId);
    connection.release();
});

export default pool;
