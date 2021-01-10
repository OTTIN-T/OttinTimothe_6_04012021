const bcrypt = require('bcrypt')//On importe bcrypt
const jwt = require('jsonwebtoken') //On importe jsonwebtoken
const CryptoJS = require("crypto-js")//On importe crypto-js
const User = require('../models/User') //On importe nos models User

//On exporte notre fonction qui gère une route et on lui donne un nom
exports.signup = (req, res, next) => { //Middleware signup

          User.find()
          .then(users => {
               users.forEach(user => {
                    bcrypt.compare(req.body.email, user.email)
                    .then(valid => {
                         if(!valid){
                              bcrypt.hash(req.body.password, 10) //On appel la fonction de hash de bcrypt qui va "saler" le mot de passe 10 fois
                              .then(hash => {
                                   const user = new User({ //On créé un nouvel utilisateur avec le model mongoose
                                        email: req.body.email, //email fourni dans le corps de la requête
                                        password: hash //On enregistre le hash récupéré
                                   })
                                   console.log("user après hash password", user)
                                   bcrypt.hash(user.email, 10)
                                   .then(hash => {
                                        user.update(user.email = hash)
                                        console.log("user après hash email et avant save", user)
                                        user.save() //On enregistre le nouvel utilisateur dans la bdd
                                        .then(user => {
                                             console.log("user save", user)
                                             res.status(201).json({ message: 'Utilisateur créé !' })
                                        })
                                        .catch(error => res.status(401).json({ error })) //Erreur Bad Request
                                   })
                                   .catch(error => res.status(401).json({ error })) //Erreur Bad Request
                              })
                              .catch(error => res.status(500).json({ error }))
                         } else if (valid){
                              return res.status(401).json({ error: 'Utilisateur existant !' }) //Erreur Unauthorized
                         }
                    })
                    .catch(error => res.status(500).json({ error })) //Erreur Internal Server Error 
               })
          })
          .catch(error => req.status(500).json({ error }))



          // // On hash le mdp
          // bcrypt.hash(req.body.password, 10) //On appel la fonction de hash de bcrypt qui va "saler" le mot de passe 10 fois
          // .then(hash => {  //On récupère le hash créé par bcrypt
          //      const user = new User({ //On créé un nouvel utilisateur avec le model mongoose
          //           email: req.body.email, //email fourni dans le corps de la requête
          //           password: hash //On enregistre le hash récupéré
          //      })
          //      console.log("user après hash password", user)
          //      bcrypt.hash(user.email, 10)
          //      .then(hash => {
          //           user.update(user.email = hash)
          //           console.log("user après hash email ", user)
          //           console.log("user avant save", user)
          //           user.save() //On enregistre le nouvel utilisateur dans la bdd
          //           .then(user => {
          //                console.log("user save", user)
          //                res.status(201).json({ message: 'Utilisateur créé !' }) //On renvoie une création de ressource
          //           }) //On renvoie une création de ressource
          //           .catch(error => res.status(401).json({ error })) //Erreur Bad Request
          //      })
          //      .catch(error => res.status(401).json({ error })) //Erreur Bad Request
          // })
          // .catch(error => res.status(500).json({ error }))


          // User.find()
          //                .then(users => {
          //                     console.log("users tableau", users)
          //                     bcrypt.compare(req.body.email, user.email)  
          //                     .then(valid => {
          //                          if(valid){
          //                               return res.status(401).json({ error: 'Utilisateur existant !' }) //Erreur Unauthorized 
          //                          }
          //                     })
          //                     .catch(error => res.status(500).json({ error })) //Erreur Internal Server Error
          //                     res.status(201).json({ message: 'Utilisateur créé !' })  
          //                })
          //                .catch(error => req.status(500).json({ error })) //Erreur Internal Server Error (de mongo)
     // User.find()
     // .then(users => {
     //      const userExist = []
     //      users.forEach(user => {
     //           console.log("Si user existe au signup", user)
     //           bcrypt.compare(req.body.email, user.email)  
     //           .then(valid => {
     //                if(valid){
     //                     userExist.push(user)
     //                     console.log("Tableau userExist avec l'user valid", userExist)
     //                     console.log("Tableau userExist avec l'user valid", userExist.length)
     //                     if(userExist.length >= 1){
     //                          return res.status(401).json({ error: 'Utilisateur existant !' }) //Erreur Unauthorized
     //                     }
     //                     return
     //                }
     //           })
     //           .catch(error => res.status(500).json({ error })) //Erreur Internal Server Error
     //      })
     // })
     // .catch(error => req.status(500).json({ error })) //Erreur Internal Server Error (de mongo)
     
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
          const emailInvalid = []
          // console.log("emailInvalid 111", emailInvalid)
          users.forEach(user => {
               // console.log("user dans forEach", user)
               bcrypt.compare(req.body.email, user.email)
               .then(valid => {
                    if(!valid){
                         // console.log("valid", valid)
                         // console.log("emailInvalid", emailInvalid)
                         // console.log("users.length", users)
                         emailInvalid.push(user)
                         if(emailInvalid.length === users.length){
                              return res.status(401).json({ error: 'Mot de passe incorect !' }) //Erreur Unauthorized
                         }
                         // console.log("user si email valid", users.length)
                         // console.log("emailInvalid 3333", emailInvalid.length)
                         return 
                    }
                    // console.log("emailInvalid 222", emailInvalid.length)
                    // console.log("user si email valid", user)
                    bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                         if(!valid){
                              // console.log("user si mdp invalid", user)
                              return res.status(401).json({ error: 'Mot de passe incorect !' }) //Erreur Unauthorized
                         }
                         // console.log("user si mdp valid", user)
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