const mongoose = require('mongoose') //On importe mongoose

//On utilise la fonction schema (mis à dispo par le package mongoose) pour créer un schéma
const thingSchema = mongoose.Schema({ //Objet qui va dicter les différents champs dont notre schema aura besoin 
     //title = une clef soit le nom du champ
     title: { type: String, required: true }, //On créée un objet pour configurer notre clef
     description: { type: String, required: true }, //type = le type attendu
     imageUrl: { type: String, required: true },//required est une configuration suplémentaire
     userId: { type: String, required: true },//requird = le champ est requis
     price: { type: Number, required: true }
})//Ceci est un schéma de donnée qui contient les champs souhaités pour chaque Thing

//On exporte notre module
module.exports = mongoose.model('Thing', thingSchema)//Nom du model = 1er argument, nom du schéma = 2ème arguments ('nomDuModel', nomDuSchéma)
//Ceci est un modèle Mongoose appelé "Thing" comprenant notre schéma
