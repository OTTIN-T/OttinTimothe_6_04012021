const bcrypt = require('bcrypt')//On importe bcrypt
const jwt = require('jsonwebtoken') //On importe jsonwebtoken
const CryptoJS = require("crypto-js")//On importe crypto-js
const User = require('../models/User') //On importe nos models User

//On exporte notre fonction qui gère une route et on lui donne un nom
exports.signup = (req, res, next) => { //Middleware signup
     // On hash le mdp
     bcrypt.hash(req.body.password, 10) //On appel la fonction de hash de bcrypt qui va "saler" le mot de passe 10 fois
     .then(hash => {  //On récupère le hash créé par bcrypt
          const user = new User({ //On créé un nouvel utilisateur avec le model mongoose
               email: req.body.email, //email fourni dans le corps de la requête
               password: hash //On enregistre le hash récupéré
          })
          console.log("user après hash password", user)
          bcrypt.hash(user.email, 10)
          .then(hash => {
               user.update(user.email = hash)
               console.log("user après hash email ", user)
               console.log("user avant save", user)
               user.save() //On enregistre le nouvel utilisateur dans la bdd
               .then(user => {
                    console.log("user save", user)
                    res.status(201).json({ message: 'Utilisateur créé !' })
               }) //On renvoie une création de ressource
               .catch(error => res.status(401).json({ error })) //Erreur Bad Request
          })
          .catch(error => res.status(401).json({ error })) //Erreur Bad Request
     })
     .catch(error => res.status(500).json({ error }))
}

//On exporte notre middleware login
exports.login = (req, res, next) => { //Middleware login
     console.log("req login", req.body)
     User.find() //Sort tableau de tous les users
     .then(users => {
          console.log("Nombre de users", users.length)
          if (users.length === 0) { //Si non
               return res.status(401).json({ error: 'Utilisateur non trouvé !' }) //Erreur Unauthorized
          }
          console.log("Tableau des users", users)
          users.forEach(user => {
               console.log("user dans forEach", user)
               // console.log("L'user.email de chaque users", user.email)
               // console.log("req.body.email", req.body.email)
               bcrypt.compare(req.body.email, user.email)
               .then(valid => {
                    const emailInvalid = []
                    if(!valid){
                         console.log("valid", valid)
                         console.log("user si email invalid", user)
                         // emailInvalid.push(user)
                         console.log("emailInvalid", emailInvalid)
                         console.log("users.length", users)
                         // if(){
                         console.log("emailInvalid", emailInvalid.length)
                         //      return res.status(401).json({ error: 'Mot de passe incorect !' }) //Erreur Unauthorized
                         // }
                         return emailInvalid.push(user)
                    }
                    console.log("emailInvalid 222", emailInvalid.length)
                    console.log("user si email valid", user)
                    bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                         if(!valid){
                              console.log("user si mdp invalid", user)
                              return res.status(401).json({ error: 'Mot de passe incorect !' }) //Erreur Unauthorized
                         }
                         console.log("user si mdp valid", user)
                         res.status(200).json({
                              userId: user._id,
                              token: jwt.sign(
                                   { userId: user._id },
                                   'RANDOM_TOKEN_SECRET',
                                   { expiresIn: '24h' }
                              )
                         })
                    })
                    .catch(error => res.status(500).json({ error })) //Erreur Internal Server Error
               })
               .catch(error => res.status(500).json({ error })) //Erreur Internal Server Error
          });
     })
     .catch(error => req.status(500).json({ error })) //Erreur Internal Server Error (de mongo)
}