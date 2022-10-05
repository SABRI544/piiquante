//import Mongoose
const mongoose = require("mongoose");

// schema de données sauce
const sauceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, min: 0, max: 10, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array },
  usersDisliked: { type: Array },
});
//exportation du schéma
module.exports = mongoose.model("Sauce", sauceSchema);
