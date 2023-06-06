import React from 'react'
import styles from './index.module.less'
import { Carousel } from 'antd'
import CardAntd from '../CardAntd'
import CommandItem from './CommandItem'

/**
 * 推荐内容模块
 */
export default function CommandContent() {

    const CommandItems = new Array(4).fill(0).map((i, ind) => {
        const num = ind + 1;
        let to = '';
        let title = '';
        switch (num) {
            case 1:
                title = '利用思否猫素材实现一个丝滑的轮播图（html + css + js）';
                to = 'https://segmentfault.com/a/1190000042661646';
                break;
            case 2:
                title = '「🌟技术探索🌟」借助 CI / CD 实现前端应用的快速回滚';
                to = 'https://segmentfault.com/a/1190000042531062';
                break;
            case 3:
                title = '面试说：聊聊JavaScript中的数据类型';
                to = 'https://segmentfault.com/a/1190000042539876';
                break;
            default:
                title = '单标签实现复杂的棋盘布局 ';
                to = 'https://segmentfault.com/a/1190000042513947';
        }
        return <CommandItem
            key={ind}
            title={title}
            num={num}
            to={to}
    />
    })
  return (
      <CardAntd
          className={styles.container}
          title={<div className={styles.title}>推荐内容</div>}

      >
          <Carousel
                  autoplay
                  className={styles.carousel}
              >
              <div>
                  <a
                  className={styles.carouselItem}
                  href="https://segmentfault.com/a/1190000042203704?utm_source=sf-homepage-headline"
                  target="_blank"
                  rel="noreferrer"
                      >
                    <img
                    src="https://image-static.segmentfault.com/583/489/583489293-62e22caab8392"
                    alt=""
                    className={styles.carouselImg}
                    />
                 </a>
              </div>
              <div>
                  <a
                  className={styles.carouselItem}
                  href="https://chinaevent.microsoft.com/Events/details/0decfcda-1959-4098-891d-690825a58f9e/?channel_id%3d50%26channel_name%3dPaid-SF"
                  target="_blank"
                  rel="noreferrer"
                      >
                    <img
                    src="https://image-static.segmentfault.com/248/470/2484709773-635632347923b"
                     alt=""
                     className={styles.carouselImg}
                     />
                 </a>
              </div>
              <div>
                  <a
                  className={styles.carouselItem}
                  href="https://segmentfault.com/a/1190000042666738?utm_source=sf-homepage-headline"
                  target="_blank"
                  rel="noreferrer"
                      >
                    <img
                    src="https://image-static.segmentfault.com/364/971/3649718341-6355fab16df40"
                     alt=""
                     className={styles.carouselImg}
                     />
                 </a>
              </div>
              <div>
                  <a
                  className={styles.carouselItem}
                  href="https://segmentfault.com/reco/1640000042672710?utm_source=sf-homepage-headline"
                  target="_blank"
                  rel="noreferrer"
                      >
                    <img
                    src="https://image-static.segmentfault.com/422/352/422352298-6355600c6676b"
                    alt=""
                    className={styles.carouselImg}
                    />
                 </a>
              </div>
          </Carousel>
          {/* 具体的推荐内容容器 */}
          <div className={styles.commandItemContainer}>
            {CommandItems}
          </div>
    </CardAntd>
  )
}
