
//提供列表数据
const list = (page) => {
    return $.ajax({
        url: '/api/v1/frontProfile/list', 
        data:page,
        success:(results) => {
           return results
        }
    })
}



const update = (id,pwd)=>{
    return $.ajax({
        url:'/api/v1/frontProfile/update',
        data:{
            id,
            pwd
        },
        type:'post',
        success:(results)=>{
            return results
        }
    })
}


export default {
    list,
    update
}
