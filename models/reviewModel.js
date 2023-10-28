const { pagesizeReviews } = require('../config');
const db = require('../services/db');

function findByIndex(seller_id, id) {
    return new Promise(async (resolve, reject) => {
        const rows = await db.query(
            `SELECT * FROM reviews WHERE seller_id = ? ORDER BY id DESC LIMIT ?,?`, [seller_id, id, id+pagesizeReviews]
        );
        const data = rows;
        resolve(data)
    })
}

function getAverageScore(seller_id) {
    return new Promise(async (resolve, reject) => {
        const rows = await db.query(
            `SELECT AVG(stars), COUNT(*) FROM reviews WHERE seller_id = ?`, [seller_id]
        );
        const data = {
            average: rows[0]["AVG(stars)"] ? rows[0]["AVG(stars)"] : 0,
            count: rows[0]["COUNT(*)"]
        };
        resolve(data)
    })
}


function create(review) {
    return new Promise(async(resolve, reject) => {
        
        const user_info = await db.query(
            `SELECT name FROM users WHERE id=? LIMIT 1`, [review.user_id]
        );
        review.user_name = user_info[0].name;

        const food_info = await db.query(
            `SELECT name FROM food WHERE id=? LIMIT 1`, [review.food_id]
        );
        review.order_info = food_info[0].name;
        console.log(review)

        const rows = await db.query(
            "INSERT INTO reviews (`user_id`, `seller_id`, `stars`, `user_name`, `order_info`, `review_text`) VALUES (?, ?, ?, ?, ?, ?)", [review.user_id, review.seller_id, review.stars, review.user_name, review.order_info, review.review_text]
        );
        
        resolve({
            insertId: rows.insertId
        })
    })
}


module.exports = {

    findByIndex,
    getAverageScore,
    create

}