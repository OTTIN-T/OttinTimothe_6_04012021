const http = require('http');//On importe le package http de node
// import { createServer } from 'http';
const app = require('./app'); //On importe notre fichier app.js
// import { app } from './app';

const normalizePort = val => { //Renvoi un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port); //On indique sur quel port l'application express tourne

const errorHandler = error => { //Recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
  if (error.syscall !== 'listen') { 
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//On utilise la méthode createServer du package http
const server = http.createServer(app); //On passe notre application express à notre server

server.on('error', errorHandler); //On récupère l'erreur si il y a
server.on('listening', () => { //Consigne le port ou le canal nommé sur lequel le serveur s'exécute dans la console
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); //On écoute les requêtes envoyées sur le port
