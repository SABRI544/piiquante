require("dotenv").config();
const express = require("express");
const app = express();

//telechargement du package CORS dans ressources express.js
const corsMiddleware = require("cors");

const bodyParser = require("body-parser");

const path = require("path");

// routes sauces et user
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

//connection à la database mongoDB
require("./models/mongo");

// middleware
// « Cross Origin Resource Sharing »
app.use(corsMiddleware());
app.use(express.json()); //pour pouvoir voir req.body grace au middleware mis a dispo par express
app.use(bodyParser.json()); //pour transformer les requetes en JSON

//Route pour les sauces et utilisateur
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

//Route pour les fichiers statiques vers le répertoire /images
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
