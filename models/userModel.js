const db = require('../services/db');
const Crypto = require('crypto')

function findById(id) {
    return new Promise(async (resolve, reject) => {
        const rows = await db.query(
            `SELECT id, email, name FROM users WHERE id=? LIMIT 1`, [id]
        );
        const data = rows[0];
        resolve(data)
    })
}

function create(user) {
    return new Promise(async(resolve, reject) => {

        const pass = Crypto.createHash('md5').update(user.password).digest("hex")

        const rows = await db.query(
            `INSERT INTO users(email, name, password) VALUES (?, ?, ?)`, [user.email, user.name, pass]
        );
        
        resolve({
            insertId: rows.insertId
        })
    })
}


module.exports = {
    findById,
    create
}