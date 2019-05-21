
//提供列表数据
const list = (page) => {
    return $.ajax({
        url: '/api/v1/order/list', 
        data:page,
        success:(results) => {
            // console.log(results)
           return results
        }
    })
}
// remove
const remove = (data)=>{
    return $.ajax({
        url:'/api/v1/seat/remove',
        data,
        type:'delete',
        success:(results)=>{
            // console.log(results,"results")
            return results
        }
    })
}
export default {
    list,
    remove
}
