var Trades = require('../model/trade');
var History = require('../model/history');
const trade = require('../model/trade');

exports.getTrade = (async (requestData, responseData) => {
    try {
        let trades = await Trades.find()
        if(!trades){
            return responseData.json({
                success: false,
                error: 'No Trades Found'
            })
        }
        return responseData.json({
            success: true,
            message: 'Trades Listed Successfully',
            trades
        })
    } catch (error) {
        return responseData.json({
            success: false,
            error: 'Something went wrong',
        })
    }
})

exports.createTrade = (async (requestData, responseData) => {
    try{
        let requestDataBody = requestData.body;
    
        let newTrade = new Trades({
            ...requestDataBody
        })
    
        let newTradeSave = await newTrade.save()
        if(!newTradeSave){
            return responseData.json({
                success: false,
                error: 'Trade Creation Failed'
            })
        }
        exports.tradeLogic(newTradeSave).then(result => {
            return responseData.json({
                success: true,
                successCode: 'Trade Created Successfully '
            })
        })
    } catch (error) {
        return responseData.json({
            success: false,
            error,
            error: 'Somthing Went Wrong'
        })
    }
})

exports.editTrade = (async (requestData, responseData) => {
    try {
        let requestDataBody = requestData.body;
        let editTrade = await Trades.findByIdAndUpdate(requestDataBody._id, requestDataBody)
        if(!editTrade){
            return responseData.json({
                success: false,
                error: 'Trade Updated Failed!'
            })
        }
        return responseData.json({
            success: true,
            message: 'Trade Updated Successfully'
        })
    } catch (error) {
        return responseData.json({
            success: false,
            error,
            error: 'Somthing Went Wrong'
        })
    }
})

exports.exitTrade = (async (requestData, responseData) => {
    try {
        let requestDataBody = requestData.body;
        let trade = await Trades.findByIdAndDelete(requestDataBody._id);
        if(!trade){
            return responseData.json({
                success: false,
                error: 'Trade Not Found!'
            })
        }
        executeTrade([trade[0], data], false).then(() => {
            return responseData.json({
                success: true,
                message: 'Trade Exited Successfully!'
            })
        }).catch(() => {
            return responseData.json({
                success: false,
                error: 'History not Saved'
            })
        })
    } catch (error) {
        return responseData({
            success: false,
            error,
            error: 'Somthing Went Wrong'
        })
    }
})

exports.getHistory = (async (requestData, responseData) => {
    try {
        let history = await History.find()
        if(!history){
            return responseData.json({
                success: false,
                error: 'No History Found'
            })
        }
        return responseData.json({
            success: true,
            message: 'History Listed Successfully',
            history
        })
    } catch (error) {
        return responseData.json({
            success: false,
            error: 'Something went wrong',
        })
    }
})

exports.tradeLogic = ((data) => {
    return new Promise (async (resolve, reject) => {

        //Finding remaining trades to get executed with relevent trade
        let trade = await Trades.find({token: data.token, type: {$ne: data.type}, price: Number(data.price)})
        if(trade.length > 0){

            //sorting array with max quantity
            trade.sort((a,b) => {
                return Number(a.quantity) - Number(b.quantity)
            })

            //executing order with less quantity then order in queue
            if(Number(trade[0].quantity) >= Number(data.quantity)){
                if(Number(trade[0].quantity) > Number(data.quantity)){
                    trade[0].quantity = Number(trade[0].quantity) - Number(data.quantity)
                    let tradeSave = await trade[0].save()
                    if(tradeSave){
                        trade[0].quantity = data.quantity
                        executeTrade([{order: trade[0], delete: false}, {order: data, delete: true}], true) 
                    }
                } else {
                    executeTrade([{order: trade[0], delete: true}, {order: data, delete: true}], true) 
                }
            } else {
                //excuting order with more quantity then order in queue
                data.quantity = Number(data.quantity) - Number(trade[0].quantity)
                let tradeSave = await data.save()
                if(tradeSave){
                    data.quantity = trade[0].quantity;
                    executeTrade([{order: trade[0], delete: true}, {order: data, delete: false}], true) 
                }
            }
        }
        resolve(true)
    })
})

executeTrade = ((data, executed) => {
    return new Promise (async (resolve, reject) => {
        console.log(data.length)
        data.forEach(async trade => {
            let newHistory = new History({
                token: trade.order.token,
                quantity: trade.order.quantity,
                price: trade.order.price,
                type: trade.order.type,
                exicuted: executed,
                order_unique_id: trade.unique_id
            })
            //moving order to history and deleting executed orders
            let historySaved = await newHistory.save()
            if(trade.delete){
                await Trades.findByIdAndDelete(trade.order._id)
            }
            console.log('yup')
            if(historySaved){
                resolve(true)
            } else {
                reject(false)
            }
        });
    })
})