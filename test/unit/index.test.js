var SassDevServer = require('../../lib');

it('should have all included modules', function() {
    expect(SassDevServer).to.be.an('object');
    expect(SassDevServer).to.contain.all.keys('Compiler', 'Server');
});