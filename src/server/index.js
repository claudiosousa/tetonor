const GameManager = require('./GameManager.js'),
    Express = require('express'),
    ExpressWs = require('express-ws');

const WEBPORT = 7654,
    gameManager = new GameManager(),
    app = Express();

ExpressWs(app);

app.ws('/ws', (ws, req) => {
    ws.on('message', msg => {
        let res = gameManager.handleMsg(msg, ws);
        ws.send(res);
    });
});

app.use(Express.json());

app.use(Express.static('../webapp'));

app.listen(WEBPORT, () => {
    console.log(`Tetonor listening on port ${WEBPORT}!`);
    const opn = require('opn');
    opn(`http://localhost:${WEBPORT}`);
});
