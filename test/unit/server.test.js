var Server = require('../../lib/server'),
    Compiler = require('../../lib/compiler'),
    request = require('supertest'),
    express = require('express'),
    path = require('path');

describe('lib/server', function() {

    it('should work as expected', function(done) {
        var instance = new Server(new Compiler(), {
            root: path.join(__dirname, '../')
        }),
            app = express();
        instance.use(app);

        request(instance.app).get('/fixtures/render-1.scss')
        .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.text).to.equal("body {\n  color: red; }\n");
            expect(res.get('content-type')).to.equal('text/css; charset=utf-8');
            done();
        });
    });

    it("should return 404 if file doesn't exist", function(done) {
        var instance = new Server(new Compiler(), {
            root: path.join(__dirname, '../')
        }),
            app = express();
        instance.use(app);

        request(instance.app).get('/fixtures/render.scss')
        .end(function(err, res) {
            expect(res.status).to.equal(404);
             done();
        });
    });
});