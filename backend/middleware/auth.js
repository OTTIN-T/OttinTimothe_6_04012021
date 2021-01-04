const jwt = require('jsonwebtoken') //On importe jsonwebtoken
//import jwt from 'jsonwebtoken'; s'écrit également comme ça

//On créé notre middleware à exporter
module.exports = (req, res, next) => {
     try {
          //On récupère le token
          const token = req.headers.authorization.split(' ')[1] //On utilise le header de la requête qu'on split pour récupèrer le 2ème élément du tableau 
          //On décode le token
          const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') //On utilise la fonction verify de jsonwebtoken (ceQueJeVeuxVérifier, 'laClefSecrète')
          //On extrait ce qu'on a decoder
          const userId = decodedToken.userId //Est un objet js classique 

          if(req.body.userId && req.body.userId !== userId){ //On vérifie si un user Id  contient bien l'user id du token 
               throw 'User ID non valable !' //Si non
          } else{ //Si oui
               next() 
          }
     } catch (error) { //Renvoie une erreur si problème d'authentification
          res.status(401).json({ error: error | 'Requête non authentifiée !' }) //A la moindre erreur dans le try ce sera la catch qui sera exécuté
     }
}