//importation de password validator
const passwordValidator = require("password-validator");

//creation du schéma
const passwordSchema = new passwordValidator();

// schéma à respecter pour le mot de passe
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(30) // Maximum length 30
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

//vérification du mot de passe

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res
      .status(400)
      .json({
        error: `Le mot de passe n'est pas assez sécurisé ${passwordSchema.validate(
          "req.body.password",
          { list: true }
        )}`,
      });
  }
};
