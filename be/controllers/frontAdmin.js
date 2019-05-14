const admin_module = require("../models/frontAdmin");
const { handleData } = require("../util");//处理返回数据的
const jwt = require("jsonwebtoken");//处理token的
const signup = async (req,res,next)=>{
    //对用户注册之前应该先判断用户名是否已存在
    console.log(req.body,"penegjie")
    let _isExit = await admin_module.judgeUser(req.body.mobile);
    if(!_isExit.length){//如果用户不存在，就执行下面的动作;注意的是返回的是一个数组
        let _result = await admin_module.signup(req.body);
        handleData(_result,res,"admin");
    }else{
        res.render("admin",{
            code:201,
            data:JSON.stringify("用户名已存在")
        })
    }
}

const signin = async (req,res,next)=>{
    //登录模块,也应该先判断有没有该用户
    let _isExit = await admin_module.judgeUser(req.body.mobile);
    if(_isExit.length>0){//，再判断密码与数据库的密码是否一样
        let _result = await admin_module.signin((req.body.password),_isExit[0]);

        if(_result){
            // 登录成功后，保存session,使用的是一个中间件1. 用来验证 2. 存储一些用户信息做其他判断
            // req.session.userinfo = {
            //     useid : _isExit[0]._id,
            //     level :_isExit[0].level || 7,
            // }

            //token,在用户登录的时候生成一个token,并加密返回给前端，前端下次再请求的时候，只需带着token，后端在进行比对
            let _payload = {
                userid:_isExit[0]._id,
                level :_isExit[0].level || 7
            }
            let _cret  = "i am dhl";
            let _token = jwt.sign(_payload,_cret);
            res.render("admin",{code:200,data:JSON.stringify(_token)});
        }else{
            res.render("admin",{code:203,data:JSON.stringify("密码错误")});
        }
    }else{//如果没有该用户
        console.log(333333);
        res.render("admin",{code:202,data:JSON.stringify("用户名不存在")});
    }
}
module.exports = {
    signup,
    signin
}