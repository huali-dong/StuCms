
const mongoose = require("mongoose");//引入mongoose
const SeatModel = mongoose.model("seat");//链接数据库中的表

// 返回列表数据
const list = async ({ pageNo = 1, pageSize = 5, search = '' }) => {
    let re = new RegExp(search, 'i')
    let _query = search ?  { userId: re } : {}// 查询的约定条件
    // console.log(_query, 111)
    // limit // 取几条
    // skip // 从哪里开始
    let _all_items = await listall(_query)

    
    return SeatModel.find(_query)
    .sort({createTime: -1})
    .skip((pageNo - 1) * pageSize)// 从哪一页开始
    .limit(~~pageSize)// 截取多少
    .then((results) => {
        // console.log(results,"dhd")
        return { 
            items: results, 
            pageInfo: { // 页码信息
                pageNo, // 当前页
                pageSize, // 一页数量
                total: _all_items.length, // 总数
                totalPage: Math.ceil(_all_items.length / pageSize) // 总页数
            }
        }
    }).catch((err) => {
        return false
    })
}


// 返回列表所有数据
const listall = (query) => {
    //_query，查找数据的规则，eg：年龄大于10……，为空则全部返回
    let _query= query || {}
    //Model.fin()查询数据库
    //mongodb的方法：sort({createTime:-1})数据倒序返回
    return SeatModel.find(_query).sort({createTime:-1})
        then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })
}


module.exports = {
    list
}