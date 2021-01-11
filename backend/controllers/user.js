const bcrypt = require('bcrypt')//On importe bcrypt
const jwt = require('jsonwebtoken') //On importe jsonwebtoken
const User = require('../models/User') //On importe nos models User

//On exporte notre fonction qui gère une route et on lui donne un nom
exports.signup = (req, res, next) => { //Middleware signup
     User.find() //On récupère nos users dans la bdd
     .then(users => {
          console.log("Taille du tableau users au find", users.length)
          if (users.length === 0) { // Si pas de users dans la bdd, on créé un user
               bcrypt.hash(req.body.password, 10) //On appel la fonction de hash de bcrypt qui va "saler" le mot de passe 10 fois
               .then(hash => {
                    const user = new User({ //On créé un nouvel utilisateur avec le model mongoose
                         email: req.body.email, //email fourni dans le corps de la requête
                         password: hash //On enregistre le hash récupéré
                    })
                    bcrypt.hash(user.email, 10) //On crypte notre email
                    .then(hash => {
                         user.update(user.email = hash) //On met à jour notre user
                         user.save() //On enregistre le nouvel utilisateur dans la bdd
                         .then(user => {
                              res.status(201).json({ message: 'Utilisateur créé !' })
                         })
                         .catch(error => res.status(401).json({ error })) //Erreur Bad Request
                    })
                    .catch(error => res.status(401).json({ error })) //Erreur Bad Request
               })
               .catch(error => res.status(500).json({ error })) //Erreur server
          } else if (users.length >= 1) { //Si bdd a au moins un user
               const falseTable = [] //On initie 2 tableaux vide pour gérer les différents cas
               const trueTable = []
               users.forEach(user => { //Pour chaque user
                    bcrypt.compare(req.body.email, user.email) //On appel la fonction de compare de bcrypt
                    .then(valid => {
                         if (valid === true) { //Si comparaison valide
                              trueTable.push(valid) //On push dans notre tableau
                              res.status(401).json({ message: 'Utilisateur existant !' }) //Erreur Unauthorized
                         } else if (valid === false) { //Si comparaison invalide
                              falseTable.push(valid) //On push dans notre tableau
                              if (falseTable.length === users.length) { //Si tous nos users renvoi false, on créé un user
                                   bcrypt.hash(req.body.password, 10) //On appel la fonction de hash de bcrypt qui va "saler" le mot de passe 10 fois
                                   .then(hash => {
                                        const user = new User({ //On créé un nouvel utilisateur avec le model mongoose
                                             email: req.body.email, //email fourni dans le corps de la requête
                                             password: hash //On enregistre le hash récupéré
                                        })
                                        bcrypt.hash(user.email, 10)
                                        .then(hash => {
                                             user.update(user.email = hash)
                                             user.save() //On enregistre le nouvel utilisateur dans la bdd
                                             .then(user => {
                                                  res.status(201).json({ message: 'Utilisateur créé !' })
                                             })
                                             .catch(error => res.status(401).json({ error })) //Erreur Bad Request
                                        })
                                        .catch(error => res.status(401).json({ error })) //Erreur Bad Request
                                   })
                                   .catch(error => res.status(500).json({ error }))
                              } else if (trueTable.length === 1) { //Si un user à renvoyé true à la comparaison
                                   res.status(401).json({ message: 'Utilisateur existant !' })
                              }
                         }
                    })
                    .catch(error => res.status(500).json({ error }))
               })
          }
     })
     .catch(error => req.status(500).json({ error }))
}

//On exporte notre middleware login
exports.login = (req, res, next) => { //Middleware login
     User.find() //On récupère nos users dans la bdd
     .then(users => {
          console.log("Nombre de users au login", users.length)
          if (users.length === 0) { // Si pas de users dans la bdd, on créé un user
               return res.status(401).json({ error: 'Utilisateur non trouvé !' }) //Erreur Unauthorized
          }
          const emailInvalid = [] //On initie un tableau vide pour gérer les différents cas
          users.forEach(user => { // Pour chaque users
               bcrypt.compare(req.body.email, user.email) //On compare les emails
               .then(valid => {
                    if (!valid) { //Si comparaison invalid 
                         emailInvalid.push(user) //On push dans notre tableau
                         if (emailInvalid.length === users.length) { //Si tous les users renvoi invalid
                              return res.status(401).json({ error: 'Mot de passe incorect !' }) //Erreur Unauthorized
                         }
                         return
                    }
                    bcrypt.compare(req.body.password, user.password) //Si comparaison valid, on compare nos mdp
                    .then(valid => {
                         if (!valid) { //Si mdp invalid
                              return res.status(401).json({ error: 'Mot de passe incorect !' }) //Erreur Unauthorized
                         }
                         res.status(200).json({
                              userId: user._id, //On renvoi l'id de la bss
                              token: jwt.sign( //On renvoi un token
                                   { userId: user._id },
                                   'RANDOM_TOKEN_SECRET',
                                   { expiresIn: '24h' }
                              )
                         })
                    })
                    .catch(error => res.status(500).json({ error })) //Erreur Internal Server Error
               })
               .catch(error => res.status(500).json({ error })) //Erreur Internal Server Error
          })
     })
     .catch(error => req.status(500).json({ error })) //Erreur Internal Server Error (de mongo)
}