
const express = require("express");
var router = express.Router();

const admin_controller = require("../controllers/frontAdmin");

//设置响应头
const setresponseHeader  = (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");//设置跨越 白名单
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

router.use(setresponseHeader);
router.post("/signup",admin_controller.signup);
router.post("/signin",admin_controller.signin);
module.exports = router;