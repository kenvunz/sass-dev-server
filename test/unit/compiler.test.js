var Compiler = require('../../lib/compiler'),
    path = require('path'),
    fs = require('fs');

describe('lib/compiler', function() {

    afterEach(function() {
        Compiler.defaults = {};
    });

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

        it('should work with options define via `defaults`', function() {
            Compiler.defaults = {outputStyle: "compressed"};

            var instance = new Compiler(),
                file = path.join(__dirname, '../fixtures/render-1.scss');
            return instance.render(file)
            .then(function(css) {
                expect(instance.result).to.be.an('object');
                expect(css).to.equal("body{color:red}\n");
            });
        });

        it('should work with standard @import', function() {
            Compiler.defaults = {outputStyle: "compressed"};

            var instance = new Compiler(),
                file = path.join(__dirname, '../fixtures/import.scss');
            return instance.render(file)
            .then(function(css) {
                expect(instance.result).to.be.an('object');
                expect(css).to.equal("body{color:blue}\n");
            });  
        });

        it('should work with glob style `@import`', function() {
            Compiler.defaults = {outputStyle: "compressed"};

            var instance = new Compiler(),
                file = path.join(__dirname, '../fixtures/glob.scss');
            return instance.render(file)
            .then(function(css) {
                expect(instance.result).to.be.an('object');
                expect(css).to.equal("body{color:blue}\n");
            }); 
        });

        it('should work when globbed files have been changed', function() {
            Compiler.defaults = {outputStyle: "compressed"};

            var instance = new Compiler(),
                file = path.join(__dirname, '../fixtures/glob.scss'),
                a = path.join(__dirname, '../fixtures/glob/a.scss'),
                content = fs.readFileSync(a, 'utf8');

            return instance.render(file)
            .then(function(css) {
                expect(instance.result).to.be.an('object');
                expect(css).to.equal("body{color:blue}\n");

                fs.writeFileSync(a, content.replace('blue;', 'red;'));

                return instance.render(file)
                .then(function(css) {
                    fs.writeFileSync(a, content);
                    expect(css).to.equal("body{color:red}\n");
                });
            }); 
        });

        it('should work with @import "css:..."', function() {
            Compiler.defaults = {outputStyle: "compressed"};

            var instance = new Compiler(),
                file = path.join(__dirname, '../fixtures/css.scss');
            return instance.render(file)
            .then(function(css) {
                expect(instance.result).to.be.an('object');
                expect(css).to.equal("body{color:blue}\n");
            });  
        });

        it('should work with @import "npm:..."', function() {
            Compiler.defaults = {outputStyle: "compressed"};

            var instance = new Compiler(),
                file = path.join(__dirname, '../fixtures/npm.scss');
            return instance.render(file)
            .then(function(css) {
                expect(instance.result).to.be.an('object');
                expect(css).to.equal('/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}h1{font-size:2em;margin:0.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace, monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0}input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button{height:auto}input[type="search"]{-webkit-appearance:textfield;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:bold}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}body{-webkit-animation:scale 1s ease-in,slide 2s ease;-moz-animation:scale 1s ease-in,slide 2s ease;animation:scale 1s ease-in,slide 2s ease}\n');
            });  
        });
    });

});