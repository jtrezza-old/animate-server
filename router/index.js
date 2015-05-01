'use strict'

const path = require('path');
const course = require('course');
const st = require('st');
const jsonBody = require('body/json');
const helper = require('../helper');

const router = course();
const mount = st({
    path: path.join(__dirname, '..', 'public'),
    index: 'index.html',
    passthrough: true //Este parámetro impide que se lance un error si no se encuentra un archivo real
});

router.post('/process', function(req, res){
    jsonBody(req, res, {limit : 3 * 1024 * 1024}, function(error, body){
        if ( error ) return fail(error, res);

        let converter = helper.convertVideo(body.images);

        converter.on('video', function(video){
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({video: video}));
        });
    });
});

function onRequest(req, res)
{
    mount(req, res, function(error){
        if(error) return fail (error, res);

        router(req, res, function(error){
            if (error) return fail(error, res);

            res.statusCode = 404;
            res.end(`Not found ${req.url}`);
        });
    });
}

function fail(error, res)
{
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(error.message);
}

module.exports = onRequest;