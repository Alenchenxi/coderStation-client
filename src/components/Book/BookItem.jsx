import React from 'react'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

export default function BookItem({ bookInfo }) {
    const navigate = useNavigate();
    function handleBookItemClick() {
        navigate(`/books/${bookInfo._id}`, {
            state: {
                bookInfo
            }
        })
    }

    return (
        <div className={styles.bookItem}
            onClick={handleBookItemClick}
        >
            <img src={bookInfo.bookPic} alt="" />
            <div className={styles.title}>{bookInfo.bookTitle}</div>
            <div className={styles.more}>
                <span>浏览数：{bookInfo.scanNumber}</span>
                <span>评论数：{bookInfo.commentNumber}</span>
            </div>
        </div>
    )
}
