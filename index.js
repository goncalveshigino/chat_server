const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Config
require('./database/config').dbConnection();

//App de express
const app = express();

//Leitura e análise do body
app.use(express.json());



//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');


//path public 
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


// Minhas rotas 
app.use('/api/login', require('./routes/auth') );



server.listen(process.env.PORT, (err) => {
    
    if (err) throw new Error(err);
    
    console.log(`Servidor rodando na porta `, process.env.PORT)
})