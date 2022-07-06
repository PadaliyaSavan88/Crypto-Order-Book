var mongoose = require('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var trade = new schema({
    unique_id: {type: Number},
    token: {type: String },
    quantity: { type: Number },
    price: { type: Number },
    type: { type: Number } // 1: Sell, 2: Buy
}, {
    strict: true,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

trade.plugin(autoIncrement.plugin, {model: 'trade', field: 'unique_id', startAt: 1, incrementBy: 1});
module.exports = mongoose.model('trade', trade);