const fs = require('fs')
// const Alipay = require('alipay-mobile')
// import Alipay from "alipay-mobile"
// var Alipay = require("alipay-nodejs")
// const AlipaySdk = require('alipay-sdk');

// const path = require("path")
const { handleData } = require('../util')
const seat_model = require('../models/seat')
// const read = filename => {
//     return fs.readFileSync(path.resolve(__dirname, filename))
//   }

 

// 添加
const add = async (req, res) => {
    let _data = await seat_model.add(req.body)         //post用req.body
    // console.log(_data)

      //notify_url: 异步通知url
      //app_id: 开放平台 appid
      //appPrivKeyFile: 你的应用私钥
      //alipayPubKeyFile: 蚂蚁金服公钥
      
    // const alipaySdk = new AlipaySdk({
    //     app_id: '2016092900626140',
    //     appPrivKeyFile: read('./private_key.txt'),
    //     alipayPubKeyFile: read('./alipay_public_key.txt'),
    //     return_url:"http://localhost:3000/api/v1/seat/listone"
    // });
    //   const options = {
    //       app_id: '2016092900626140',
    //       appPrivKeyFile: read('./private_key.txt'),
    //       alipayPubKeyFile: read('./alipay_public_key.txt'),
    //       gatewayUrl:""
    //     }
    // const data = {
    //     subject: '辣条',
    //     out_trade_no: '1232423',
    //     total_amount: '100'
    // }
    // // const result = pay.buildSignOrderParam(data)
    //     // TypeScript
    // try {
    //     const result = await alipaySdk.exec('alipay.trade.app.pay', {
    //         subject: '辣条',
    //         out_trade_no: '1232423',
    //         total_amount: '100'
    //     }, options);
    
    //     console.log(result);
    // } catch (err) {
    //     console.log(err)
    // }
    
    // console.log(result,"result")
    handleData(_data,res,'seat')    
}
const update=  async(req,res)=>{
    let _data=await seat_model.update(req.body)
    handleData(_data,res,'seat')
}

//查找一个电影对应的座位情况
const findSelected = async(req,res)=>{
    // console.log(req.query,'djlsjskds')
    // console.log(req.body,"idhds")
    let _data = await seat_model.findSelected(req.body)     //get用req.query
    handleData(_data,res,'seat')   
}

//查找一个用户对应的买票情况
const findOrder = async(req,res)=>{
    // console.log(req.query,'djlsjskds')
    // console.log(req.body,"idhds")
    let _data = await seat_model.findOrder(req.body)     //get用req.query
    handleData(_data,res,'seat')   
}

//删除一条数据
const remove = async (req,res)=>{
    console.log(req.body)
    let _data = await seat_model.remove(req.body)
    handleData(_data,res,'seat')
}
// 获取某一条数据
const listone = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await seat_model.listone(req.query)     //get用req.query
    handleData(_data,res,'seat')
}  
module.exports={
    add,
    update,
    findSelected,
    findOrder,
    remove,
    listone
}