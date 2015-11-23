var cwd = process.cwd(),
    path = require('path'),
    config;

try {
    config = require(path.join(cwd, 'sass-dev-server.config'));
} catch(e) {
    config = {
        server: null,
        compiler: null
    };
}

module.exports = config;