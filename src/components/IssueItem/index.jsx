import React, { useEffect, useState } from 'react'
import { Tag } from 'antd'
import styles from './index.module.less'
import { useSelector } from 'react-redux'
import { findUserById } from '../../api/user'
import { formatDate } from '../../utils/tools'
import { useNavigate } from 'react-router-dom'

export default function IssueItem({ info, colors }) {
    const [nickName, setNickName] = useState('')
    const navigate = useNavigate();//路由跳转
    useEffect(() => {
        async function getNickName() {
            const { data } = await findUserById(info.userId);
            setNickName(data?.nickname);
        }
        getNickName();
    }, [info.userId])

    const types = useSelector(state => state.type.types);
    const type = types.find(type => type._id === info.typeId)
    return (
        <div className={styles['issue-item-container']}>
            <div className={styles.numContainer}>
                <div
                    className={styles.num}
                >{info.commentNumber}</div>
                <div
                    className={styles.txt}
                >回答</div>
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
                <div
                    className={styles.top}
                    onClick={() => navigate(`/issues/${info._id}`)}
                >
                    {info.issueTitle}
                </div>
                <div className={styles.bottom}>
                    {/* 标签 */}
                    <Tag
                        color={colors[types.indexOf(type)]}
                        className={styles.left}
                    >{type?.typeName}</Tag>
                    <div className={styles.right}>
                        {/* 用户昵称 */}
                        {nickName ? <Tag
                            color='volcano'
                            className={styles.tagNick}
                        >{nickName}</Tag> : <Tag color='error'>该用户已被删除</Tag>}
                        {/* 发表日期 */}
                        <span className={styles.formateDate}>
                            {formatDate(info.issueDate, 'year')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
