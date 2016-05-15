var generators = require('yeoman-generator');
var through = require('through2');
var fs = require('fs');

var passThroughStream = through.obj(function(chunk, enc, callback) {
  this.push(chunk);
  callback();
})


module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  genAccount: function() {
    console.log('method 1 just ran');
    this.template('_.genesis.json', 'test/genesis.json');
    this.template('_.geth-local.sh', 'geth-local.sh');
    this.registerTransformStream(passThroughStream).on('end', () => {
      fs.chmodSync(
        'geth-local.sh',
        '755');
    });
  },
  genScripts: function() {
    console.log('method 2 just ran');
  }
});

// gulp.task('generate-account', function() {
//   return gulp.src('', {
//     read: false
//   }).pipe(shell([
//     'rm -rf test',
//     'mkdir test',
//     'cp genesis.default.json test/genesis.json'
//   ], {
//     verbose: true
//   }))
// });

// gulp.task('gen-scripts', function() {
//   return gulp.src('', {
//     read: false
//   }).pipe(shell(
//     [
//       'echo \'geth --networkid 12345 --genesis test/genesis.json --datadir .test_blockchain console\' > eth-local.sh',
//       'chmod +x eth-local.sh'
//     ], {
//       verbose: true
//     }
//   ));
// });