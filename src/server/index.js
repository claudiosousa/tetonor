const communicationManager = require('./CommunicationManager.js'),
    Express = require('express'),
    opn = require('opn'),
    ExpressWs = require('express-ws');

const WEBPORT = 7654,
    aWss = ExpressWs(Express()),
    app = aWss.app;

app.ws('/ws', (ws, req) => {
    ws.on('message', msg => {
        try {
            communicationManager.handleMsg(JSON.parse(msg), ws);
        } catch (e) {
            console.error(`ERROR: ${e}`);
        }
    });
});

communicationManager.setWssRoot(aWss.getWss('/'));

app.use(Express.json());

app.use(Express.static('../webapp'));

app.listen(WEBPORT, () => {
    console.log(`Tetonor listening on port ${WEBPORT}!`);
    opn(`http://localhost:${WEBPORT}`);
});
