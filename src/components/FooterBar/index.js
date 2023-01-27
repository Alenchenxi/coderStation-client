import React from 'react'
import './index.less'

export default function index() {
    return (
        <footer className="foot-container">
            <div className="foot-link-container">
                <span>友情链接：</span>
                <a href="https://duyi.ke.qq.com/" target="_blank" rel="noreferrer">渡一教育-腾讯课堂</a>
                <a href="http://www.yuanjin.tech/" target="_blank" rel="noreferrer">袁进的博客</a>
                <a href="http://yanhongzhi.com/" target="_blank" rel="noreferrer">Mr.Yan</a>
                <a href="https://blog.csdn.net/jackfrued" target="_blank" rel="noreferrer">骆昊的技术专栏</a>
            </div>
            <div>
                <span>© 2022 - Coder Station</span>
            </div>
            <div>
                <span>Powered by Create React App</span>
            </div>
        </footer>
    )
}
