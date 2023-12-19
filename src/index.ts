import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'

const app = express();
const server = http.createServer(app);
const io = new Server(server,  {
    cors: {
      origin: 'http://localhost:3000',
      methods: ["*"],
    },
  });

app.use(cors())

app.use(express.json());

io.on('connect', (socket: Socket) => {
    console.log('A user connected');  
    socket.on('message', (data: { name: string; message: string }) => {
      const messageWithId = {
        ...data,
        id: uuidv4(),
      };
      io.emit('message', messageWithId);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

const PORT = 3002;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})