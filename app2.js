
import express from "express";
import bodyParser from "body-parser";
import { Server } from 'socket.io';
import http from "http";
import path from 'path';
import {WebSocketServer} from "ws";

const socket = new WebSocketServer({port:3000}); // socket isto ko wss

socket.on('connection', function connection(ws)  {
    // Send initial data to the client
    console.log(" New Client joined Server");
    ws.send('Welcome to the Immurium WebSocket server!');
    ws.on('message', (message) => {
        // Handle incoming messages
        console.log('Server received message:'+ message);
        // Send a response to the client
        socket.clients.forEach(function each (client){
            //client.send( message);
            if (client !== ws){client.send( message);}            
        });
        //ws.send('Message received successfully! || msg: ' + message);

    });

    socket.on('close', () => {
        console.log("Client disconnected");
    });

 
});








/*
//const WebSocket = require('ws')
const ws = new WebSocket(http.createServer);
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT })
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('Hello! Message From Server!!')
})

*/







/*
const __dirname = path.resolve();


const app = express();
const PORT = 3000;

const httpServer = http.createServer(app);

const socket = new Server(httpServer);

  
socket.on('connection', (socket) => {
    console.log('cao konektovan');
    socket.broadcast.emit('konekcijaaaa');
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
         socket.broadcast.emit("message", msg);
      });
  });


app.get("", (req, res) => {
    console.log(__dirname)
    var filePath = path.join(__dirname, 'client.html');
    res.sendFile(filePath)
});
app.get("/client2", (req, res) => {
    console.log(__dirname)
    var filePath = path.join(__dirname, 'client2.html');
    res.sendFile(filePath)
});

httpServer.listen(PORT);
*/