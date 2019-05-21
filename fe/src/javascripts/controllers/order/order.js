import { bus, handleToastByData } from '../../util'
 
import order_list_tempalte from '../../views/order/order.html' 
import toast from "../../util/toast";
import order_model from '../../models/order/order'
import modal from "../../util/modal";
import qs from 'querystring'

// const lead =(req,res)=>{
//     res.render(order_tempalte)
// }

//list视图
const list = async(req,res,next)=>{
    req.query = req.query || {} // 防止没有参数的时候，req.query为null
    
    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo: req.query.pageNo,
        pageSize: req.query.pageSize,
        search: req.query.search
    }
    //编译模板
    let _html = template.render(order_list_tempalte, {    //art-template的template.render(模板，数据)
        data: (await order_model.list(_page)).data
    })
    // console.log(data)
    res.render(_html)
    //给添加按钮，绑定事件
    bindListEvent(_page);
}

//list的事件绑定
const bindListEvent = (_page)=>{
  

    //handleRemovemovie不是handleRemovemovie（）
    $('.pos-remove').on('click', function () {
        handleRemovemovie.bind(this,_page)()
    })

    //根据关键字搜索数据
    $('#possearch').on('click',async function(req,res){
        let keywords = $('#keywords').val();
        //上面已近配好了searc，所以只需要根据关键字跳转就可以了
        bus.emit('go', '/order-list?search='+keywords)
    })
}


//删除事件
const handleRemovemovie = async function(_page){
    let id = $(this).parents('tr').data('id')
    let day =Number(new Date( $(this).parents("tr").find('.day').data("id")));//放映时间
    let nowdate =Number(new Date());//当前时间
    if(day<nowdate){//只有当放映时间小于当前时间才能删除订单
        let _data = await order_model.remove({ _id:id })
        // console.log(_data)
    // 如果此页种只有一条数据，说明删除之后需要跳转到前一页 
        // 删除的时候此页还有多少条数据
        let trs = $('.movie-list__tabel tr[data-id]')
        // 如果只剩一个，将pageNo-1
        let _pageNo = trs.length > 1 ? _page.pageNo : (_page.pageNo - (_page.pageNo > 1 ? 1 : 0))
        
        handleToastByData(_data, {
            isReact: false,
            success: (data) => {
                // 删除成功后，i依然需要将pageNo带上，否则，删除后，重新渲染的时候会回到默认的第一页
                bus.emit('go', '/order-list?pageNo='+_pageNo+'&_='+data.removeId)
            }
        })
    }else{
    //    toast("不能删除该数据")
    let _result={
        status:200,
    }
        modal(_result,{
            success: "不能删除该数据",  
        })
    }
    
}




export default {
    list
} 