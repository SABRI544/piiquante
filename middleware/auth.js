const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  //vérification des données
  try {
    //récupération du token bearer
    const token = req.headers.authorization.split(" ")[1];

    //décodage du token et vérification
    const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);
    const userId = decodedToken.userId;

    //id de l'utilisateur connecté avec token et bearer
    req.auth = { userId };

    //vérification que le userid est le même
    if (req.body.userId && req.body.userId !== userId) {
      throw "User Id non valable !";
      //ils ne sont pas identiques = message d'erreur
    } else {
      // si tout est OK
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête invalide !"),
    });
  }
};
