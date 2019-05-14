
const express = require("express");
var router = express.Router();

const user_controller = require("../controllers/frontUser");
const usreSigninAuth = require("../middlewares/userSigninAuth");
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
router.get("/isSignIn",usreSigninAuth,user_controller.isSignIn);
router.get("/info",usreSigninAuth,user_controller.info);
// router.post("/exit",user_controller.exit);
// router.post("/check",user_controller.check);

module.exports = router;