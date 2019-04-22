var loki = require('lokijs');

var db = new loki('loki.json');

module.exports = {
    sayHello: function () {
        return 'HELLO';
    }
}