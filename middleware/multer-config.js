//importation multer
const multer = require("multer");
//type de fichiers acceptés
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//création de l'objet de configuration de Multer
const storage = multer.diskStorage({
  //où eregistrer les images
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    //reconstruction du nom de l'image
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    const newName = name.replace("." + extension, "_");
    callback(null, newName + Date.now() + "." + extension);
  },
});

//export  Middleware
module.exports = multer({
  storage: storage,
}).single("image");
