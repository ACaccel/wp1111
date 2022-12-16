/*
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import wsConnect from './wsConnect';
import { v4 as uuidv4 } from 'uuid';
*/
import mongo from './mongo';
import server from './server';

mongo.connect();

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}!`);
});
