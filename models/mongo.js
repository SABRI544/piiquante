//mongoose
const mongoose = require("mongoose");
// s'assurer que 2 utilisateurs ne puissent partager la même adresse e-mail.
const uniqueValidator = require("mongoose-unique-validator");

const url = `mongodb+srv://${process.env.DB_URI}/?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Connexion à MongoDB échouée !", err));
//schema de données user
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

module.exports = { mongoose, User };
