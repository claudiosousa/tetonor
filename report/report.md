---
author: Claudio Sousa
date: Décembre 2018
documentclass: article
fontsize: 11pt
geometry: margin=2cm
header-includes: |
    \usepackage{fancyhdr}
    \usepackage{lastpage}
    \usepackage{graphicx}
    \usepackage{float}

    \graphicspath{{./img/}}

    \pagestyle{fancy}

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
        md_extensions: '+inline\_notes'
title: |
    | TETONOR
    | Un jeu web intéractif multijoueur
---

\thispagestyle{empty} \newpage

\tableofcontents
\newpage

# Introduction

Ce projet consiste à développer un jeu multijoueur basé sur des technologies web mettant
en pratique la théorie du cours de Technologies Web avancées, suivit à l'HEPIA[^hepia],
le semestre d'automne 2018 avec professeur Stéphane Malandain.

[^hepia]: Haute école du paysage, d'ingénierie et d'architecture de Genève (_https://www.hesge.ch/hepia/_)

Ce jeu permet à plusieurs joueurs de jouer une même partie de Tetonor de manière simultanée et concurrente.
Chaque joueur joue sur son navigateur web, avec l'objectif d'être le premier à terminer le jeu

Dés qu'un joueur termine le jeu, le jeu est finit et le joueur est déclaré vainqueur.

# Déroulement

## Joindre une partie

Les utilisateurs jouent des _parties_ ensembles.
Une partie est constituée d'un ensemble de joueurs que essayent simultanéement de résoudre le même jeu de Tetonor.

L'utilisateur peut joindre une partie déjà existante en choisissant une parmi celles listés.
mage \ref{liste_parties} montre la liste de parties créés. Leur nom est affiché à gauche, et à droite il est affiché le nombre de joueurs ayant déjà joint la partie et le nombre minimal de joueurs nécéssaires pour commencer la partie. Les parties commencées sont affichées en bleu, et leur autres en vert.

\begin{figure}[H]
\centering
\includegraphics[width=0.8\textwidth]{img/list_of_parties.png}
\caption{Liste des parties existante}
\label{liste_parties}
\end{figure}

L'utilisateur peut aussi choisir de créer une nouveau partie, en spécifiant un nom et un
nombre minimal de joueurs, comme le montre l'image \ref{nouvelle_partie}.

\begin{figure}[H]
\centering
\includegraphics[width=0.8\textwidth]{img/new_party.png}
\caption{Création d'une nouvelle partie}
\label{nouvelle_partie}
\end{figure}

Les joueurs qui joignent une partie sont mis en attente jusqu'à ce que le nombre minimal
de joueur ait joint la partie.
En attendant, le nombre de joueurs ayant joint la partie est affiché en continu
comme le montre l'image \ref{waiting_players}.

\begin{figure}[H]
\centering
\includegraphics[width=0.5\textwidth]{img/waiting_players.png}
\caption{Attente des autres joueurs}
\label{waiting_players}
\end{figure}

Dés que le nombre de joueurs minimal est présent, la partie commence.
À noter qu'il n'y a pas de nombre maximal de joueurs.
Il est toujours possible à de nouveaux joueurs de joindre une partie qui a déjà commencé.

## La partie

Une fois la partie commencée, chaque joueur voir le même jeu de Tetonor à compléter.

Le jeu se joue en déplaçant les numéros disponibles sur les cases à remplir.
L'opérateur se choisit en cliquant sur la case entre les numéros.

L'image \ref{game} montre un exemple d'une partie en cours.
Le numéros corrects sont affichés en bleu et les incorrects en rouge.

Sur la colonne de droite, la liste des joueurs en cours est affichée avec leur taux de progression.

Le joueur peut ainsi mesurer sont progrès relativement à ses adversaires.

Les joueurs dont le nom apparaît en gris sont des joueurs ayant quitté la partie.

\begin{figure}[H]
\centering
\includegraphics[width=0.8\textwidth]{img/game.png}
\caption{Une partie en cours}
\label{game}
\end{figure}

Le premier joueur ayant complété le jeu à 100% gagne la partie.

Tous les joueurs sont alors informés que la partie est finie et le résultat (gagné ou perdu).

# Architecture

L'application est composée d'un client web, et d'un serveur web.

### Application web

L'application web est une application monopage, réalisée en utilisant les libraires Vue.js[^vuejs] et Boostrap[^boostrap].

[^vuejs]: Framework web utilisé pour construire des interfaces utilisateur pour des applications monopage (_https://vuejs.org/_)
[^boostrap]: Collection de composants graphiques web (_https://getbootstrap.com/_)

La communication avec le serveur se fait en utilisant des requêtes Ajax[^ajax] ainsi qu'en utilisant des WebSockets[^websocket]. Ces dernières permettent une connexion bidirectionnelle avec le serveur. le serveur les utilisent pour envoyer (_push_) des informations sur les clients.

[^ajax]: _https://en.wikipedia.org/wiki/Ajax\_(programming)_
[^websocket]: _https://en.wikipedia.org/wiki/WebSocket_

Naturellement, aucune connexion n'a lieu entre deux client directement.

### Le serveur

Le serveur a comme objectif

# Installation
