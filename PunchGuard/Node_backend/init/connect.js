/*require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = connection;

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion :', err.message);
  } else {
    console.log('Connecté à MySQL !');
  }
});*/
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user:'root',
  password: 'root123',
  database: 'surveillance',
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0
});

// Test immédiat de connexion
pool.getConnection((err, connection) => {
  if (err) {
    console.error(' Erreur MySQL:', err.message);
  } else {
    console.log(' Pool MySQL prêt !');
    connection.release(); 
  }
});



module.exports = pool;