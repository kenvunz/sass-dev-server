var Compiler = require('./compiler'),
    Server = require('./server'),
    path = require('path'),
    config = require('./config'),
    merge = require('lodash/object/merge'),
    fs = require('fs');

module.exports = function(file, out, opts) {
    if(typeof out === 'object') {
        opts = out;
        out = null;
    }

    opts = merge({}, config.compiler || {}, opts || {});

    var compiler = new Compiler(opts),
        root = config.server? config.server.root || Server.defaults.root : Server.defaults.root;

    if(file[0] != '/') file = path.resolve(process.cwd(), root, file);

    if(out && out[0] != '/') out = path.resolve(process.cwd(), root, out);

    return compiler.render(file).then(function(css) {
        if(!out) return css;
        fs.writeFileSync(out, compiler.result.css);

        return out;
    });
};