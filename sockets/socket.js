const { io } = require('../index');


//Mensagem de socket
io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    
});