import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Popover, Avatar, List, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin, setUserInfo, setAutoLogin } from '../../redux/userSlice'

// 根据是否登录来展示不同的组件
export default function LoginChange(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleClick({ target: { innerText } }) {
        if (innerText === '个人中心') {
            navigate('/personal')
        }
        else {
            // 退出登录
            dispatch(setLogin(false));
            dispatch(setUserInfo({}));
            dispatch(setAutoLogin(false));//退出登录后下次不能自动登录
            localStorage.removeItem('userToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('isLogin');
            localStorage.removeItem('autoLogin');
            navigate('/')
        }
    }
    const { isLogin, userInfo } = useSelector(state => state.user);
    const content = (<List
        onClick={handleClick}
    >
        <List.Item
            style={{
                cursor: 'pointer'
            }}

        >个人中心</List.Item>
        <List.Item
            style={{
                cursor: 'pointer'
            }}
        >退出登录</List.Item>
    </List>)
    let element = null;
    if (isLogin) {
        element = (<Popover
            content={content}
            className='popover'
        >
            <Avatar
                src={<Image
                    src={userInfo?.avatar}
                    preview={false} //禁止预览
                />}
                size='small'
                shape='circle'
                icon={<UserOutlined />}
            />
        </Popover>)
    }
    else {
        element = (<Button
            type='primary'
            className='loginBtn'
            onClick={props.handleLoginClick}
        >注册/登录</Button>)
    }

    return (
        <div>
            {element}
        </div>
    )
}
