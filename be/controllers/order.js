const { handleData } = require('../util')
const order_model = require('../models/order')

// list控制器
const list = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await order_model.list(req.query)
    handleData(_data, res, 'order') //'movie'是字符串模板，后端采用的是ejx模板
}

// listall控制器
const listall = async (req, res) => {
    let _data = await order_model.listall()
    handleData(_data, res, 'order') //'movie'是字符串模板，后端采用的是ejx模板
}





module.exports = {
    list,
    listall,
}