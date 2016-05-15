var generators = require('yeoman-generator');
var through = require('through2');
var fs = require('fs');
var passThroughStream = through.obj(function(chunk, enc, callback) {
  this.push(chunk);
  callback();
})

function getAccount(data) {
  return ('' + data)
    .match(/Address: \{\w*\}/)[0]
    .match(/\w*(?=\})/)[0];
}
var createEthAddress = function(yo) {
  return new Promise((resolve, reject) => {
    var gethResult = yo.spawnCommand('geth', ['--networkid', '12345', '--genesis', 'test/genesis-no-account.json', '--datadir', '.test_blockchain', '--password', 'local-password', 'account', 'new'], {
      stdio: 'pipe'
    });
    gethResult.stdout.on('data', (data) => {
      const account = getAccount(data);
      if (account) {
        resolve(account);
      }
    });
    gethResult.stderr.on('data', (data) => {
      'error creating account, geth returned error:'
      console.error(data);
      reject();
    });
  });
};

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  genAccount: function() {
    console.log('method 1 just ran');
    this.template('_.genesis.json', 'test/genesis-no-accounts.json');
    this.template('_.geth-local.sh', 'geth-local.sh');
    this.template('_.local-password', 'local-password');
    this.fs.commit(() => {
      fs.chmodSync(
        'geth-local.sh',
        '755'
      );
      Promise.all([
        createEthAddress(this),
        createEthAddress(this),
        createEthAddress(this),
        createEthAddress(this),
      ]).then((addresses) => {
        console.log('created addresses: ' + addresses);
        this.template('_.genesis-with-addresses.json.ejs', 'test/genesis.json', {
          addresses: addresses
        });
      })
    });

  },
  genScripts: function() {
    console.log('method 2 just ran');
  }
});