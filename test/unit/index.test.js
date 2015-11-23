var SassDevServer = require('../../');

describe('index', function() {
    it('should have all modules', function() {
        expect(SassDevServer).to.be.an('object');
        expect(SassDevServer).to.contain.all.keys('Compiler', 'Server');
    });    
});
