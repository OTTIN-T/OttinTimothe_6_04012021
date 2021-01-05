const bcrypt = require('bcrypt')//On importe bcrypt
const jwt = require('jsonwebtoken') //On importe jsonwebtoken
const User = require('../models/User') //On importe nos models User

//On exporte notre fonction qui gère une route et on lui donne un nom
exports.signup = (req, res, next) => { //Middleware signup
     //On hash le mdp
     bcrypt.hash(req.body.password, 10) //On appel la fonction de hash de bcrypt qui va "saler" le mot de passe 10 fois
          .then(hash => {  //On récupère le hash créé par bcrypt
               const user = new User({ //On créé un nouvel utilisateur avec le model mongoose
                    email: req.body.email, //email fournie dans le corps de la requête
                    password: hash //On enregistre le hash récupéré
               })
               user.save() //On enregistre le nouvel utilisateur dans la bdd
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) //On renvoie une création de ressource
                    .catch(error => res.status(400).json({ error })) //Erreur Bad Request
          })
          .catch(error => res.status(500).json({ error }))
}

//On exporte notre middleware login
exports.login = (req, res, next) => { //Middleware login
     User.findOne({ email: req.body.email }) //On cherche l'utilisateur unique correspondant dans la bdd
          .then(user => { //On vérifie si on récupère un user
               if (!user) { //Si non
                    return res.status(401).json({ error: 'Utilisateur non trouvé !' }) //Erreur Unauthorized
               }
               //Si oui
               //On compare le mdp entré par l'user avec le hash dans la bdd
               bcrypt.compare(req.body.password, user.password) //On utilise la fonction compare() de bcrypt
                    .then(valid => {
                         if (!valid) { //Si comparaison invalide (false)
                              return res.status(401).json({ error: 'Mot de passe incorect !' }) //Erreur Unauthorized
                         }
                         res.status(200).json({ //Si comparaison valide on renvoi un json:
                              userId: user._id, //Le user id dans la bdd
                              token: jwt.sign( //On utilise la fonction sign de jsonwebtoken qui prend 3 arguments
                                   //Les données à encoder (le payload)
                                   { userId: user._id }, //Le token contient l'ID dans le payload du token 
                                   //La clef secret pour l'encodage
                                   'RANDOM_TOKEN_SECRET', //A complexifier pour la production
                                   //L'argument de configuration
                                   { expiresIn: '24h' } //On applique une expiration à notre token
                              )
                         })
                    })
                    .catch(error => req.status(500).json({ error })) //Erreur Internal Server Error
          })
          .catch(error => req.status(500).json({ error })) //Erreur Internal Server Error (de mongo)
}