
import URL from 'url'

const pageHeaderInfo = (url, prevUrl) => {
    let _urlinfo = URL.parse(url)
    let _pathname = _urlinfo.pathname
    
    let _search = URL.parse(prevUrl).search || "";
    let _infos = {
        // '/home': {
        //     title: '首页',
        //     list: []
        // },
        '/movie-list': {
            title: '影片信息',
            description: '影片列表',
            list: [
                { text: '影片列表' }
            ]
        },
        '/movie-save': {
            title: '影片信息',
            description: '添加影片',
            list: [
                { text: '影片列表', path: '#/movie-list'+_search },
                { text: '添加影片'}
            ]
        },
        '/movie-update': {
            title: '影片信息',
            description: '影片更新',
            list: [
                { text: '影片列表', path: '#/movie-list'+_search },
                { text: '影片更新'}
            ]
        },
        '/movie-lead': {
            title: '影片信息',
            description: '电影预览',
            list: [
                { text: '电影预览', path: '#/movie-list'+_search },
            ]
        },
        '/profile-list': {
            title: '个人管理',
            description: '个人中心',
            list: [
                { text: '个人中心', path: '#/profile-list'+_search },
            ]
        },
        '/order-list': {
            title: "订单信息",
            description: '查看订单',
            list: [
                { text: '查看订单', path: '#/order-list'+_search },
            ]
        },
        '/frontProfile-list': {
            title: "用户管理",
            description: '用户信息',
            list: [
                { text: '用户信息', path: '#/frontProfile-list'+_search },
            ]
        },
        
    }
    return _infos[_pathname] || {  }
}


export default {
    pageHeaderInfo
}