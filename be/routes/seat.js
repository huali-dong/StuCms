
const express = require("express");
var router = express.Router();

const seat_controller = require("../controllers/seat");

//在发送路由请求的时候设置响应头
const resApplicationJson = (req,res,next)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    res.set('Content-Type', 'application/x-www-form-urlencoded')
    res.set("Access-Control-Allow-Headers", "X-Requested-With");
    res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.set("Access-Control-Allow-Origin", "*");//设置跨越 白名单
    next();
}

router.use(resApplicationJson);
router.post("/add",seat_controller.add);
router.post('/update',seat_controller.update)
module.exports = router;