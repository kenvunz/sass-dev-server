#! /usr/bin/env node
var cwd = process.cwd(),
    path = require('path'),
    Compiler = require('./lib/compiler'),
    Server = require('./lib/server'),
    meta = require('./package.json'),
    program = require('commander'),
    express = require('express'),
    config;

try {
    config = require(path.join(cwd, 'sass-dev-server.config'));
} catch(e) {
    config = {
        server: null,
        compiler: null
    };
}

program.version(meta.version)
    .option('-p, --port [port]', 'port number to run server on', parseInt)
    .arguments('[dir]', 'root directory of the server')
    .action(function(dir) {
        if(!config.server) config.server = {};
        config.server.root = dir;
    })
    .parse(process.argv);

if(program.port) {
    if(!config.server) config.server = {};
    config.server.port = program.port;
}


var compiler = new Compiler(config.compiler),
    server = new Server(compiler, config.server);

server.setup();
server.app.use(express.static(server.opts.root));
server.run();