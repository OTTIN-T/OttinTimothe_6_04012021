const jwt = require('jsonwebtoken') //On importe jsonwebtoken

module.exports = (req, res, next) => { //on exporte notre middleware
     try {
          const token = req.headers.authorization.split(' ')[1] //On récupère le token dans le header authorization
          //On decode notre token en utilisant jsonwebtoken et la fonction verify
          const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') //On vérifie notre token et la clef secrète (à renforcer en prod)
          //Le token deviens un obj js utilisable 
          const userId = decodedToken.userId //On peut donc récupèrer notre userId
          if(req.body.userId && req.body.userId !== userId) { //Si user Id diffèrent
               throw 'User ID non valable !'
          } else { //Si user ID correct
               next()
          }
     } catch (error) {
          res.status(401).json({ error: error | 'Requête non authentifiée !' }) // Renvoi une erreur Unauthorized ou un message
     }
}