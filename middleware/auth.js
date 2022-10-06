const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  //vérification des données
  try {
    //récupération du token
    const token = req.headers.authorization.split(" ")[1];

    //décodage du token et vérification
    const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);
    const userId = decodedToken.userId;
    //id de l'utilisateur connecté avec token
    req.auth = { userId };

    next();
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
};
