var mongoose = require('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var history = new schema({
    unique_id: {type: Number},
    token: {type: String },
    quantity: { type: Number },
    price: { type: Number },
    type: { type: Number }, // 1: Sell, 2: Buy
    exicuted: { type: Boolean },
    order_unique_id: {type: Number}
}, {
    strict: true,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

history.plugin(autoIncrement.plugin, {model: 'history', field: 'unique_id', startAt: 1, incrementBy: 1});
module.exports = mongoose.model('history', history);