import React from 'react'
import { Avatar } from 'antd'
import styles from './index.module.less'
import classnames from 'classnames'

/**
 * 单个积分item组件
 */
export default function RankItem(props) {

    const classNames = {
        'iconfont': true,
        'icon-jiangbei': true,
        [styles.order]: true,
    }
    let orderDom = <div className={styles.order}>{props.order}</div>
    switch (props.order) {
        case 1:
            orderDom = <div
                className={classnames(classNames)}
                style={{
                    color:'rgb(255, 218, 35)',
                    fontSize:'25px'
                }}
            ></div>;
            break;
        case 2:
            orderDom = <div
                className={classnames(classNames)}
                style={{
                    color:'rgb(197, 197, 197)',
                    fontSize:'25px'
                }}
            ></div>;
            break;
        case 3:
            orderDom = <div
                className={classnames(classNames)}
                style={{
                    color:'rgb(205, 154, 98)',
                    fontSize:'25px'
                }}
            ></div>;
            break;
        default:
            orderDom= <div className={styles.order}>{props.order}</div>
        }

  return (
      <div className={styles.rankItem}>
          {/* 排名 */}
          {orderDom}
          {/* 头像 */}
          <Avatar
            className={styles.avatar}
            size='small'
            src={props.avatar}
          />
          {/* 昵称 */}
          <div
            className={styles.nickname}
          >{props.nickName}</div>
            {/* 积分 */}
          <div
            className={styles.point}
          >{props.point}</div>
    </div>
  )
}
