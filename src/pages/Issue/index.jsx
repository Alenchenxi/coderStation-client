import React from 'react'
import PageHeader from '../../components/PageHeader'
import Issue from '../../components/Issue'
import AddIssueBtn from '../../components/AddIssueBtn'
import CommandContent from '../../components/CommandContent'
import PointsRankBoard from '../../components/PointsRankBoard'
import styles from './index.module.less'
import TypeSelect from '../../components/TypeSelect'

export default function Issue_Page() {
  return (
    <div>
      <PageHeader title="问答列表" >
        <div className={styles.typeSelect}>
          <TypeSelect />
        </div>
      </PageHeader>
      <div className={styles.contentContainer}>
        <div className={styles.left}>
          {/* 问答列表 */}
          <Issue />
        </div>
        <div className={styles.right}>
          {/* 我要发问按钮 */}
          <AddIssueBtn />
          {/* 推荐内容 */}
          <CommandContent />
          {/* 积分排行榜 */}
          <PointsRankBoard />
        </div>
      </div>
    </div>
  )
}
