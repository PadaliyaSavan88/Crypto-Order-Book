var trade = require('../controllers/trade')
var express = require('express');
var router = express.Router();

router.get('/trade/getTrade', trade.getTrade)
router.post('/trade/createTrade', trade.createTrade)
router.post('/trade/editTrade', trade.editTrade)
router.post('/trade/exitTrade', trade.exitTrade)
router.get('/history/getHistory', trade.getHistory)

module.exports = router;