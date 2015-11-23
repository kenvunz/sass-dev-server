var express = require('express'),
    merge = require('lodash/object/merge'),
    path = require('path'),
    chalk = require('chalk');

/**
 * Server
 *
 * @class
 */
function Server(compiler, opts) {
    this.compiler = compiler;
    this.opts = merge({}, Server.defaults, opts || {});
}

Server.defaults = {
    root: './',
    port: 9000,
    headers: {}
};

/**
 * Set to use an external express app
 *
 * @method     use
 * @param      {Express application}  app
 */
Server.prototype.use = function(app) {
    this.app = app;
    this.setup();
};

Server.prototype.run = function(port) {
    var p = port || this.opts.port;
    if(!this.app) this.setup();
    var s = this.app.listen(p, function() {
        var address = s.address();
        console.log(
            chalk.yellow('Running sass-dev-server at %s://%s:%d'),
            address.protocol || 'http',
            address.address === '::'? 'localhost' : address.address,
            address.port
        );
    });
};

Server.prototype.setup = function() {
    if(!this.app) this.app = express();

    this.app.get('/:path(*)\.scss$', this._handle.bind(this));
};

Server.prototype._handle = function(req, res) {
    var file = path.resolve(this.opts.root, req.params.path) + '.scss',
        headers = merge({}, this.opts, {
            "Content-Type": "text/css"
        });

    this.compiler.render(file)
    .then(function(css) {
        for(var p in headers) {
            if(!headers.hasOwnProperty(p)) continue;
            res.set(p, headers[p]);
        }
        res.send(css);
    })
    .catch(function() {
        res.status(404).send('Not found');
    });
};

module.exports = Server;