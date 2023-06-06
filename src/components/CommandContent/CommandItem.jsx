import React from 'react'
import styles from './index.module.less'

/**
 * 推荐单项
 */
export default function CommandItem(props) {
  return (
      <div
        className={styles.commandItem}
      >
          <div>{ props.num}</div>
          <a
            href={props.to}
            target='_blank'
            rel='noreferrer'
          >{props.title}</a>
    </div>
  )
}
