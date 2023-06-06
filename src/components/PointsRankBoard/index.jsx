import React,{useEffect,useState} from 'react'
import CardAntd from '../CardAntd'
import RankItem from './RankItem'
import {fetchRandOrder} from '../../api/user'
import styles from './index.module.less'

/**
 * 积分排行榜组件
 */
export default function PointsRankBoard() {

    const [rankList, setRankList] = useState([]);//积分排名前10的列表
    useEffect(() => {
        // 获取积分排行
        async function getRankOrder(){
            const {data} = await fetchRandOrder();
            setRankList(data);
        }
        getRankOrder();
    },[])

  return (
      <CardAntd
          className={styles.pointsRankBoard}
        title={<div style={{fontWeight:400}}>积分排行榜</div>}
      >
          {rankList.map((rankInfo,index) => <RankItem
              key={rankInfo._id}
              point={rankInfo.points}
              nickName={rankInfo.nickname}
              order={index + 1}
              avatar={rankInfo.avatar}
          />)}
    </CardAntd>
  )
}
