const { Router } = require("express");
const postCarsHandler = require("../Handlers/postCarsHandler");
const getCarsHandler = require("../Handlers/getCarsHandler");
const deleteCarsHandler = require("../Handlers/deleteCarsHandler");
const getCarsByNameHandler = require("../Handlers/getCarsByNameHandler");
const getCarsByIdHandler = require("../Handlers/getCarsByIdHandler");
const getAllUsersHandler = require("../Handlers/getAllUsersHandler");
const postUserHandler = require("../Handlers/postUserHandler");
const buyCarHandler = require("../Handlers/buyCarHandler");
const passport = require("passport");
const { User } = require("../db");

const router = Router();

const checkAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(499)
    .json({ msg: "usuario no logeado, por favor log in o sign in" });
};

//ROUTES CARS
router.post("/carsPost", checkAuthenticated, postCarsHandler);
router.post("/cars", getCarsHandler);
router.post("/users", getAllUsersHandler);
router.post("/pedido/", checkAuthenticated, buyCarHandler);
router.get("/carsDelete/:id", checkAuthenticated, deleteCarsHandler);
router.get("/carsName/", getCarsByNameHandler);
router.get("/cars/:id", getCarsByIdHandler);

//ROUTES USER
// router.get("/login/succesful", (req, res) => {
//   res.json({ msg: "iniciaste sesion correctamente" });
// });
// router.get("/login/failure", (req, res) => {
//   res.json({ msg: "login fallido!" });
// });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    // if (err) return res.status(401).json(err);
    req.logIn(user, (err) => {
      if (err) return res.status(402).json(err);
      return res.json({
        msg: "logeado correctamente",
      });
    });
    
  })(req, res, next);
});

router.post("/logout", function (req, res, next) {
  req.logout();
  req.session = null;
  return res.status(205).json({msg: 'deslogeado correctamente'})
});
router.post("/signup", postUserHandler);

// router.get("/", checkAuthenticated, (req, res) => {
//   res.json({msg: 'el usuairo está logeado'})
// });

// router.post("/userStatus", (req, res) => {
//   if (req.isAuthenticated()) return res.json({ msg: "usuario logeado" });
//   else return res.json({ msg: "usuario deslogeado" });
// });

router.get("/checkUser", checkAuthenticated, (req, res) =>
  res.send("check succes")
);
//ROUTES ADMIN

module.exports = router;
