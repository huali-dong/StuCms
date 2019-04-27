
import URL from 'url'

const pageHeaderInfo = (url, prevUrl) => {
    let _urlinfo = URL.parse(url)
    let _pathname = _urlinfo.pathname
    
    let _search = URL.parse(prevUrl).search || "";
    let _infos = {
        '/home': {
            title: '首页',
            list: []
        },
        '/movie-list': {
            title: '电影管理',
            description: '电影列表',
            list: [
                { text: '电影列表' }
            ]
        },
        '/movie-save': {
            title: '电影管理',
            description: '添加电影',
            list: [
                { text: '电影列表', path: '#/movie-list'+_search },
                { text: '添加电影'}
            ]
        },
        '/movie-update': {
            title: '电影管理',
            description: '电影更新',
            list: [
                { text: '电影列表', path: '#/movie-list'+_search },
                { text: '电影更新'}
            ]
        },
        '/movie-lead': {
            title: '电影管理',
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
        }
        
    }
    return _infos[_pathname] || {  }
}


export default {
    pageHeaderInfo
}