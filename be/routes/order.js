var express = require('express');
var router = express.Router();//express自带的路由工具
// var fileUpload = require('../middlewares/fileUpload')
var movie_fileUpload = require('../middlewares/movie_fileUpload')
var order_controller = require('../controllers/order')

//在发送路由请求的时候设置响应头
const resApplicationJson = (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");//设置跨越 白名单
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.set('content-type', 'application/json; charset=utf8')
    next()
}


//为movie中的所有路由都使用这个中间件
router.use(resApplicationJson)

/* GET home page. */
router.get('/listall', order_controller.listall)
router.get('/list', order_controller.list)


module.exports = router; 
