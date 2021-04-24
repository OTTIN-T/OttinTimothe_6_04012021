# OttinTimothe_6_04012021
# Contexte

Projet réalisé par OTTIN Timothé. 

Ceci est le projet numéro 6 de la formation développeur web d'OpenClassrooms.
Le projet consistait à la réalisation d'une API pour le backend d'un site. Le frontend du site était fourni par OpenClassrooms. 

Le site se devait d'utiliser un serveur Node.js avec Express et avoir une base de données MongoDB.


L'API Rest (CRUD) gère:
- L'inscription d'un utilisateur sur le site,
- Les différents comportements d'un utilisateur,
- L'ajout/modification/suppression d'une ressource,
- Like/dislike d'une ressource.
- Le site respecte les bonnes pratiques de sécurité d'une application web et de l'OWASP, ainsi que les règles RGPD.

Ceci est mon premier projet avec Node.JS et je n'avais jamais manipulé de base de données. 

Ce projet fut réalisé en quasi-totale autonomie. J'avais l'aide d'un mentor OpenClassrooms une fois par semaine. 

Ce projet fut évalué par un mentor évaluateur OpenClassrooms. Il validait si le projet était conforme aux attentes lors d'une soutenance.

## Installation

- Rendez-vous sur [SoPeckoco](https://ottin-t.github.io/OttinTimothe_6_04012021/)
- Naviguez !


### Ou localement

- Cloner ce [repo](https://github.com/OTTIN-T/OttinTimothe_6_04012021) dans un dossier
- Créez un dossier images dans le dossier backend
- Dans le dossier backend lisez et suivez le .env.example,
- Ouvrez dans votre IDE le dossier contenant les dossier frontend et backend,
- Dans un terminal: cd frontend, npm i, npm start
- Dans un second terminal: cd backend, npm i, npm start

- Rendez-vous sur http://localhost:4200/
- Naviguez !

###### Disclaimer:
###### - La version en ligne comporte des bugs de redirection, dû à une méconnaissance de ma part d'Angular. -
###### - Le site requiert un mot de passe fort, une maj, une min et un chiffre


## Scénario

Vous êtes développeur backend freelance et vous travaillez depuis quelques années sur des projets web pour des startups ou des grandes entreprises.

La semaine dernière, vous avez reçu un mail vous proposant un nouveau projet.

La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”.

L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”.

Même si l’application deviendra peut-être un magasin en ligne dans un futur proche, Sophie, la product owner de So Pekocko, a décidé que le MVP du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.

Lors de votre premier jour, vous discutez avec elle sur la messagerie instantanée interne de l’entreprise.

```bash
>Sophie : Bonjour et bienvenue parmi nous !
> Vous : Merci :)
> Sophie : Voici quelques informations dont tu vas avoir besoin pour développer notre application. Le côté frontend de l’application a déjà été développé. Nous avons besoin de toi pour le backend et la création de l’API.
> Vous : Ah super ! J’ai hâte de démarrer. Est-ce qu’il y a d’autres choses que je dois savoir ?
> Sophie : Oui, nous avons récemment eu quelques attaques sur notre site web. Je suis assez inquiète. Il faudra donc être vigilant lorsque tu créeras ton API. Veille bien à ce qu’elle utilise des pratiques de code sécurisées.
> Sophie : Ah oui aussi, les données personnelles de nos utilisateurs doivent impérativement être protégées, que ce soit côté API ou côté base de données grâce à des méthodes de masquage. 
> Vous : OK ! Quelles technos souhaites-tu que j’utilise ?
> Sophie : L’API devra respecter les standards OWASP. Le projet devra être hébergé par un serveur Node.js. La base de données utilisée devra être MongoDB. Tu devras également utiliser le framework Express. Pour finir, tu devras utiliser un plug-in Mongoose pour garantir que toutes les erreurs de la base de données soient signalées.
> Vous : Merci, c’est très clair.
> Sophie : Une dernière chose : ton API devra fonctionner parfaitement avec notre frontend. Cela implique qu’il ne devra pas y avoir de régressions côté front. J’espère que tout est clair, n’hésite pas si tu as des questions ! Bon courage ! :)
```


La deadline fixée pour la réalisation du projet étant raisonnable, vous décidez d’accepter la mission, sachant que vos connaissances de la stack Node.js, Express et Mongo, et d’OWASP, sont parfaitement adaptées.

Quelques heures plus tard, vous trouvez un post-it de Marc, le développeur frontend, sur votre bureau. 

Vous trouvez effectivement la [documentation](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Guidelines+API.pdf) dans votre boîte mail ainsi que la [note de cadrage](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/P6_Note%20de%20cadrage%20So%20Pekocko_V3.pdf) et un lien vers le [repo GitHub](https://github.com/OpenClassrooms-Student-Center/dwj-projet6). Vous vous lancez immédiatement !

## Soutenance

L’évaluateur jouera le rôle de Sophie, la product owner de So Pekocko (il pourra vous interrompre pour vous poser des questions).

La soutenance, d’une durée maximum de 30 minutes, se déroulera en deux parties :

Partie 1 – 20 minutes : Simulation d'une réunion professionnelle.

- Partie 1 – 20 minutes : Vous réaliserez une présentation de votre application et expliquerez le fonctionnement de votre code, la structure de votre code et les raisons pour lesquelles vous avez choisi cette structure. Vous devrez également expliquer la méthode utilisée pour sécuriser votre base de données et préciser en quoi elle respecte le RGPD et les standards OWASP. 

- Partie 2 – 10 minutes : Échange de questions/réponses : l’évaluateur pourra revenir sur certains points pour vous questionner sur vos choix.

L’évaluateur vous fera un retour sur votre prestation en soutenance.


### Compétences évaluées
- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée

## License
[MIT](https://choosealicense.com/licenses/mit/)




