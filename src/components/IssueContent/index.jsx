import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Avatar } from 'antd'
import { findUserById } from '../../api/user'
import { formatDate } from '../../utils/tools'
import Discuss from '../Discuss'

/**
 * 问答详情组件
 */
export default function Comment(props) {
  const [userInfo, setUserInfo] = useState({});
  async function getUserInfoById(id) {
    if (!id) {
      return
    }
    const { data } = await findUserById(id);
    setUserInfo(data);
  }
  useEffect(() => {
    getUserInfoById(props?.userId);
  }, [props.userId])


  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>
        {/* 标题 */}
        <h1 className={styles.title}>{props?.issueTitle}</h1>
        {/* 发布人的信息 */}
        <div className={styles.userDetail}>
          {/* 头像 */}
          <Avatar
            src={userInfo?.avatar}
            size='small'
          />
          {/* 昵称 */}
          <div className={styles.nick}>
            {userInfo?.nickname}
          </div>
          {/* 发布时间 */}
          <div className={styles.publishTime}>
            发布于：{formatDate(props?.issueDate)}
          </div>
        </div>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: props?.issueContent }}></div>
        </div>
        {/* 评论组件 */}
      </div>
      <Discuss commentType={1} issueInfo={props} />
    </div>

  )
}
