const express = require("express");
//routeur Express
const router = express.Router();

const userCtrl = require("../controllers/user");

//routes

router.post("/signup", userCtrl.creerUser);
router.post("/login", userCtrl.logUser);

//exportation
module.exports = router;
