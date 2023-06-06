import React, { useState, useEffect } from 'react'
import { Avatar, Tag } from 'antd'
import { formatDate } from '../../utils/tools'
import { findUserById } from '../../api/user'
import styles from './index.module.less'

export default function CommentItem(props) {
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        async function getUserInfo() {
            const { data } = await findUserById(props.userId);
            setUserInfo(data);
        }
        getUserInfo()
    }, [props.userId])

    return (
        <div className={styles.commentItemContainer}>
            {userInfo ? <div>
                <Avatar
                    src={userInfo.avatar}
                    size='middle'
                />
                <div className={styles.detail}>
                    <div
                        className={styles.time}
                    >{formatDate(props.commentDate, 'year')}</div>
                    <div dangerouslySetInnerHTML={{ __html: props.commentContent }}></div>
                </div>
            </div> : <Tag color='error'>该用户已被删除</Tag>}
        </div>
    )
}
