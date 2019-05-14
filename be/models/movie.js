const mongoose = require('../util/mongoose')
const fs = require('fs-extra') // 文件模块
const PATH = require('path') // 路径

// 创建的Model模型 （collection）
//在本地数据库中创建一个document
var MovieModel = mongoose.model('movies', new mongoose.Schema({
    //定义集合中存储的数据名，数据格式
    movieId:Number,//电影Id
    movieName: String,//电影名称
    directorName: String,
    // {
    //     name:String,//导演名字
    //     img:String,//导演照片
    // },//导演
    starName:String,//演员名字
        // {
        //     name:String,//演员名字
        //     img:String//演员照片
        // },
    showTime: String,//上映时间
    language:String,//语言
    movieType:String,//电影类型
    createTime: String,//创建时间
    movieLogo: String,//电影图片
    isShowing:Boolean,//正在上映
    price:String,//电影票价
    score:Number,//电影评分
    region:String,//电影区域

}));

// 返回列表数据
const list = async ({ pageNo = 1, pageSize = 5, search = '' }) => {
    let re = new RegExp(search, 'i')
    let _query = search ?  { movieName: re } : {}// 查询的约定条件
    // console.log(_query, 111)
    // limit // 取几条
    // skip // 从哪里开始
    let _all_items = await listall(_query)


    return MovieModel.find(_query)
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
    return MovieModel.find(_query).sort({createTime:-1})
        then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })
}

//默认lolo
let default_logo = '/uploads/movielogos/default.jpg'
//保存新增数据
const save = (body) => {
    //此时的时间，事件戳
    let _timestamp = Date.now()

    body.movieLogo =  body.movieLogo  || default_logo
    return new MovieModel({
        ...body,
        createTime: _timestamp
    })
        .save() //保存数据带数据库
        .then((result) => {
            // console.log(result,"pjhdl")
            return result
        })
        .catch((err) => {
            // console.log(err,"pajsa")
            return false
        })
}

// 返回一个数据
const listone = ({ id }) => {
    return MovieModel.findById(id).
        then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })

}

//更新一个数据
const update =async (body)=>{
    if ( !body.movieLogo ) delete body.movieLogo

    if (body.republish) {
        let _timestamp =  Date.now()
        body.createTime = _timestamp
    }
    //更新后把原来的图片先删掉
    let {id} = body  
    let _row = await listone({id})
    fs.removeSync(PATH.resolve(__dirname,'../public'+_row.movieLogo))

    return MovieModel.updateOne({ _id: body.id }, { ...body }).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}   

//删除一条数据
const remove = async ({ id })=>{
    let _row = await listone({ id })    //用listone从数据库中获得一条数据的信息
    return MovieModel.deleteOne({ _id:id }).then((results)=>{
        results.removeId = id   //这个id是返回给前端用的
        if (_row.movieLogo != default_logo) {
            fs.removeSync(PATH.resolve(__dirname,'../public'+_row.movieLogo))    
        }
        return results
    }).catch((err)=>{
        return false
    })
}

module.exports = {
    list,
    listall,
    save,
    listone,
    update,
    remove
}