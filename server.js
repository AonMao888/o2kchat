const express = require('express');
const app = express();
const socket = require('socket.io');

app.use(express.static(__dirname+'/public'))

const server = app.listen(3000,()=>{
    console.log('server started with port 3000')
})

var io = socket(server);
io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('join',(data)=>{
        io.sockets.emit('join',data)
    })
    socket.on('msg',(data)=>{
        io.sockets.emit('msg',data)
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })
})