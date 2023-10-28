const User = require('../models/userModel')

const { getPostData } = require('../utils')


// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createUser(req, res) {
    try {
        const body = await getPostData(req)
        console.log(body)
        const { name, email, password} = JSON.parse(body)
        const user = {
            name,
            email,
            password
        }

        const newUser = await User.create(user)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newUser))  

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getUser,
    createUser
}