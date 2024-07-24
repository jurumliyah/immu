import express from "express";
import bodyParser from "body-parser";
import { Server } from 'socket.io';
import http from "http";
import path from 'path';

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