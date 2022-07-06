var tokens = require('../controllers/token')
var trade = require('../controllers/trade')
var express = require('express');
var router = express.Router();

router.get('/token/getTokens', tokens.getTokens)
router.post('/token/addToken', tokens.addToken)
router.put('/token/editToken', tokens.editToken)
router.delete('/token/deleteToken', tokens.deleteToken)
// router.post('token/addToken', tokens.createToken)

module.exports = router;