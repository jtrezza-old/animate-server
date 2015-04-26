'use strict'

const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;
/**
 * La función createServer recibe como parámetro una función anónima que funciona como callback en cada petición.
 * Esta función recibe dos parámetros: El request y el response.
 * También se puede crear sin parámetros y luego se asigna el envento en un event emitter
 */
//const server = http.createServer(onRequest);
const server = http.createServer();

server.on('request', onRequest);
server.on('listening', listening);

function onRequest(req, res){
    let fileName = path.join(__dirname, 'public', 'index.html');

    fs.readFile(fileName, function(error, file){
        if(error){
            return res.end(error.message);
        }
        res.setHeader('Content-Type', 'text/html');
        res.end(file);
    });
}

function listening(){
    console.log(`Escuchando en el puerto ${port}`);
}

//Configuración del server
//También acepta un callback que se ejecuta cuando ocurre el evento
//Acá también se cambió el callback por un event emitter
//server.listen(port, listening);
server.listen(port);