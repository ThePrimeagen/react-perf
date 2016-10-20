const runner = require('./index.js');
const suite = new require('benchmark').Suite();

var hertz = [];
var total = 0;
for (var i = 0; i < 2; ++i) {
    suite.
        add('runner', function() {
            return runner(100);
        }).
        on('cycle', function(x) {
            hertz.push(x.target.hz);
            total += x.target.hz;
        }).
        on('error', function(e) {
            console.log('Error', e);
            process.exit(1);
        }).
        run({});
}

console.log('Hertz', hertz, total / hertz.length);
