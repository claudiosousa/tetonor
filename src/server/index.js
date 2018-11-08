const gameManager = require('./GameManager.js')(),
    Express = require('express'),
    ExpressWs = require('express-ws');

const WEBPORT = 7654;

const app = Express();

ExpressWs(app);

app.ws('/ws', (ws, req) => {
    ws.on('message', msg => {
        gameManager.get;
        ws.send(msg);
    });
});

app.use(Express.json());

// app.post('/write', async (req, res) => {
//     try {
//         req.body.code);
//     } catch (err) {
//     }
//     res.send();
// });

app.use(Express.static('../webapp'));

app.listen(WEBPORT, () => {
    console.log(`Tetonor listening on port ${WEBPORT}!`);
    const opn = require('opn');
    opn(`http://localhost:${WEBPORT}`);
});
