const mongoose = require('../util/mongoose')

var SeatModel = mongoose.model('seat',new mongoose.Schema({
    movieId:String,//电影Id
    userId:String,//用户Id
    position:[String],//座位集合
    movieName:String,
    pic:String,
    showId:String,
    price:String,
    beginTime:String,//开始时间
    Day:String,//日期
    cinemaName:String
}))

const add =async (body) => {
    //此时的时间，事件戳
    let _timestamp = Date.now()
    // console.log(body,"hdia")
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

const findSelected = async({showId})=>{//返回当前座位数据信息
    // console.log(id,"idd")
    return SeatModel.find({showId:showId}).
    then((results) => {     //返回数据库的数据
        // console.log(results,"kdsdh")
        return results
    }).
    catch((err) => {
        console.log(err,"err")
        return false
    })
}



const findOrder = async({userId})=>{//订单接口数据获取，根据用户名
    // console.log(id,"idd")
    return SeatModel.find({userId:userId}).
    then((results) => {     //返回数据库的数据
        // console.log(results,"kdsdh")
        return results
    }).
    catch((err) => {
        console.log(err,"err")
        return false
    })
}

//删除一条数据
const remove = async ({ _id })=>{
    return SeatModel.deleteOne({ _id:_id }).then((results)=>{
        results.removeId = _id   //这个id是返回给前端用的
        return results
    }).catch((err)=>{
        return false
    })
}
module.exports={
    add,
    update,
    findSelected,
    findOrder,
    remove
}