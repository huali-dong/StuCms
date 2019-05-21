
const express = require("express");
var router = express.Router();

const frontProfile_controller = require("../controllers/frontProfile");

//在发送路由请求的时候设置响应头
const resApplicationJson = (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");//设置跨越 白名单
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

router.use(resApplicationJson);
router.get("/list",frontProfile_controller.list);
router.post('/update',frontProfile_controller.update);
router.get('/listone', frontProfile_controller.listone)
module.exports = router;