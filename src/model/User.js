const mysql = require('mysql');
const {connection} = require('../utils/database');
const bcrypt = require('bcrypt');
const salt = 10;
const table = "users";

const createUser = async(data, callback) => {
	let hash = await bcrypt.hash(data.password, salt);
	let sql = `INSERT INTO ${table}(username, password) VALUES(?, ?)`;
	let query = mysql.format(sql, [data.username, hash]); 

	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

const updateUser = async (data, callback) => {
	let hash = await bcrypt.hash(data.password, salt);
	let sql = `UPDATE ${table} SET username=?, password=? WHERE id=?`;
	let query = mysql.format(sql, [data.username, hash, data.id]);
	
	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
};

const deleteUser = (data, callback) => {
	let sql = `DELETE FROM ${table} WHERE id=?`;
	let query = mysql.format(sql, [data.id]);
	
	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
};

const searchUser = (data, callback)=>{
	const {column, value} = data;
	let sql = `SELECT * FROM ${table} WHERE ${column} LIKE ?`;	
	let query = mysql.format(sql, ["%"+value+"%"]);

	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

const userExists = (data, callback)=>{
	const {column, value} = data;
	let sql = `SELECT * FROM ${table} WHERE ${column}=? LIMIT 1`;	
	let query = mysql.format(sql, [value]);

	connection.query(query, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

const getAll = (callback)=>{
	let sql = `SELECT * FROM ${table} ORDER BY id DESC`;	

	connection.query(sql, (err, result) => {
		if(err) throw err;

		callback(result);
	});
}

module.exports = {
	createUser,
	userExists, 
	updateUser,
	deleteUser,
	getAll,
	searchUser
};
