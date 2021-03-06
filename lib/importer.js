var globImporter = require('sass-glob-importer'),
    isGlob = require('is-glob'),
    path = require('path'),
    fs = require('fs'),
    types = require('node-sass').types,
    findup = require('findup-sync'),
    modulesPath = findup("node_modules", {cwd: './'});

module.exports = function(url, parent, done) {
    var file,
        clean = url.replace(/(css\:|npm\:|bower\:)/, ''),
        ext = path.extname(clean),
        fn = globImporter();

    if(isGlob(clean)) {
        return fn(url, parent, done);
    } else if(url.indexOf('css:') === 0) {
        file = path.resolve(path.dirname(parent), clean);
        return done({contents: fs.readFileSync(file, 'utf8')});
    } else if(url.indexOf('npm:') === 0) {
        file = path.join(modulesPath, clean);
        if(ext === '.css') return done({contents: fs.readFileSync(file, 'utf8')});
        else return done({file: file});
    }

    return types.Null();
};