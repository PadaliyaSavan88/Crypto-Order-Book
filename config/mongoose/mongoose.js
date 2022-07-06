var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment')

module.exports = function(){
    var mongoConnect = mongoose.connect('mongodb://localhost:27017/tradingOrderBook', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log('mongodb connected')).catch(error => console.log(error));

    autoIncrement.initialize(mongoose.connection);
    require('../../app/model/token');
    require('../../app/model/trade');
    require('../../app/model/history');
    return mongoConnect;
}