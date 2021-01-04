////////////////////////////////////////////////////////////////////////////////
Brouillon 
server.js

const http = require('http')

const app = require('./app') //On importe le fichgier app.js

app.set('port', process.env.port || 3000) //On indique quel port l'app express utilise

const server = http.createServer(app) //app étant une fonction dans notre fichier app.js on peut l'appeler

server.listen(process.env.PORT || 3000) //On indique le port à écouter

////////////////////////////////////////////////////////////////////////////////
Brouillon 
app.js

//Ceci est un middleware
app.use((req, res, next) => {
     console.log('Requête reçue')
     next() //Permet de passer au middleware suivant
})

app.use((req, res, next) => {
     res.status(201) //On change le status de notre requête
     next()
})

app.use((req, res, next) => {
     res.json({message: 'Votre requête test'}) //Renvoi un objet json
     next()
})

app.use((req, res) => {
     console.log('Réponse avec succés')
})

app.post('/api/stuff', (req, res, next) => { //Traite uniquement les requêtes POST
     console.log(req.body) //body pour le corps de la requête
     res.status(201).json({ //Renvoie un objet json en cas de réussite 
          message: 'Objet créé !'
     })
})

app.use('/api/stuff', (req, res, next) => { ///api/stuff est l'url visé par l'appli = endpoint (root)
     const stuff = [ //tableau contenant 2 objets
          {
               _id: 'oeihfzeoi',
               title: 'Mon premier objet',
               description: 'Les infos de mon premier objet',
               imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
               price: 4900,
               userId: 'qsomihvqios',
          },
          {
               _id: 'oeihfzeomoihi',
               title: 'Mon deuxième objet',
               description: 'Les infos de mon deuxième objet',
               imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
               price: 2900,
               userId: 'qsomihvqios',
          },
     ];
     res.status(200).json(stuff); //Envoi en json avec code 200 pour une demande réussie
});