const { Router } = require("express");
const postCarsHandler = require("../Handlers/postCarsHandler");
const getCarsHandler = require("../Handlers/getCarsHandler");
const deleteCarsHandler = require("../Handlers/deleteCarsHandler");
const getCarsByNameHandler = require("../Handlers/getCarsByNameHandler");
const getCarsByIdHandler = require("../Handlers/getCarsByIdHandler");
const getAllUsersHandler = require("../Handlers/getAllUsersHandler");
const buyCarHandler = require("../Handlers/buyCarHandler");
const router = Router();
require("dotenv").config();
const {checkJwt, userVerification, checkScopes} = require('../Authentication/auth0')
const {createOrder, receiveWebhook} = require("../Mercado Pagp/controllers/SDK")


//ROUTES CARS
router.post("/carsPost", postCarsHandler);
router.post("/cars", getCarsHandler);
router.post("/users", getAllUsersHandler);
router.post("/pedido/", buyCarHandler);
router.get("/carsDelete/:id", deleteCarsHandler);
router.get("/carsName/", getCarsByNameHandler);
router.post("/carsId/", getCarsByIdHandler);
router.post("/create-order", createOrder);
router.post("/webhook", receiveWebhook);
router.get("/sucess", (req, res) => res.send("Success!"));
router.get("/pending", (req, res) => res.send("Pending..."))

//ROUTES USER

router.get("/checking1", (req, res) => {
  return res.json({
    msg: "este es un mensaje no protejido, cualquiera puede acceder",
  });
});
router.get("/protected", checkJwt, userVerification, async (req, res) => {
  return res.json({
    msg: "este mensaje esta protegido y solo autenticados pueden verlo",
  });
});
router.get("/proteced/role", checkJwt, checkScopes, (req, res) => {
  return res.json({
    msg: "this route haves authentication AND role management",
  });
});
//ROUTES ADMIN

module.exports = router;
