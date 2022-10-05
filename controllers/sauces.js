const Sauce = require("../models/saucemodel");
// package "fs"
const fs = require("fs");

exports.getSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) => {
  //modification du format de la requête pour la transformer en objet
  const sauceObject = JSON.parse(req.body.sauce);
  //Suppression de l'id renvoyé par le front-end
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
    ...sauceObject,
    userId: req.auth.userId,

    //récupération de l'url dynamique 'image' généré par Multer
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  //Enregistrement de la sauce dans la base de données
  sauce
    .save()

    .then(() =>
      res.status(201).json({
        message: "Sauce enregistrée !",
        //réponse de réussite code 201
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
        //réponse d'erreur code 400
      })
    );
};

//Récupérer une seule sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //pour vérifier que l'utilisateur qui souhaite  supprimer une sauce est bien l'auteur
      if (sauce.userId == req.auth.userId) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        res.status(403).json({ message: "non autorisé" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//modifier la sauce

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete sauceObject._userId;

  if (sauceObject !== null) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Objet modifié!" }))
            .catch((error) => res.status(401).json({ error }));
        });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body })
      .then(() => res.status(200).json({ message: "Sauce modifiée" }))
      .then((error) => res.status(401).json({ error }));
  }
};

//vote like/dislike

exports.addVote = (req, res) =>
  //recup sauce
  {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (req.body.like == 1 && !sauce.usersLiked.includes(req.body.userId)) {
          sauce.likes++;
          sauce.usersLiked.push(req.body.userId);
          sauce.save();
        }

        if (
          req.body.like == -1 &&
          !sauce.usersLiked.includes(req.body.userId)
        ) {
          sauce.dislikes++;
          sauce.usersDisliked.push(req.body.userId);
          sauce.save();
        }

        if (req.body.like == 0) {
          if (sauce.usersLiked.indexOf(req.body.userId) != -1) {
            //annule le like
            sauce.likes--;
            sauce.usersLiked.splice(
              sauce.usersLiked.indexOf(req.body.userId),
              1
            );
          } else {
            //annule le dislike
            sauce.dislikes--;
            sauce.usersDisliked.splice(
              sauce.usersDisliked.indexOf(req.body.userId),
              1
            );
          }
          sauce.save();
        }
        res.status(200).json({ message: "like enregistré" });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };
