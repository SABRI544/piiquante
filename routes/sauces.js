//import express
const express = require("express");
// routeur Express
const router = express.Router();
//import middleware authentification
const authUser = require("../middleware/auth");
//middleware multer
const multer = require("../middleware/multer-config");
//controllers
const saucesCtrl = require("../controllers/sauces");

//routes

router.get("/", authUser, saucesCtrl.getSauces);
router.post("/", authUser, multer, saucesCtrl.createSauce);
router.get("/:id", authUser, saucesCtrl.getOneSauce);
router.delete("/:id", authUser, multer, saucesCtrl.deleteSauce);
router.put("/:id", authUser, multer, saucesCtrl.modifySauce);
router.post("/:id/like", authUser, saucesCtrl.addVote);
//export router
module.exports = router;
