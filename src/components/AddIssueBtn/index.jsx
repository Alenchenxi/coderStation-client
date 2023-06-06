import React from 'react'
import { Button,message } from 'antd'
import styles from './index.module.less'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

/**
 * 我要发问模块
 */
export default function AddIssueBtn() {

    const { isLogin } = useSelector(state => state.user)
    const navigate = useNavigate();

    function handleClick() {
        if (isLogin) {
            // 跳转到发问页
            navigate('/addIssue');
        }
        else {
            // 提示登录
            message.warning('请先登录，才可以发问')
        }
    }

  return (
      <Button
          type='primary'
          className={styles.btn}
          onClick={handleClick}
      >
          我要发问
    </Button>
  )
}
