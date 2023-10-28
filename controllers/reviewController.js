const Review = require('../models/reviewModel')
const User = require('../models/userModel')
const Food = require('../models/foodModel')

const { getPostData } = require('../utils')


// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getReviewsPage(req, res, seller_id, startfrom) {
    try {
        const review = await Review.findByIndex(seller_id, startfrom)
        
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(review))
        
    } catch (error) {
        console.log(error)
    }
}

async function getReviewsAverageScore(req, res, seller_id) {
    try {
        const review = await Review.getAverageScore(seller_id)
        
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(review))
        
    } catch (error) {
        console.log(error)
    }
}

async function createReview(req, res) {
    try {
        const body = await getPostData(req)
        const { user_id, seller_id, stars, food_id, review_text } = JSON.parse(body)
        const review = {
            user_id, 
            seller_id, 
            stars, 
            food_id,
            review_text,
        }

        const newReview = await Review.create(review)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newReview))  

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getReviewsPage,
    getReviewsAverageScore,
    createReview
}