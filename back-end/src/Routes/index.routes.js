const { Router } = require("express");
const postCars = require("../Controllers/postCars");
const getCars = require("../Controllers/getCars");

const router = Router();

//ROUTES CARS
router.post("/cars", postCars);
router.get('/cars', getCars)

//ROUTES USER

//ROUTES ADMIN

module.exports = router;
