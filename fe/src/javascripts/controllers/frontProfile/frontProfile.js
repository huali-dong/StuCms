import { bus, handleToastByData } from '../../util'

 
import frontProfile_list_tempalte from '../../views/frontProfile/frontProfile.html' 


import frontProfile_model from '../../models/frontProfile/frontProfile'

import modal from "../../util/modal";

//list视图
const list = async(req,res,next)=>{
    req.query = req.query || {} // 防止没有参数的时候，req.query为null
    
    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo: req.query.pageNo,
        pageSize: req.query.pageSize,
        search: req.query.search
    }
    //编译模板
    let _html = template.render(frontProfile_list_tempalte, {    //art-template的template.render(模板，数据)
        data: (await frontProfile_model.list(_page)).data
    })
    res.render(_html)
    //给添加按钮，绑定事件
    bindListEvent(_page);
}

//list的事件绑定
const bindListEvent = (_page)=>{
    // $('.movie-list #addbtn').on('click',function(){
    //     //添加按钮点击跳转到添加save路由  
    //     bus.emit('go','/movie-save')
    // })

    //重置密码
    $('.frontProfile-list .profile-pos-update').on('click',async function () {
        let id = $(this).parents('tr').data('id')
        let pwd="123456"
        let res = await frontProfile_model.update(id,pwd)
        console.log(res)
        if(res.status == 200){
            modal(res,{
                success : "操作成功",
                callback :()=>{
                    bus.emit('go', '/frontProfile-list')
                }
            })
        }
    })


    //根据关键字搜索数据
    $('#possearch').on('click',async function(req,res){
        let keywords = $('#keywords').val();
        console.log(keywords)
        //上面已近配好了searc，所以只需要根据关键字跳转就可以了
        bus.emit('go', '/frontProfile-list?search='+keywords)
    })
}

export default {
    list,
    // save,
    // update
} 