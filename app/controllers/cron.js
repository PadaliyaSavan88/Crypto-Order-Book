var CronJob = require('cron').CronJob;
var Trades = require('../model/trade');
var trade = require('./trade')

//cronjob to complete orders that are in queue
var job = new CronJob('*/10 * * * * *', async function() {
    let trades = await Trades.find({type: 1})
    if(trades.length > 0){
        trades.forEach(async order => {
            await trade.tradeLogic(order)
        })
    }            
});
job.start()