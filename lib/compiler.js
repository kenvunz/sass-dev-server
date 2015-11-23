var merge = require('lodash/object/merge'),
    sass = require('node-sass'),
    Promise = require('bluebird'),
    render = Promise.promisify(sass.render),
    globImporter = require('sass-glob-importer');

/**
 * Compiler
 *
 * @class
 */
function Compiler(opts) {
    this.opts = merge({}, Compiler.defaults, opts || {});
}

Compiler.defaults = {};

/**
 * Render a given scss file to css file
 *
 * @method     render
 * @param      {String}   file    Path to scss file
 * @param      {Object}   opts    Options to pass over to `node-sass.render`
 *                                @see {@link https://github.com/sass/node-sass}
 *                                
 * @return     {Promise}  A promise which will resolve to rendered css string
 */
Compiler.prototype.render = function(file, opts) {
    opts = merge({
        file: file
    }, this.opts, opts || {});

    if(!opts.importer) opts.importer = globImporter();

    var self = this;

    // clear out previous result
    this.result = null;

    return render(opts).then(function(result) {
        self.result = result;
        return self.result.css.toString();
    });
};

module.exports = Compiler;