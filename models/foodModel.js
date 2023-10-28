const { pagesize, mapsizeX, mapsizeY } = require('../config');
const db = require('../services/db');


function findById(id) {
    return new Promise(async (resolve, reject) => {
        const rows = await db.query(
            `SELECT * FROM food WHERE id=? LIMIT 1`, [id]
        );
        const data = rows[0];
        resolve(data)
    })
}

function create(food) {
    return new Promise(async(resolve, reject) => {

        const rows = await db.query(
            "INSERT INTO food (`user_id`, `name`, `info`, `x`, `y`, `grams`, `price`, `cooking_time`, `alergens`, `portions`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [food.user_id, food.name, food.info, food.x, food.y, food.grams, food.price, food.cooking_time, food.alergens, food.portions]
        );
        
        resolve({
            insertId: rows.insertId
        })
    })
}

function findByIndex(id) {
    return new Promise(async (resolve, reject) => {
        const rows = await db.query(
            `SELECT * FROM food WHERE 1 ORDER BY id DESC LIMIT ?,?`, [id, id+pagesize]
        );
        const data = rows;
        resolve(data)
    })
}

function findByMap(x, y) {
    return new Promise(async (resolve, reject) => {
        const rows = await db.query(
            `SELECT * FROM food WHERE x > ? AND x < ? AND y > ? AND y < ?`, [x - mapsizeX, x + mapsizeX, y - mapsizeY, y + mapsizeY]
        );
        const data = rows;
        resolve(data)
    })
}

module.exports = {
    findById,
    create,
    findByIndex,
    findByMap
}