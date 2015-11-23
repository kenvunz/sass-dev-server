var Compiler = require('../../lib/compiler'),
    path = require('path');

describe('lib/compiler', function() {

    describe('render()', function() {
        it('should work as expected', function() {
            var instance = new Compiler(),
                file = path.join(__dirname, '../fixtures/render-1.scss');
            return instance.render(file)
            .then(function(css) {
                expect(instance.result).to.be.an('object');
                expect(css).to.equal("body {\n  color: red; }\n");
            });
        });

        it('should work with options passed via constructor', function() {
           var instance = new Compiler({outputStyle: "compressed"}),
               file = path.join(__dirname, '../fixtures/render-1.scss');
               
           return instance.render(file)
           .then(function(css) {
               expect(instance.result).to.be.an('object');
               expect(css).to.equal("body{color:red}\n");
           });
        });

        it('should work with options passed via method', function() {
           var instance = new Compiler({outputStyle: "expanded"}),
               file = path.join(__dirname, '../fixtures/render-1.scss');
               
           return instance.render(file, {outputStyle: "compressed"})
           .then(function(css) {
               expect(instance.result).to.be.an('object');
               expect(css).to.equal("body{color:red}\n");
           });
        });
    });

});