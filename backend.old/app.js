const express = require('express') //On importe express
// import express from 'express'; 
const bodyParser = require('body-parser') //On importe body parser 
const mongoose = require('mongoose') //On importe mongoose

const app = express() //On créé une application express
const userRoutes = require('./routes/user') //On importe notre router

//On se connecte à notre BDD
mongoose.connect('mongodb+srv://timottinSopekocko:Sopekocko-DataBase@Cluster0.lnegb.mongodb.net/Cluster0?retryWrites=true&w=majority', 
     {
          useNewUrlParser: true,
          useUnifiedTopology: true
     }
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => { //Permet de connecter le front et le backend
     //On utilise la méthode setHeader pour ajouter des header à notrte réponse
     res.setHeader('Access-Control-Allow-Origin', '*') //Autorise toutes les origines à accéder à notre API
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization') //On autorise l'utilisation de certains headers
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //On autorise l'utilisation de certains verb de requête
     next() //Passe au middleware suivant
});

//On utilise la méthode json() de body parser
app.use(bodyParser.json()) //Permet de rendre utilisable notre body en json

//On traite les requêtes POST
// app.post('/api/struff', (req, res, next) => { //Notre route pour publier

// })

// app.use('/api/stuff', (req, res, next) => { //Notre URI (endpoint)
//      const stuff = [
//           {
//                _id: 'oeihfzeoi',
//                title: 'Mon premier objet',
//                description: 'Les infos de mon premier objet',
//                imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//                price: 4900,
//                userId: 'qsomihvqios',
//           },
//           {
//                _id: 'oeihfzeomoihi',
//                title: 'Mon deuxième objet',
//                description: 'Les infos de mon deuxième objet',
//                imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//                price: 2900,
//                userId: 'qsomihvqios',
//           },
//      ];
//      res.status(200).json(stuff);
// });

app.use('/api/auth', userRoutes) //On enregistre notre route user

module.exports = app //On exporte notre app (permet d'y avoir accès depuis n'importe quel fichier de notre app)
