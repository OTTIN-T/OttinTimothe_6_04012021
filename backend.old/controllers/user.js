const User = require('../models/User') //On importe nos models
const bcrypt = require('bcrypt') //On importe bcrypt
const jwt = require('jsonwebtoken') //On importe jsonwebtoken

// exports.signup = (req, res, next) => { //Fonction pour créer un user
//      //On hash notre mot de passe
//      bcrypt.hash(req.body.password, 10) //On appel la fonction hash de bcrypt
//           .then(hash => { //On récupère le hash du mdp
//                const user = new User({ //On créé un nouvel user
//                     email: req.body.email, //On récupère l'email du corps de la requête
//                     password: hash //On enregistre le hash comme mdp
//                })
//                user.save() //On enregistre notre user dans notre bdd avec la méthode save de notre model
//                     .then(() => res.status(201).json({ message: 'Utilisateur créé' })) //Renvoie une validation de requête Created
//                     .catch(error => res.status(400).json({ error })) //Renvoie une erreur bad request
//           })
//           .catch(error => req.status(500).json({ error })) //Renvoie une erreur serveur
// }

// exports.login = (req, res, next) => { //Fonction pour connecter un user
//      User.findOne({ email: req.body.email }) //findOne permet de trouver un utilisateur précis dans la bdd
//           .then(user => {
//                if (!user) { //Si pas d'utilisateur trouvé
//                     return res.status(401).json({ error: 'Utilisateur non trouvé !' }) //Renvoie une erreur Unauthorized
//                }
//                bcrypt.compare(req.body.password, user.password)//Bcrypt compare le mdp envoyé dans la requête avec le hash enregistré dans la bdd
//                     .then(valid => { //On reçoit un boolean
//                          if (!valid) { //Si false
//                               return res.status(401).json({ error: 'Mot de passe incorrect !' }) //Renvoie une erreur Unauthorized
//                          }
//                          res.status(200).json({ //Si true
//                               userId: user._id, //Renvoie l'id de la bdd
//                               token: jwt.sign( //On utilise la fonction sign() de jsonwebtoken
//                                    { userId: user._id }, //On récupère l'user id dans le payload
//                                    'RANDOM_TOKEN_SECRET', // A RENFORCER EN PRODUCTION
//                                    { expiresIn: '24h'} //Duré d'expiration du token
//                               ) //Renvoi un token
//                          })
//                     })
//                     .catch(error => req.status(500).json({ error })) //Renvoie une erreur serveur
//           })
//           .catch(error => req.status(500).json({ error })) //Renvoie une erreur serveur
// }

//On exporte notre fonction qui gère une route et on lui donne un nom "exports.leNomChoisi" => middleware
exports.signup = (req, res, next) => {
     //On hash le mdp (fonction async)
     bcrypt.hash(req.body.password, 10) //On appel la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de "saler" le mot de passe 10 fois
          .then(hash => {  //On récupère le hash créé par bcrypt
               const user = new User({ //On créé un nouvel utilisateur avec le model mongoose
                    email: req.body.email, //email fournie dans le corps de la requête
                    password: hash //On enregistre le hash récupéré
               })
               user.save() //On enregistre le nouvel utilisateur dans la bdd
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) //On renvoie une crétion de ressource
                    .catch(error => res.status(400).json({ error }))
          })
          .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
     User.findOne({ email: req.body.email }) //On cherche l'utilisateur unique correspondant dans la bdd
          .then(user => { //On vérifie si o nrécupère un user
               //Si non
               if (!user) {
                    return res.status(401).json({ error: 'Utilisateur non trouvé !' })
               }
               //Si oui
               //On compare le mdp entré par l'user avec le hash dans la bdd
               bcrypt.compare(req.body.password, user.password) //On utilise la fonction compare() de bcrypt
                    .then(valid => {
                         if (!valid) { //Si comparaison invalide (false)
                              return res.status(401).json({ error: 'Mot de passe incorect !' })
                         }
                         res.status(200).json({ //Si comparaison valide on renvoi un json qui contient: 
                              userId: user._id, //Le user id dans la bdd
                              token: jwt.sign( //On utilise la fonction sign de jsonwebtoken qui prend 3 arguments
                                   //Les données à encoder (le payload), 1er argument
                                   { userId: user._id }, //Le token contient l'ID de l'utilisateur en tant que payload 
                                   //La clef secret pour l'encodage, 2ème argument
                                   'RANDOM_TOKEN_SECRET', //A complexifier pour la production
                                   //L'argument de configuration, 3ème argument
                                   { expiresIn: '24h' } //On applique une expiration à notre token
                              )
                         })
                    })
                    .catch(error => req.status(500).json({ error })) //catch en cas d'erreur serveur
          })
          .catch(error => req.status(500).json({ error })) //catch en cas d'erreur server (de mongo)
}