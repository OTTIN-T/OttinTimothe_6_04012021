const Thing = require('../models/Thing') //On importe nos models de thing
const fs = require('fs') //On importe fs (file system) de node

//On exporte notre fonction qui gère une route et on lui donne un nom
exports.createThing = (req, res, next) => {
     const thingObject = JSON.parse(req.body.thing); // On extrait l'objet json de thing, req.body deviens thingObject
     delete thingObject._id; //On supprime l'_id envoyé par le frontend
     const thing = new Thing({ //On créé une nouvelle instance de notre modele Thing
          ...thingObject, //L'opérateur spread "..." est utilisé pour faire une copie de tous les éléments de req.body (thingObject)
          //On modifie l'URL de l'image de manière dynamique 
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //Le protocol (http/https)://Le nom de l'hote du serveur/images/le nom du fichier
     });
     thing.save() //La méthode save() enregistre notre Thing dans la base de données, renvoie une Promise
          .then(() => res.status(201).json({ message: 'Objet enregistré !' })) //On renvoie une réponse 
          .catch(error => res.status(400).json({ error })); //On renvoie une erreur 
}

exports.modifyThing = (req, res, next) => {
     const thingObject = req.file ? //Opérateur ternaire
          { // si req.file existe
               ...JSON.parse(req.body.thing), // On extrait l'objet json de thing, req.body deviens thingObject
               imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //On modifie l'URL de l'image de manière dynamique 
          } : { ...req.body } //Si non on fait une copie de req.body
     //updateOne() permet de mettre à jour le Thing qui correspond à l'objet que nous passons comme premier argument
     Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id }) //Nous utilisons le paramètre id passé dans la demande et le remplaçons par le Thing passé comme second argument
          .then(() => res.status(200).json({ message: 'Objet modifié !' })) //Retour de notre promesse
          .catch(error => res.status(400).json({ error }))
}

exports.deleteThing = (req, res, next) => {
     Thing.findOne({ _id: req.params.id }) //On va chercher l'item contenant l'id
          .then(thing => {
               const filename = thing.imageUrl.split('/images/')[1] //On récupère le nom du fichier à supprimer
               //On utilise la fonction unlink de fs qui permet de supprimer un fichier
               fs.unlink(`images/${filename}`, () => { // le dossier visé (images/)/le nom du fichier, le callback à executer
                    Thing.deleteOne({ _id: req.params.id }) //deleteOne() permet de supprimer le Thing qui correspond à l'objet que nous passons comme argument
                         .then(() => res.status(200).json({ message: 'Objet supprimé !' })) //Retour de notre promesse
                         .catch(error => res.status(400).json({ error }))
               })
          })
          .catch(error => res.status(500).json({ error })) //500 = error serveur
}

exports.getOneThing = (req, res, next) => {
     Thing.findOne({ _id: req.params.id }) //findOne() pour trouver le Thing unique ayant le même _id que le paramètre de la requête
          .then(thing => res.status(200).json(thing)) //Ce Thing est ensuite retourné dans une Promise et envoyé au front-end
          .catch(error => res.status(404).json({ error }))
}

exports.getAllThing = (req, res, next) => {
     Thing.find() //find() renvoi un tableau de toutes nos Things dans notre bdd
          .then(things => res.status(200).json(things)) //Renvoi notre tableau (nos things)
          .catch(error => res.status(400).json({ error }))
}