import React from 'react'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd';

export default function BookItem({ info }) {
    const navigate = useNavigate();
    // 获取书籍的内容文本
    const newDesc = document.createElement('div');
    newDesc.innerHTML = info.bookIntro;
    const bookDesc = newDesc.innerText;
    function handleClick() {
        navigate(`/books/${info._id}`, {
            state: {
                bookInfo: info
            }
        })
    }
    return (
        <div className={styles['book-item-container']}>
            <div className={styles.numContainer}>
                <div
                    className={styles.num}
                >{info.commentNumber}</div>
                <div
                    className={styles.txt}
                >评论</div>
            </div>
            <div className={styles.numContainer}>
                <div
                    className={styles.num}
                >{info.scanNumber}</div>
                <div
                    className={styles.txt}
                >浏览</div>
            </div>
            <div className={styles.content}>
                <div className={styles.imgContainer}>
                    <Image
                        src={info.bookPic}
                    />
                </div>
                <div className={styles.title}
                    onClick={handleClick}
                >{info.bookTitle}</div>
                <div className={styles.desc}>
                    {bookDesc}
                </div>
            </div>
        </div>
    )
}
