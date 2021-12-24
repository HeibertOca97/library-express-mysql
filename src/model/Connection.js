const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 3306,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const query = async (strSql, values = []) => {
    let sql;
    sql = strSql;
    if (values.length > 0) {
        sql = mysql.format(sql, values)
    }
    let promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject("Error en la consulta");
            //console.log(result)
            resolve(result);
        });
    })
    try {
        let result = await promise;
        if (result) return result;

        return null;
    } catch (err) {
        console.log(err);
    }

}

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
});

module.exports = { connection, query };
