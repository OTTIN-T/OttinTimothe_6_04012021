const express = require('express') //On importe express
const router = express.Router() //nous créons un routeur Express

const stuffCtrl = require('../controllers/stuff') //On importes nos controllers
const auth = require('../middleware/auth') //On importe notre middleware auth
const multer = require('../middleware/multer-config') //On importe notre middleware multer


//Traite uniquement les requêtes POST*
//On importe notre fonction avec ('URL', nomDuController.nomDeLaRoute) 
// /api/stuff est l'url complète visé par l'appli = endpoint (root)
router.post('/', auth, multer, stuffCtrl.createThing); //On raccourci le chemin de la requête à "/"
//auth permet de rajouter notre middleware avant l'execution des routes pour les protégers et de vérififier le token pour chaque routes
//multer est un autre middleware


//put pour répondre aux requête PUT (modificaton)
router.put('/:id', auth, multer, stuffCtrl.modifyThing) //Deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre (id)

//delete pour répondre aux requête DELETE 
router.delete('/:id', auth, stuffCtrl.deleteThing) //On raccourci le chemin de la requête à "/" + le params nécessaire (id dans notre cas)

//get pour répondre uniquement aux demandes GET à cet endpoint
router.get('/:id', auth, stuffCtrl.getOneThing)

router.get('/', auth, stuffCtrl.getAllThing);

module.exports = router