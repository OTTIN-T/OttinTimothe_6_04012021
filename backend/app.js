const express = require('express') //On importe express
// import express from 'express'; 

const app = express() //On créé une application express

app.use((req, res, next) => {
     res.status(201)
     next()
})

app.use((req, res, next) => {
     console.log('requete recu')
     next()
})

app.use((req, res, next) => {
     res.json({ message: 'Votre requête a bien été recu'})
     next()
})

app.use((req, res, next) => {
     console.log('Réponse envoyé avec succé')
})

module.exports = app //On exporte notre app (permet d'y avoir accès depuis n'importe quel fichier de notre app)
