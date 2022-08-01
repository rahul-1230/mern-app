const express = require('express');
const path = require('path');
const url = require('url');
const morgan = require('morgan');
var app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var port = process.env.PORT || 3000;

const server = require('http').createServer(app); 
const io = require('socket.io')(server);

var routAdmin = require('./Routes/admin.js');
var routShop = require('./Routes/shop.js');
var routCust = require('./Routes/customer.js');

var uri = 'mongodb+srv://Dhruv100:DH12uV0100@cluster0.xncpb.mongodb.net/ChashmaGhar?retryWrites=true&w=majority';

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
// Seeting up EJS as templating engine

app.set('view engine','ejs');
app.set('views',['Views','Views/Admin','Views/Shop']);
//var sign = require('./Views/SignIn.html');

// Set routers

app.use("/admin",routAdmin);
app.use("/shop",routShop);
app.use("/cust",routCust);


// Database connection and starting server  

// var conn = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err=>{
//     console.log(err.reason);
// });

// conn.on('connected', ()=> {
//     console.log("Database is successfully connected.");
//     app.listen(port, ()=> {
//         console.log('Server listening on port ${port}...');
//     });
// });

// conn.on('disconnected', ()=> {
//     console.log('Database is disconnected.');
// });

// conn.on('close', ()=>{
//     console.log('Database connection has been closed.');
// });

mongoose.connect(uri, {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
    }).then( result => {

        io.of("/shop").on('connection', function(socket){
            console.log('A user connected');
            
            
            socket.on('chat shop message', (message) => {
                io.of("/admin").emit('chat shop message', message.content);
            });

            socket.on('disconnect', function () {
               console.log('A user disconnected');
            });
         });

         io.of("/admin").on('connection', function(socket){
            console.log('Admin connected');
            
            socket.on('chat admin message', (msg) => {
                console.log(msg)
                io.of("/shop").emit('chat admin message', msg.content);
            });

            socket.on('disconnect', function () {
               console.log('Admin disconnected');
            });
         });

        server.listen(port, () => {
            console.log(`Listening on port ${port}...`)}
            );
    }).catch(err => { 
        console.log(err);
    }
);
