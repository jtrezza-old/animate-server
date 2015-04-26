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
    let uri = req.url;

    if(uri.startsWith('/index') || uri === '/'){
        return serveIndex(res)
    }

    if(uri === '/app.js'){
        return serveApp(res)
    }

    res.statusCode = 404;
    res.end(`Not found: ${uri}`);
}

function serveIndex(res)
{
    let fileName = path.join(__dirname, 'public', 'index.html');

    res.setHeader('Content-Type', 'text/html');
    let rs = fs.createReadStream(fileName);
    rs.pipe(res);

    rs.on('error', function(error){
        res.setHeader('Content-Type', 'text/plain');
        res.end(error.message);
    });
}

function serveApp(res)
{
    let fileName = path.join(__dirname, 'public', 'app.js');

    res.setHeader('Content-Type', 'text/javascript');
    let rs = fs.createReadStream(fileName);
    rs.pipe(res);

    rs.on('error', function(error){
        res.setHeader('Content-Type', 'text/plain');
        res.end(error.message);
    });
}

function listening(){
    console.log(`Escuchando en el puerto ${port}`);
}

server.listen(port);