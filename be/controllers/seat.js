const { handleData } = require('../util')
const seat_model = require('../models/seat')

// 添加
const add = async (req, res) => {
    console.log(req.body,"快点接受罚款")
    let _data = await seat_model.add(req.body)         //post用req.body
    // console.log(_data)
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
module.exports={
    add,
    update,
    findSelected,
    findOrder,
    remove
}