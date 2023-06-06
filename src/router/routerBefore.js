import React from 'react'
import { useSelector } from 'react-redux'
import Routes from './routeConfig'
import RouteConfig from './routeBeforeConfig'
import { useLocation } from 'react-router-dom'
import { Alert } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function RouterBefore() {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.user.isLogin);
    let [currentPath] = RouteConfig.filter(route => route.path === location.pathname)
    if (!currentPath) {
        // 在这里做进一步判断
        // 因为此项目，具体的id页不用判断是否登录，直接设置login为false即可
        currentPath = {
            login: false
        }
    }
    function closeHandle() {
        navigate('/')
    }

    if (currentPath.login && !isLogin && !localStorage.getItem('userId')) {
        return <Alert
            message="请先登录"
            type="warning"
            closable
            onClose={closeHandle}
            style={{
                borderRadius: 0
            }}
        />
    }
    else if (location.pathname === '/searchPage' && !location.state) {
        return <Alert
            message="搜索必须通过输入关键字进行搜索，不要违规搜索"
            type="warning"
            closable
            onClose={closeHandle}
            style={{
                borderRadius: 0
            }
            }
        />
    }
    return <Routes />
}
