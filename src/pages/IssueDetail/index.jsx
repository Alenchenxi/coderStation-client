import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import PageHeader from '../../components/PageHeader'
import IssueContent from '../../components/IssueContent'
import { useParams } from 'react-router-dom'
import { searchIssueById } from '../../api/issue'
import PointsRankBoard from '../../components/PointsRankBoard'
import CommandContent from '../../components/CommandContent'

export default function IssueDetail() {
  const [issueInfo, setIssueInfo] = useState({})
  const { id } = useParams()
  useEffect(() => {
    async function getIssueInfo() {
      const { data } = await searchIssueById(id);
      setIssueInfo(data);
    }
    getIssueInfo()
  }, [id])

  return (
    <div>
      <PageHeader
        title='问答详情'
      />
      <div className={styles.innerContainer}>
        <div className={styles.left}>
          <IssueContent {...issueInfo} />
        </div>
        <div className={styles.right}>
          <div className={styles.command}>
            <CommandContent />
          </div>
          <PointsRankBoard />
        </div>
      </div>
    </div>
  )
}
