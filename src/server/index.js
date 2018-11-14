const communicationManager = require('./CommunicationManager.js'),
    Express = require('express'),
    ExpressWs = require('express-ws');

const WEBPORT = 7654,
    app = Express();

ExpressWs(app);

app.ws('/ws', (ws, req) => {
    ws.on('message', msg =>
        communicationManager.handleMsg(JSON.parse(msg), ws)
    );
});

app.use(Express.json());

app.use(Express.static('../webapp'));

app.listen(WEBPORT, () => {
    console.log(`Tetonor listening on port ${WEBPORT}!`);
    // const opn = require('opn');
    // opn(`http://localhost:${WEBPORT}`);
});
