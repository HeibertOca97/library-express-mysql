const mysql = require('mysql');
const {connection} = require('./Connection');
const table = "tipo_libro";


const searchType = (data, callback)=>{
	const {column, value} = data;
	let sql = `SELECT * FROM ${table} WHERE ${column} LIKE ?`;	
	let query = mysql.format(sql, ["%"+value+"%"]);

	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

const typeExists = (data, callback)=>{
	const {column, value} = data;
	let sql = `SELECT * FROM ${table} WHERE ${column}=? LIMIT 1`;	
	let query = mysql.format(sql, [value]);

	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

const getAllType = (callback) => {
	let sql = `SELECT * FROM ${table} ORDER BY id DESC`;	

	connection.query(sql, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

const createType = (data, callback) => {
	const {name, description} = data;
	let sql = `INSERT INTO ${table}(nombre_tipo, descripcion) VALUES(?, ?)`;
	let query = mysql.format(sql, [name, description]); 

	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

const updateType = (data, callback) => {
	const {id, name, description} = data;
	let sql = `UPDATE ${table} SET nombre_tipo = ?, descripcion = ? WHERE id=?`;
	let query = mysql.format(sql, [name, description, id]);

	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

const deleteType = (data, callback) => {
	let sql = `DELETE FROM ${table} WHERE id=?`;
	let query = mysql.format(sql, [data.id]);

	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

module.exports = {
    getAllType,
		typeExists,
		searchType,
		createType,
		updateType,
		deleteType,
}

