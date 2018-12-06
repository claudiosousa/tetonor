/**
 * Server entry point.
 * Opens the HTTP and Websocket server.
 * It also opens a browser window connected to the server
 */

const communicationManager = require('./CommunicationManager.js'),
    Express = require('express'),
    opn = require('opn'),
    ExpressWs = require('express-ws');

const WEBPORT = 7654,
    aWss = ExpressWs(Express()),
    app = aWss.app;

/**
 * Handling on new web socket client
 */
app.ws('/ws', (ws, req) => {
    /**
     * Handling of web socket message
     */
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

/**
 * Instanciation of web server
 */
app.listen(WEBPORT, '0.0.0.0', () => {
    console.log(`Tetonor listening on port ${WEBPORT}!`);
    opn(`http://localhost:${WEBPORT}`);
});
