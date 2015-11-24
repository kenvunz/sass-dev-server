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

/**
 * Get the server started
 *
 * @method     run
 * @param      {Number}  port    port number to listen on
 */
Server.prototype.run = function(port) {
    var p = port || this.opts.port, self = this;
    if(!this.app) this.setup();
    var s = this.app.listen(p, function() {
        var address = s.address();
        console.log(
            chalk.cyan('Running sass-dev-server at %s://%s:%d with root set to "%s"'),
            address.protocol || 'http',
            address.address === '::'? 'localhost' : address.address,
            address.port,
            self.opts.root
        );
    });
};

/**
 * Do the setting up, and if there is no express app defined yet
 * will initiate one as well
 *
 * @method     setup
 */
Server.prototype.setup = function() {
    if(!this.app) this.app = express();

    this.app.get('/:path(*)\.scss$', this._handle.bind(this));
};

/**
 * Handle the request passed over by express
 *
 * @method     _handle
 * @param      {Request}   req     
 * @param      {Response}  res     
 */
Server.prototype._handle = function(req, res) {
    console.log(
        chalk.green("GET      ", "%s"), req.params.path
    );

    var file = path.join(this.opts.root, req.params.path) + '.scss',
        resolved = path.resolve(file),
        headers = merge({}, this.opts, {
            "Content-Type": "text/css"
        });

    this.compiler.render(resolved)
    .then(function(css) {
        console.log(
            chalk.green("RESOLVED ", "%s"), file
        );

        for(var p in headers) {
            if(!headers.hasOwnProperty(p)) continue;
            res.set(p, headers[p]);
        }

        res.send(css);
    })
    .catch(function(err) {
        console.log(chalk.red('ERROR    ', err.message));
        var fileLineColumn = err.file + ':' + err.line + ':' + err.column;
        var message = err.message + ' in ' + fileLineColumn;
        var data = '/*\n' + message + '\n*/\n\nbody:before { white-space: pre; font-family: monospace; content: "' + message.replace(/\n/g, "\\A ") + '"';

        res.set('Content-Type', 'text/css');
        res.send(data);
    });
};

module.exports = Server;