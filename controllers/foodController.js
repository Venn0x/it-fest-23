const Food = require('../models/foodModel')

const { getPostData } = require('../utils')


// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getFood(req, res, id) {
    try {
        const food = await Food.findById(id)

        if(!food) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Food Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(food))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createFood(req, res) {
    try {
        const body = await getPostData(req)
        
        const { user_id, name, info, x, y, grams, price, cooking_time, alergens, portions } = JSON.parse(body)
        const food = {
            user_id, name, info, x, y, grams, price, cooking_time, alergens, portions
        }

        const newFood = await Food.create(food)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newFood))  

    } catch (error) {
        console.log(error)
    }
}
async function getFoodPage(req, res, startfrom) {
    try {
        const food = await Food.findByIndex(startfrom)

        if(!food) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Index Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(food))
        }
    } catch (error) {
        console.log(error)
    }
}

async function getFoodMap(req, res, x, y) {
    try {
        x = parseFloat(x);
        y = parseFloat(y);

        const food = await Food.findByMap(x, y)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(food))
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getFood,
    createFood,
    getFoodPage,
    getFoodMap
}