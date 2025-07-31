const express = require('express');
const http = require('http');
const app = express();
const problemRoutes = require('./routes/problems');
const roomRoutes = require('./routes/room');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const {createRoom, joinRoom, createUser, updateUser, deleteUser, generateRoomId} = require('./controllers/roomController');
const path = require('path');
// connect to .env file
require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction ? ["http://www.codeclash.net"] : ["http://localhost:3000"];

console.log(allowedOrigins);
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: [allowedOrigins],
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true
      }
});

if(isProduction){
    console.log('It is in production');
    app.use(express.static(path.join(__dirname, './build')));
}
else{
    console.log('It is not production');
}
// Run when client connects
io.on('connection', (socket) => {
    // console.log('New WS Connection...');
    // socket.on("send message", (message) => {
    //     console.log(message);
    //     io.emit("receive message" , "Hey new user joined");
    // })
    //diffs, size, username, socket_id
    socket.on("create room", async ({diffs, num_players, username}) => {
        console.log("Creating the room");
        console.log({diffs, num_players, username});
        const {user, room} = await createRoom({diffs, num_players, username, socket_id: socket.id});
        if(room.error){
            console.log(room);
            socket.emit('error create room', room);
        }
        else{
            socket.join(room.room_name);
            console.log("SOCKET BELONGS TO ROOM: " + socket.rooms);
            socket.emit('success create room', {user, room});
        }
    })
    socket.on("join room", async ({username, room_name}) => {
        console.log(username + " is joining " + room_name);
        const {user, room} = await joinRoom({room_name, username, socket_id: socket.id});
        if(room.error){
            console.log(room);
            socket.emit('error join room', room);
        }
        else{
            socket.join(room.room_name);
            socket.emit('success join room', {user, room});
            console.log("SOCKET BELONGS TO ROOM: " + socket.rooms);
            socket.to(room.room_name).emit('new user joining room', {user, room});
        }
    })
    socket.on('game solve message', (user) => {
        console.log("GOT GAME SOLVE MESSAGE");
        console.log(user);
        updateUser(user);
        io.in(user.room_name).emit('user solved problem', user);
    });

    socket.on("send powerup", ({socket_id, powerup_name, send_user, rec_user, room_name}) => {
        console.log(socket_id);
        console.log(powerup_name);
        io.to(socket_id).emit('rec powerup', powerup_name);
        const message = `${send_user} used ${powerup_name} on ${rec_user}`;
        console.log(message);
        console.log(room_name);
        io.in(room_name).emit('user used powerup', message);
    })

    socket.on('disconnect', async () => {
        console.log('Disconnecting user');
        const user = await deleteUser({socket_id:socket.id});
        console.log(user);
    })
});

// this bit of middleware converts the request body into json readable format
app.use(express.json())
// middleware to log requests
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

//uses problemRouter to handle Routing
app.use('/api/problems/', problemRoutes);
app.use('/api/rooms/', roomRoutes);
app.get("/*", (req, res) => {
    console.log("base route accessed")
    res.sendFile(path.join(__dirname, './build/index.html'))
})
// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        // once connect to database fires this function
        // ie success
        server.listen(process.env.PORT, () => {
            console.log('Connected to DB & Listening to Port ' + process.env.PORT);
            
        })
    })
    .catch((error) => {
        console.log(error);
    })
 
