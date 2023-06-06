import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Button } from 'antd'
import { throttle } from '../../utils/tools'

export default function BackTop({ className }) {
    const [hasStyle, setHasStyle] = useState(false);//是否添加了平滑滚动的css样式
    const [show, setShow] = useState(false);//是否显示该组件
    const scrollDom = document.documentElement;
    const maxHeight = scrollDom.scrollHeight

    function handleScroll() {
        if (maxHeight - scrollDom.scrollTop < 200) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }
    const scrollFunc = throttle(handleScroll, 300);

    useEffect(() => {
        window.addEventListener('scroll', scrollFunc)
        /* eslint-disable */
    }, [])

    function hadleClick() {
        if (!hasStyle) {
            scrollDom.style.scrollBehavior = 'smooth'
        }
        scrollDom.scrollTop = 0;
        setHasStyle(true);
    }



    return (
        <>
            {show ? <div className={[styles.container, className].join(' ')}>
                <Button
                    shape='circle'
                    size='middle'
                    onClick={hadleClick}
                >
                    回到顶部
                </Button>
            </div> : null}
        </>
    )
}
