---
author: Cláudio Sousa
date: Décembre 2018
documentclass: article
fontsize: 11pt
papersize: a4paper
geometry: margin=1in
lang: fr
header-includes: |
    \usepackage{fancyhdr}
    \usepackage{lastpage}
    \usepackage{dirtree}
    \usepackage{graphicx}
    \usepackage{float}

    \graphicspath{{./img/}}

    \pagestyle{fancy}

    \setlength{\headheight}{14pt}
    \renewcommand{\headrulewidth}{0.5pt}
    \renewcommand{\footrulewidth}{0.5pt}

    \fancyhead[LO,LE]{Technologies Web avancées}
    \fancyhead[CO,CE]{TETONOR}
    \fancyhead[RO,RE]{Claudio Sousa}
    \fancyfoot[LO,LE]{Décembre 2018}
    \fancyfoot[CO,CE]{}
    \fancyfoot[RE,RO]{\thepage /\pageref{LastPage}}

    \setcounter{tocdepth}{3}
numbersections: True
output:
    pdf_document:
        md_extensions: ’+inline\_notes’
title: |
    | TETONOR
    | Un jeu web interactif multijoueur
---

\thispagestyle{empty} \newpage

\tableofcontents
\newpage

# Introduction

Ce projet consiste à développer un jeu multijoueur basé sur des technologies web mettant
en pratique la théorie du cours de Technologies Web avancées suivit à l’HEPIA[^hepia] pendant
le semestre d’automne 2018 avec le professeur Stéphane Malandain.

[^hepia]: Haute école du paysage, d’ingénierie et d’architecture de Genève (_https://www.hesge.ch/hepia/_)

Ce jeu permet à plusieurs joueurs de jouer une même partie de Tetonor de manière simultanée et concurrente.
Chaque joueur joue sur son navigateur web, avec l’objectif d’être le premier à terminer le jeu.

Dès qu’un joueur termine le jeu, le jeu est fini et le joueur est déclaré vainqueur.

# Code source

Le projet est disponible en open-source sur Github à l’url `https://github.com/claudiosousa/tetonor`.

## Installation

L’application utilise Node.js[^nodejs] et il doit être installé sur le système pour pouvoir tourner l’application.

[^nodejs]: _https://nodejs.org/_

Pour installer l’application, la première étape est de cloner le dépôt Git :

```{.bash}
git clone git@github.com:claudiosousa/tetonor.git
```

Ensuite, il est nécessaire d’installer localement les dépendances du projet :

```{.bash}
npm install
```

Il ne reste alors qu’à démarrer l’application :

```{.bash}
npm start
```

L’instruction ci-dessus va également ouvrir une page de votre navigateur
sur l’url de l’application `http://localhost:7654/`.

Pour plus d’informations, lire le _readme_ du projet sur Github.

\newpage

## Structure du code source

Voici les fichiers et dossiers les plus importants sur Github :

\dirtree{%
.1 report \dotfill dossier content ce rapport.
.1 package.json \dotfill instructions pour les packages npm.
.1 src \dotfill racine du code source.
.2 server \dotfill le serveur web.
.3 CommunicationManager.js \dotfill service gérant les communications.
.3 Game.js \dotfill l’état d’un jeu en cours.
.3 GameBoard.js \dotfill la logique du jeu.
.3 index.js \dotfill point d’entrée avec initialisation web et websocket.
.2 webapp \dotfill l’application web.
.3 components \dotfill composants UI.
.4 choose-game.js \dotfill composant UI de choix de partie.
.4 join-game.js \dotfill composant UI permettant de joindre une partie.
.4 waiting-players.js \dotfill composant UI d’attente des autres joueurs.
.4 tetonor.js\dotfill composant UI pour joueur le jeu Tetonor
.4 problem.js \dotfill composant UI pour une case du jeu.
.4 tetonor-input.js \dotfill un input pour une case.
.4 player-score.js \dotfill composant UI affichent le score des joueurs.
.4 game-over.js \dotfill composant UI de fin de partie.
.3 services \dotfill services applicatifs.
.4 communication-service.js \dotfill service gérant la communication.
.4 game-manager.js \dotfill service gérant le jeu en cours.
.3 style \dotfill css et images.
.3 app.js \dotfill création de la vue principale.
.3 index.html \dotfill la page HTML.
}

# Déroulement d’une partie

## Joindre une partie

Les utilisateurs jouent des _parties_ ensemble.
Une partie est constituée d’un ensemble de joueurs qui essaient simultanément de résoudre le même jeu de Tetonor.

L’utilisateur peut joindre une partie déjà existante en choisissant une parmi celles qui sont listés.
L’image \ref{liste_parties} montre la liste de parties créés.
Leur nom est affiché à gauche, et à droite il est affiché le nombre de joueurs ayant déjà rejoint la
partie ainsi que le nombre minimal de joueurs nécessaires pour commencer la partie.
Les parties commencées sont affichées en bleu, et les autres sont en vert.

\begin{figure}[H]
\centering
\includegraphics[width=0.8\textwidth]{img/list_of_parties.png}
\caption{Liste des parties existantes}
\label{liste_parties}
\end{figure}

L’utilisateur peut aussi choisir de créer une nouvelle partie, en spécifiant un nom et un
nombre minimal de joueurs, comme le montre l’image \ref{nouvelle_partie}.

\begin{figure}[H]
\centering
\includegraphics[width=0.8\textwidth]{img/new_party.png}
\caption{Création d’une nouvelle partie}
\label{nouvelle_partie}
\end{figure}

Les joueurs qui rejoignent une partie sont mis en attente jusqu’à ce que le nombre minimal
de joueurs aie rejoint la partie.
En attendant, le nombre de joueurs ayant rejoint la partie est affiché en continu
comme le montre l’image \ref{waiting_players}.

\begin{figure}[H]
\centering
\includegraphics[width=0.5\textwidth]{img/waiting_players.png}
\caption{Attente des autres joueurs}
\label{waiting_players}
\end{figure}

Dès que le nombre de joueurs minimal est présent, la partie commence.
À noter qu’il n’y a pas de nombre maximal de joueurs.
Il est toujours possible à de nouveaux joueurs de joindre une partie qui a déjà commencé.

## Le jeu

Une fois la partie commencée, chaque joueur reçoit du serveur le même jeu de Tetonor à résoudre.

Le jeu se joue en déplaçant les numéros disponibles sur les cases à remplir.
L’opérateur se choisit en cliquant sur la case entre les numéros.

L’image \ref{game} montre un exemple d’une partie en cours.
Les numéros corrects sont affichés en bleu et les incorrects en rouge.

Sur la colonne de droite, la liste des joueurs en cours est affichée avec leur taux de progression.

Le joueur peut ainsi mesurer son progrès relativement à ses adversaires.

Les joueurs dont le nom apparaît en gris sont des joueurs ayant quitté la partie.

\begin{figure}[H]
\centering
\includegraphics[width=0.9\textwidth]{img/game.png}
\caption{Une partie en cours}
\label{game}
\end{figure}

Le premier joueur ayant complété le jeu à 100% gagne la partie.

Tous les joueurs sont alors informés que la partie est finie et leur résultat est affiché (_gagné_ ou _perdu_).

## Échanges entre client web et le serveur

Le diagramme ci-dessous, montre les principales échanges entre le client web et le serveur :

\begin{figure}[H]
\centering
\includegraphics[height=1.0\textheight]{img/Interactions client-server.png}
\caption{Une partie en cours}
\label{game}
\end{figure}

# Architecture

L’architecture est composée d’une application web et d’un serveur web.

La communication entre les clients web et le serveur se fait en utilisant des requêtes Ajax[^ajax] ainsi qu’en utilisant des WebSockets[^websocket]. Ces dernières permettent une connexion bidirectionnelle avec le serveur. Le serveur les utilise pour envoyer (_push_) des informations sur les clients.

[^ajax]: _https://en.wikipedia.org/wiki/Ajax\_(programming)_
[^websocket]: _https://en.wikipedia.org/wiki/WebSocket_

Aucune connexion n’a lieu entre deux clients web directement.

## Application web

L’application web est une application mono-page, réalisée en utilisant les libraires Vue.js[^vuejs] et Boostrap[^boostrap].

[^vuejs]: Framework web utilisé pour construire des interfaces utilisateur pour des applications mono-page (_https://vuejs.org/_)
[^boostrap]: Collection de composants graphiques web (_https://getbootstrap.com/_)

À noter que le pourcentage de progression montré ainsi que la solution pour une partie en cours n’est pas décidée par le client mais par le serveur.
Le serveur suppose que le client peut être compromis et comme tel ne lui fait pas confiance.
À chaque fois que l’utilisateur fait une opération sur la partie en cours, l’état de son jeu est envoyé au serveur. Ce dernier va comparer ce que l’utilisateur envoie avec l’état du jeu généré par le serveur pour la partie en cours.

Pour déterminer le nouveau score de la solution envoyée par le client, le serveur vérifie que les choix de numéros et opérateurs faits par l’utilisateur permettent de résoudre les cases du problème. Le serveur vérifie aussi que les numéros utilisés dans la solution sont ceux générés pour la partie concernée et que le client n’utilise que la quantité qu’il a disponible.

## Le serveur

Le serveur rempli 2 rôles :

-   serveur web, afin de servir les fichiers de l’application web
-   serveur applicatif supportant la logique du jeu

Il utilise principalement les libraires Express[^express] et Express-ws[^express-ws] comme support de connexion HTTP et WebSockets.

[^express]: Librairie offrant des capacités de serveur http (_https://expressjs.com/_)
[^express-ws]: Librairie supportant un serveur websockets (_https://www.npmjs.com/package/express-ws_)

# Conclusion

Ce projet a été pour moi l’opportunité de résoudre des problèmes dans les domaines de l’architecture, l’ingénierie logicielle,
l’expérience utilisateur et le design.

Sur le plan **architectural**, j’ai pu créer une architecture qui permet au serveur de gérer plusieurs clients connectés
simultanément, travaillant ensemble de manière structurée et cohérente.
Les mécanismes de communication permettent au serveur de recevoir et d’envoyer de messages aux clients individuellement, mais aussi d’envoyer des messages à tous les clients ou à un sous-ensemble.

Sur les aspects **algorithmiques**, il a fallu concevoir des composants permettant la gestion de plusieurs parties ayant lieu simultanément.
Chaque partie à sa propre liste de joueurs et sa propre machine à états.
Une deuxième difficulté de ce chapitre fut pour moi la définition des événements et messages nécessaires à la synchronisation des différents clients jouant une même partie.

Au sujet de l’**expérience utilisateur**, la problématique des parties multiples a été la plus difficile à présenter clairement à l’utilisateur. La solution retenue qui présente la liste des parties existantes tout en permettant d’en créer des nouvelles est une solution que je crois satisfaisante.

Je suis également satisfait du composant qui montre à l’utilisateur le progrès des différents joueurs de la partie. Cette information rend le jeu plus compétitif et donc plus intéressant.

Concernant le **design**, il a fallu faire des efforts pour rendre l’application web esthétiquement agréable.
L’esthétique est un aspect qui passe souvent après la fonctionnalité, mais qui ne doit pas être négligé.

Au sujet des technologies utilisées, ce projet fut pour moi l’opportunité d’apprendre à utiliser Vue.js.
C’est un concurrent sérieux de React.js et Angular auquel je m’intéressai depuis un moment.
Je suis très content d’avoir pu compléter la connaissance apprise en cours sur Angular avec celle apprise en pratique sur Vue.js.

Au sujet de la charge de travail, j’ai sous-estimé l’effort nécessaire pour amener le projet à terme.
A posteriori, il est clair pour moi que le projet était suffisamment grand pour être partagé et il aurait été plus judicieux de le faire à deux.

Pour résumer, ce projet a été à la fois intéressant et ludique grâce à la complémentarité de la théorie reçue en cours et la mise en pratique de cette dernière.
