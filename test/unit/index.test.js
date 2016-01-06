var SassDevServer = require('../../');

describe('index', function() {
    it('should have all modules', function() {
        expect(SassDevServer).to.be.an('object');
        expect(SassDevServer.Compiler).to.be.a('function');
        expect(SassDevServer.Server).to.be.a('function');
        expect(SassDevServer.render).to.be.a('function');
    });    
});
