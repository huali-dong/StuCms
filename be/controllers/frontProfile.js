const fs = require('fs')
const { handleData } = require('../util')
const frontProfile_model = require('../models/frontProfile')


const update =async (req,res)=>{
    console.log(req.body,"试试")
    let _result = await frontProfile_model.update(req.body);
    console.log(_result,"dhldhl")
    handleData(_result,res,"frontProfile");
}

const list = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await frontProfile_model.list(req.query)
    handleData(_data, res, 'frontProfile') //'movie'是字符串模板，后端采用的是ejx模板
}



// 获取某一条数据
const listone = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await frontProfile_model.listone(req.query)     //get用req.query
    handleData(_data,res,'frontProfile')
}  
module.exports={
    update,
    list,
    listone
}