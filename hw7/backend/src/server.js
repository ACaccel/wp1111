import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import mongo from './mongo';
import wsConnect from './wsConnect';
import { v4 as uuidv4 } from 'uuid';

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connected!');
  wss.on('connection', (ws) => {
    ws.id = uuidv4();
    ws.box = ''; // keep track of client's CURRENT chat box
    // wsConnect.initData(ws);
    ws.onmessage = wsConnect.onMessage(ws);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});