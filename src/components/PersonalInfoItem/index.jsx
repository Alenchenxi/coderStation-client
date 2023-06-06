import React from 'react'
import styles from './index.module.less'

export default function PersonalInfoItem({ value, name, style }) {
    return (
        <div className={styles.container} style={style}>
            <div className={styles.name}>{name}：</div>
            <div className={styles.value}>{value}</div>
        </div>
    )
}
