const mongoose = require('../util/mongoose')

var SeatModel = mongoose.model('seat',new mongoose.Schema({
    id:String,//座位Id
    row:Number,//行
    col:Number,//列
    used:Number,//是否选中  0 可用 1 被锁定  2 已售出
    movieId:String,//电影Id
}))

let default_logo = '/uploads/movielogos/default.jpg'
const add =async (body) => {
    //此时的时间，事件戳
    let _timestamp = Date.now()
    console.log(body,"hdia")
    // body.movieId=  body.movieId  || default_logo
    return new SeatModel({
        ...body,
        createTime: _timestamp
    }).save() //保存数据带数据库
        .then((result) => {
            return result
        })
        .catch((err) => {
            return false
        })
}

const update = async(body)=>{
    return SeatModel.updateOne({id:body.id},{...body})
    .then((result)=>{
        return result
    }).catch((err)=>{
        return false
    })
}
module.exports={
    add,
    update
}