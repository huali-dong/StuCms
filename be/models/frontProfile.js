
const mongoose = require("mongoose");
const FrontUsersModel = mongoose.model("frontUsers");
const crypto = require("crypto");
const update = (body,list)=>{
    //对新密码进行加密
     //调用node.js自带模块对密码进行加密
     let pwd = "123456";
     console.log(body.id,"123456")
     // 如下方法使用指定的算法与密码来创建cipher对象
     const cipher = crypto.createCipher('aes192', pwd);
      // 使用该对象的update方法来指定需要被加密的数据
     let crypted = cipher.update(body.pwd, 'utf-8', 'hex');
     crypted += cipher.final('hex');
     // console.log(crypted)
    return FrontUsersModel.updateOne({_id:body.id},{
        password : crypted
    })
    .then((result)=>{
        return result;
    })
    .catch(()=>{
        return false;
    })
}

const listone = async({orderNumber})=>{//订单接口数据获取，根据用户名
    // console.log(id,"idd")
    return FrontUsersModel.findOne({orderNumber:orderNumber}).
    then((results) => {     //返回数据库的数据
        // console.log(results,"kdsdh")
        return results
    }).
    catch((err) => {
        console.log(err,"err")
        return false
    })
}

// 返回列表数据
const list = async ({ pageNo = 1, pageSize = 5, search = '' }) => {
    let re = new RegExp(search, 'i')
    let _query = search ?  { movieName: re } : {}// 查询的约定条件
    // console.log(_query, 111)
    // limit // 取几条
    // skip // 从哪里开始
    let _all_items = await listall(_query)


    return FrontUsersModel.find(_query)
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
    return FrontUsersModel.find(_query).sort({createTime:-1})
        then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })
}


module.exports = {
    update,
    list,
    listone
}