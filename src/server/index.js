'use strict';

const express = require('express'),
    app = express(),
    webport = 7654;

const Game = require('./Game.js');

app.use(express.json());

// app.post('/write', async (req, res) => {
//     try {
//         req.body.code);
//     } catch (err) {
//     }
//     res.send();
// });

app.use(express.static('../webapp'));

app.listen(webport, () => {
    console.log(`Tetonor listening on port ${webport}!`);
    const opn = require('opn');
    opn(`http://localhost:${webport}`);
});
