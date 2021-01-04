const mongoose = require('mongoose') //On importe mongoose

//Necessite npm install --save mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator') //On importe notre plugin unique validator

const userSchema = mongoose.Schema({ //On utilise la méthode Schema de mongoose
     email: {type: String, required: true, unique: true}, //unique vérifie que l'email soit unique dans la bdd
     password: {type: String, required: true}
})

userSchema.plugin(uniqueValidator) // nomDuSchemaUtilisé.plugin(nomDuPluginUtilisé)
//On applique notre plugin à notre schema avant d'en faire un model

module.exports = mongoose.model('User', userSchema) //On exporte notre schéma ('nomDuSchema', leSchemaUtilisé) pour en faire un model