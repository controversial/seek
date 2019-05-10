// The subscriber listens to the find3 feed of events, and adds them to the database

const WebSocket = require('ws');
const ws = new WebSocket(`ws://${process.env.FIND3_ADDRESS}/ws?device=all&family=nphs`); // TODO: figure out how to rename family to seek

ws.on('open', () => console.log('Connected to find3'));
ws.on('message', (data) => console.log(data));
