const path = require('path');
const st = require('st');

const mount = st({
    path: path.join(__dirname, '..', 'public'),
    index: 'index.html'
});

function onRequest(req, res)
{
    mount(req, res, function(error){
        if(error){
            return res.end(error.message);
        }

        res.statusCode = 404;
        res.end(`Not found ${req.url}`);
    });
}

module.exports = onRequest;