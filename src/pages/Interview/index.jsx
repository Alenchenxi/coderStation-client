import React, { useEffect, useState } from 'react'
import { Tree, Spin } from 'antd'
import styles from './index.module.less'
import { fetchInterviewById } from '../../api/interview'
import { useSelector, useDispatch } from 'react-redux'
import { getAllInterviewsTitle } from '../../redux/interviewSlice'
import PageHeader from '../../components/PageHeader'
import BackTop from '../../components/BackTop'

export default function Interview() {
  const { interviewTitleList } = useSelector(state => state.interview);
  const dispatch = useDispatch();
  const [spining, setSpining] = useState(false);//是否正在加载面试题
  const [interviewInfo, setInterviewInfo] = useState({});//单个面试题对象
  useEffect(() => {
    if (!interviewTitleList.length) {
      dispatch(getAllInterviewsTitle());
    }
  }, [interviewTitleList.length, dispatch])
  const interviewTitles = ['HTML', 'CSS', 'JS', 'jQuery', 'Vue', 'React', '前段工程化', 'Node.js', 'Go', 'Java', 'PHP', 'Python', '数据库'];//所有的面试题分类的标题，后面根据interviewList的下标获取对应的标题
  const treeData = interviewTitleList.map((interviewInfo, index) => {
    const childArr = interviewInfo.map((child, childInd) => ({
      key: `${index}-${childInd}`,
      title: child.interviewTitle,
      value: child._id
    }))
    return {
      key: index,
      title: interviewTitles[index],
      children: childArr
    }
  })
  let interviewContent = <div
    style={{
      marginTop: -200
    }}
  >
    <h1
      style={{
        fontSize: '3em',
        textAlign: 'center',
        fontWeight: 300
      }}
    >请在左侧选择面试题</h1>
  </div>;
  if (Object.keys(interviewInfo).length) {
    interviewContent = <Spin
      spinning={spining}
      tip='正在加载面试题'
      size='large'
    >
      <div className={styles.content}>
        <div className={styles.title}>
          {interviewInfo.interviewTitle}
        </div>
        <div className={styles.html}>
          <div dangerouslySetInnerHTML={{ __html: interviewInfo.interviewContent }}></div>
        </div>
      </div>
    </Spin>
  }

  async function handleSelect(selectedKeys, { node: { value } }) {
    // value获取的是对应的面试题id
    if (!value) {
      return //点击的面试题的分类而不是具体的面试题标题
    }
    setSpining(true);
    const { data } = await fetchInterviewById(value);
    if (!console.log(document.documentElement.style["0"]) || document.documentElement.style["0"] === 'scroll-behavior') {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
    document.documentElement.scrollTop = 0;
    setInterviewInfo(data);
    setSpining(false);
  }

  return (
    <div>
      <PageHeader
        title='面试题大全'
      />
      <div className={styles.container}>
        <div className={styles.left}>
          <Tree
            rootClassName={styles.rootTree}
            onSelect={handleSelect}
            treeData={treeData}
          />
        </div>
        <div className={styles.right}>
          {interviewContent}
        </div>
      </div>
      <BackTop
        className={styles.backTop}
      />
    </div>
  )
}
