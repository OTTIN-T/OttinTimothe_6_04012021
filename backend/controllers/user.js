const bcrypt = require('bcrypt')//On importe bcrypt
const jwt = require('jsonwebtoken') //On importe jsonwebtoken
const CryptoJS = require("crypto-js")//On importe crypto-js
const User = require('../models/User') //On importe nos models User

//On exporte notre fonction qui gère une route et on lui donne un nom
exports.signup = (req, res, next) => { //Middleware signup
     User.find()
     .then(users => {
          // console.log("users dans le find (vérifie bien du coup)", users)
          console.log("Taille du tableau users au find", users.length)
          if(users.length === 0){ // Si taille de la bdd === 0 on créé un user
               console.log("Si la taille de users = 0 on créé un new user", users)
               bcrypt.hash(req.body.password, 10) //On appel la fonction de hash de bcrypt qui va "saler" le mot de passe 10 fois
               .then(hash => {
                    const user = new User({ //On créé un nouvel utilisateur avec le model mongoose
                         email: req.body.email, //email fourni dans le corps de la requête
                         password: hash //On enregistre le hash récupéré
                    })
                    // console.log("user après hash password", user)
                    bcrypt.hash(user.email, 10)
                    .then(hash => {
                         user.update(user.email = hash)
                         // console.log("user après hash email et avant save", user)
                         user.save() //On enregistre le nouvel utilisateur dans la bdd
                         .then(user => {
                              // console.log("user save", user)
                              res.status(201).json({ message: 'Utilisateur créé !' })
                         })
                         .catch(error => res.status(401).json({ error })) //Erreur Bad Request
                    })
                    .catch(error => res.status(401).json({ error })) //Erreur Bad Request
               })
               .catch(error => res.status(500).json({ error }))
          } else if (users.length >= 1){ //Si bdd a au moins un user
               // console.log("Chaque user si la taille du tableau users est >= 1", users)
               // const userExist = [] //Initie un tableau vide
               // const userNew = []
               // console.log("userNew au debut", userNew)
               // console.log("userExist au départ", userExist)
               bcrypt.hash(req.body.password, 10) //On appel la fonction de hash de bcrypt qui va "saler" le mot de passe 10 fois
               .then(hash => {
                    // console.log("Tableau users dans le hash", users)
                    const user = new User({ //On créé un nouvel utilisateur avec le model mongoose
                         email: req.body.email, //email fourni dans le corps de la requête
                         password: hash //On enregistre le hash récupéré
                    })
                    // console.log("user après hash password", user)
                    // console.log("Tableau users apres le hash", users)
                    bcrypt.hash(user.email, 10)
                    .then(hash => {
                         // console.log("Tableau users au départ", users)
                         // console.log("user au départ", user)
                         user.update(user.email = hash)
                         // console.log("user après hash email et avant save", user)
                         // console.log("user après hash email et avant save", user)
                         // console.log("Tableau users apres le hash email et avant save", users)
                         users.forEach(userTest => { //Pour chaque user de users
                              // console.log("userTest dans la boucle", userTest)
                              // console.log("Tableau users dans la boucle", users)
                              // console.log("user dans la boucle", user)
                              // req.body.email = user.email
                              console.log("user.email dans la boucle")
                              console.log("user.email dans la boucle", user.email)
                              
                              console.log("userTest.email dans la boucle")
                              console.log("userTest.email dans la boucle", userTest.email)
                              
                              bcrypt.compare(user.email, userTest.email) //On compare les emails
                              .then(valid => {   
                                   console.log("valid apres le then !!!!!!!!!!!!!!!!!", valid)
                                   // console.log("Le userTest qui prend le compare", userTest.email)
                                   if(!valid){ //Si comparaison valid l'user existe déja
                                        // console.log("valid si compare valid", valid)
                                        // console.log("Le user qui prend le compare", userTest.email)
                                        // userExist.push(user)
                                        console.log("userTest.email Avant save")
                                        console.log("userTest.email Avant save", userTest.email)
     
                                        console.log("user Avant save")
                                        console.log("user Avant save", user.email)
     
                                        user.save() //On enregistre le nouvel utilisateur dans la bdd
                                        .then(user => {
                                             console.log("user save", user)
                                             // console.log("users save", users)
                                             // if(user){
                                             res.status(201).json({ message: 'Utilisateur créé !' })
                                             console.log("user save §§§§§§§§§§§§", user)

                                             // }
                                        })
                                        .catch(error => res.status(401).json({ error })) //Erreur Bad Request
                                   } 
                                   // console.log("Le user qui prend le compare si false", userTest.email)
                                   // userNew.push(user)
                                   res.status(401).json({ message: 'Utilisateur existant !' })

                              })
                              .catch(error => res.status(500).json({ error })) //Erreur Internal Server Error 
                         })
                    })
                    .catch(error => res.status(401).json({ error })) //Erreur Bad Request
               })
               .catch(error => res.status(500).json({ error }))   
               // else if (userExist.length === 0) {
                    // console.log("valid si compare invalid", valid)
                    // else { //Si comparaison invalid on créé un user
                    
                    // }
               // }
          }
     })
     .catch(error => req.status(500).json({ error }))
}

//On exporte notre middleware login
exports.login = (req, res, next) => { //Middleware login
     console.log("req login", req.body)
     User.find() //Sort tableau de tous les users
     .then(users => {
          console.log("Nombre de users au login", users.length)
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