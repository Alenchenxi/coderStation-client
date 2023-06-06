import React, { useState } from 'react'
import './index.less'
import { NavLink, useNavigate } from 'react-router-dom'
import { Select, Button, Input } from 'antd'
import LoginChange from '../LoginChange'

export default function NavHeader(props) {
    const [value, setValue] = useState('issue');
    const [searchVal, setSearchVal] = useState('')
    const navigate = useNavigate();
    // select选择框改变事件
    function handleSelectChange(value) {
        setValue(value)
    }
    // input框改变事件
    function handleInputChange({ target: { value } }) {
        setSearchVal(value)
    }

    function handleSearch() {
        if (!searchVal) {
            return
        }
        setSearchVal('');//清空搜索关键字
        navigate('/searchPage', {
            state: {
                searchKey: searchVal,
                select: value,
            }
        })
    }
    return (
        <div className="navHeader-container">
            <div className="navHeader-icon"></div>
            <div className="navHeader-links">
                <NavLink to='/issues'>问答</NavLink>
                <NavLink to='/books'>书籍</NavLink>
                <NavLink to='/interview'>面试题</NavLink>
                <NavLink to='https://duyi.ke.qq.com/' target='_blank'>视频教程</NavLink>
            </div>
            <Input.Group
                compact
                className='inputContainer'
            >
                <Select
                    value={value}
                    onChange={handleSelectChange}
                    className='navHeader-search'
                    popupClassName='submenu'
                >
                    <Select.Option value="issue">问答</Select.Option>
                    <Select.Option value="book">书籍</Select.Option>
                </Select>
                <Input
                    style={{
                        width: '350px',
                    }}
                    value={searchVal}
                    onChange={handleInputChange}
                    placeholder='请输入你想搜索的内容'
                />
                <Button
                    type='primary'
                    onClick={handleSearch}
                >搜索</Button>
            </Input.Group>
            <div className='loginChange'>
                <LoginChange handleLoginClick={props.handleLoginClick} />
            </div>
        </div>
    )
}
