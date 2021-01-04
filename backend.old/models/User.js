const mongoose = require('mongoose') //On importe mongoose
const uniqueValidator = require('mongoose-unique-validator') //On importe mongoose-unique-validator

//On créé notre schéma user
const userSchema = mongoose.Schema({ //On utilise la fonction Schéma de mongoose
     email: {type: String, required: true, unique: true}, //unique vérifie que l'email soit unique dans la bdd
     password: {type: String, required: true}
})

//On applique notre validator à notre schéma
userSchema.plugin(uniqueValidator) //On utilise la méthode plugin de mongoose-unique-validator (permet d'avoir des emails unique)

//On exporte notre schéma sous forme de modele
module.exports = mongoose.model('User', userSchema) //On utilise la fonction model de mongoose
