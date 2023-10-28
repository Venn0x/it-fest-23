const http = require('http');
const {
  getUser,
  createUser,
} = require('./controllers/userController');

const {
  getFood,
  createFood,
  getFoodPage,
  getFoodMap
} = require('./controllers/foodController');

const {
  getReviewsPage,
  getReviewsAverageScore,
  createReview
} = require('./controllers/reviewController');

const server = http.createServer((req, res) => {
  console.log(req.method, req.url)
  
  //user controller
  
  if (req.url.match(/\/api\/user\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getUser(req, res, id);
  } else if (req.url === "/api/user/create" && req.method === 'POST') {
    createUser(req, res);
  } 
  
  //food controller

  else if (req.url.match(/\/api\/food\/info\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[4];
    getFood(req, res, id);
  }

  else if (req.url.match(/\/api\/food\/index\/\w+/) && req.method === 'GET') {
    const startfrom = req.url.split('/')[4];
    getFoodPage(req, res, startfrom);
  }

  else if (req.url.match(/\/api\/food\/map\/\d+(\.\d+)\/\d+(\.\d+)/) && req.method === 'GET') {
    const x = req.url.split('/')[4];
    const y = req.url.split('/')[5];
    getFoodMap(req, res, x, y);
  }

  else if (req.url === "/api/food/create" && req.method === 'POST') {
    createFood(req, res);
  }

  //review controller

  else if (req.url.match(/\/api\/review\/index\/\w+\/\w+/) && req.method === 'GET') {
    const seller_id = req.url.split('/')[4];
    const startfrom = req.url.split('/')[5];
    getReviewsPage(req, res, seller_id, startfrom);
  }

  else if (req.url.match(/\/api\/review\/average\/\w+/) && req.method === 'GET') {
    const seller_id = req.url.split('/')[4];
    getReviewsAverageScore(req, res, seller_id);
  }

  else if (req.url === "/api/review/create" && req.method === 'POST') {
    createReview(req, res);
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Not found',
      })
    );
  }
});

const PORT = 5600;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;


/*

//

User controller:

GET /api/user/{user_id}
Retrieves information about the user

POST /api/user/create
Creates an user. Raw body: {name, email, password}

Food controller:

GET /api/food/info/{food_id}
Retrieves information about a food listing

GET /api/food/index/{start_from_index (descending)}
Retrieves a list of food offers. 

GET /api/food/map/{x}/{y}
Retrieves a list of food offers in the map range

POST /api/food/create
Creates a food offer. Raw body: {user_id, name, info, x, y, grams, price, cooking_time, alergens, portions}

Review controller:

GET /api/review/index/{seller_id}/{start_from_index}
Retrieves a list of reviews for a seller

GET /api/review/average/{seller_id}
Retrieves an object containing the average stars for reviews (max 5) and the total number of reviews for that seller

POST /api/review/create
Creates a review. Raw body: {user_id, seller_id, stars, food_id, review_text}


//

POST user/create -> upload in db //1
POST user/profile_pic -> upload in storage bucket 

GET user //retrieve user //1
 
GET food/index //1
GET food/info // 2

GET /food/map/x/y


POST food +user_id //1
POST food/info +user_id //1
POST food/pics -> storage bucket

*/