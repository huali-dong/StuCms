const { handleData } = require('../util')
const seat_model = require('../models/seat')


// 添加
const add = async (req, res) => {
    let _data = await seat_model.add(req.body)         //post用req.body
    console.log(_data)
    handleData(_data,res,'seat')    
}
const update=  async(req,res)=>{
    let _data=await seat_model.update(req.body)
    handleData(_data,res,'seat')
}

module.exports={
    add,
    update
}