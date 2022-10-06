//Middleware vérification du propriétaire de la sauce

const Sauce = require("../models/saucemodel");

module.exports = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId == req.auth.userId) {
        next();
      } else {
        res.status(401).json({ message: "non autorisé" });
      }
    })
    .catch((error) => res.status(401).json({ error }));
};
