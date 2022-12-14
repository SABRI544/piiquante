const express = require("express");
//routeur Express
const router = express.Router();

//import du middleware password
const password = require("../middleware/password");
const controleEmail = require("../middleware/controleEmail");

const userCtrl = require("../controllers/user");

//routes

router.post("/signup", controleEmail, password, userCtrl.creerUser);
router.post("/login", userCtrl.logUser);

//exportation
module.exports = router;
