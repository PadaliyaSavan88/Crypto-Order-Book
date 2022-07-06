var mongoose = require('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var token = new schema({
    unique_id: {type: Number},
    tokenName: {type: String },
    tokenSymbol: {type: String },
}, {
    strict: true,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

token.plugin(autoIncrement.plugin, {model: 'token', field: 'unique_id', startAt: 1, incrementBy: 1});
module.exports = mongoose.model('token', token);