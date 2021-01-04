const express = require('express') //On importe express

const bodyParser = require('body-parser') //On importe bodyParser

const mongoose = require('mongoose') //On importe mongoose

const path = require('path') //Donne accés au chemin de notre système de fichier 

const sauceRoutes = require('./routes/stuff') //On importe nos routes

const userRoutes = require('./routes/user') //On importe nos routes pour nos user

mongoose.connect('mongodb+srv://timottinSopekocko:Sopekocko-DataBase@Cluster0.lnegb.mongodb.net/Cluster0?retryWrites=true&w=majority', //On se conencte à notre BDD
     {
          useNewUrlParser: true,
          useUnifiedTopology: true
     }
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express() //On appel notre méthode

app.use((req, res, next) => { //Nous ajoutons des headers à notre objet  response
     res.setHeader('Access-Control-Allow-Origin', '*'); //Permet d'accéder à notre API depuis n'importe quelle origine (*)
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Permet d'envoyer des requêtes avec les méthodes mentionnées
     next();
});

app.use(bodyParser.json()) //Transforme le corps de la requête en objet JS 

//middleware qui répond aux requêtes envoyé à /images
app.use('/images', express.static(path.join(__dirname, 'images'))) //On utilise la fonction static() de express, "__dirname" = le nom du dossier dans lequel on va se trouver
//Indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images

app.use('/api/sauces', sauceRoutes) //On indique le chemin de nos requêtes

app.use('/api/auth', userRoutes) //On enregistre nos routes 

module.exports = app //On exporte notre constante