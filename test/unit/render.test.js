var render = require('../../lib/render'),
    temp = require('temp'),
    fs = require('fs');

describe('lib/render', function() {
    it('should work as expected', function() {
        return render('fixtures/render-1.scss', {outputStyle: "compressed"})
        .then(function(css) {
            expect(css).to.equal("body{color:red}\n");
        });
    });

    it('should write to a file if specified', function() {
        temp.track();

        var tmp = temp.openSync();

        return render('fixtures/render-1.scss', tmp.path, {outputStyle: "compressed"})
        .then(function() {
            var content = fs.readFileSync(tmp.path);
            expect(content.toString()).to.equal("body{color:red}\n");
        });
    });

    it("should resolve output base on `root` file if it's relative", function() {
        return render('fixtures/render-1.scss', 'fixtures/output.css', {outputStyle: "compressed"})
        .then(function(out) {
            var content = fs.readFileSync(out);
            expect(content.toString()).to.equal("body{color:red}\n");
            fs.unlinkSync(out);
        });
    });
});