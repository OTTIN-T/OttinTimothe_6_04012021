const Sauce = require('../models/Sauce') //On importe notre models Sauce
const fs = require('fs') //On importe fs (file system) de node

//On exporte notre fonction qui gère une route et on lui donne un nom
exports.createSauce = (req, res, next) => { //middleware createSauce
     const sauceObject = JSON.parse(req.body.sauce) // On extrait l'objet json de sauce, req.body deviens sauceObject
     delete sauceObject._id //On supprime l'_id envoyé par le frontend
     const sauce = new Sauce({ //On créé une nouvelle instance de notre modele Sauce
          ...sauceObject, //L'opérateur spread "..." fait une copie de tous les éléments de req.body (sauceObject)
          //On modifie l'URL de l'image de manière dynamique 
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //Le protocol (http/https)://Le nom de l'hote du serveur/images/le nom du fichier
     });
     sauce.save() //La fonction save() enregistre notre Sauce dans la bdd
          .then(() => res.status(201).json({ message: 'Objet enregistré !' })) //On renvoie une réponse 
          .catch(error => res.status(400).json({ error })); //Erreur Bad Request
}

exports.modifySauce = (req, res, next) => {
     const sauceObject = req.file ? //Opérateur ternaire
          { // si req.file existe
               ...JSON.parse(req.body.sauce), // On extrait l'objet json de sauce, req.body deviens sauceObject
               imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //On modifie l'URL de l'image de manière dynamique 
          } : { ...req.body } //Si non on fait une copie de req.body
     //updateOne() met à jour le Sauce qui correspond à l'objet que nous passons comme premier argument
     Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //Nous utilisons le paramètre id passé dans la demande et le remplaçons par le Sauce passé comme second argument
          .then(() => res.status(200).json({ message: 'Objet modifié !' })) //Retour de notre promesse
          .catch(error => res.status(400).json({ error })); //Erreur Bad Request
}

exports.likeSauce = (req, res, next) => {
     const sauceObject = req.file ?
          {
               ...JSON.parse(req.body.sauce),
          } : { ...req.body }
     console.log("sauceObject", sauceObject)
     Sauce.updateOne({})

     /*
     Définit le statut "j'aime" pour userID fourni. 
     Si j'aime = 1,l'utilisateur aime la sauce. 
     Si j'aime = 0, l'utilisateur annule ce qu'il aime ou ce qu'il n'aime pas. 
     Si j'aime = -1, l'utilisateur n'aime pas la sauce.
     L'identifiant de l'utilisateur doit être ajouté ou supprimé du tableau approprié, en
     gardant une trace de ses préférences et en l'empêchant d'aimer ou de ne pas aimer la
     même sauce plusieurs fois.Nombre total de "j'aime" et de "je n'aime pas" à mettre à jour
     avec chaque "j'aime"
     
     sauceObject au clic de +/- { userId: '5ff461a61ff27649b89bfd3b', like: 1 }

     sauceObject complet {
     name: 'Test Name 2',
     manufacturer: 'Test Manufacturer 2',
     description: 'test',
     mainPepper: 'Test Main Pepper Ingredient2 ',
     heat: 1,
     userId: '5ff461a61ff27649b89bfd3b'
     }
     */
     // likes: { type: Number, default: 0 }, number — nombre d'utilisateurs qui aiment la sauce ;
     // dislikes: { type: Number, default: 0 }, number — nombre d'utilisateurs qui n'aiment pas la sauce
     // usersLiked: { type: Array, default: [] }, : [string] — tableau d'identifiants d'utilisateurs ayant aimé la sauce
     // usersDisliked: { type: Array, default: [] } [string] — tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce
}

exports.deleteSauce = (req, res, next) => {
     Sauce.findOne({ _id: req.params.id }) //On va chercher l'item contenant l'id
          .then(sauce => {
               const filename = sauce.imageUrl.split('/images/')[1]; //On récupère le nom du fichier à supprimer
               //la fonction unlink de fs permet de supprimer un fichier
               fs.unlink(`images/${filename}`, () => { // le dossier visé (images/)/le nom du fichier, le callback à executer
                    Sauce.deleteOne({ _id: req.params.id }) //deleteOne() supprime la Sauce qui correspond à l'objet que nous passons comme argument
                         .then(() => res.status(200).json({ message: 'Objet supprimé !' })) //Retour de notre promesse
                         .catch(error => res.status(400).json({ error })) //Erreur Bad Request
               })
          })
          .catch(error => res.status(500).json({ error: 'erreur 500 sauce' })) //Erreur Internal Server Error
}

exports.getOneSauce = (req, res, next) => {
     Sauce.findOne({ _id: req.params.id }) //findOne() trouve la Sauce unique ayant le même _id que le paramètre de la requête
          .then((sauce) => { res.status(200).json(sauce), console.log("sauce", sauce) }) //Cette Sauce est ensuite retourné dans une Promise et envoyé au front-end
          .catch((error) => { res.status(404).json({ error: error }) }) //Erreur Not found
}

exports.getAllSauce = (req, res, next) => {
     Sauce.find() //find() renvoi un tableau de toutes nos Sauces dans notre bdd
          .then((sauces) => { res.status(200).json(sauces) }) //Renvoi notre tableau (nos sauces)
          .catch((error) => { res.status(400).json({ error: error }) }) //Erreur Bad Request
}
