const express = require('express') //On importe express

//On créé notre router
const router = express.Router() //On utilise la fonction Router de express
const userCtrl = require('../controllers/user') //On importe nos controllers
const auth = require('../middleware/auth') //On importe notre middleware

//On créé nos routes POST
// router.post('/signup', auth, userCtrl.signup) //Renvoi à notre méthode controllers signup
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
// router.post('/login ', auth, userCtrl.login) //Renvoi à notre méthode controllers login


module.exports = router //On exporte notre router