#! /usr/bin/env node
var Compiler = require('./lib/compiler'),
    Server = require('./lib/server'),
    meta = require('./package.json'),
    program = require('commander'),
    express = require('express'),
    config = require('./lib/config');

program
    .version(meta.version)
    .option('-p, --port [port]', 'port number that server listen to', parseInt)
    .option('-r, --root [root]', "server's root directory")
    .parse(process.argv);

if(program.root) {
    if(!config.server) config.server = {};
    config.server.root = program.root;
}

if(program.port) {
    if(!config.server) config.server = {};
    config.server.port = program.port;
}

var compiler = new Compiler(config.compiler),
    server = new Server(compiler, config.server);

server.setup();
server.app.use(express.static(server.opts.root));
server.run();