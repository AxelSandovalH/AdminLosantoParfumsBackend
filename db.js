const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost", 
    user: "root", 
    password: "123456",
    database: "nodeexpressdb",
    port: 3306 // Asegúrate de que MySQL esté escuchando en este puerto
});

// Ping database to check for common exception errors. 
db.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();

    return;
});

module.exports = db;
