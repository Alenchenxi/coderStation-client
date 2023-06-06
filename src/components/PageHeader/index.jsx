import React from 'react'
import styles from './index.module.less'

export default function PageHeader(props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {props.title}
      </div>
      {props.children}
    </div>
  )
}
