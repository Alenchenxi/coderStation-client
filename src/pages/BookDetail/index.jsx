import React, { useState } from 'react'
import styles from './index.module.less'
import { Image, message, Modal } from 'antd'
import PageHeader from '../../components/PageHeader'
import Discuss from '../../components/Discuss'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserInfoAsync } from '../../redux/userSlice'

export default function BookDetail() {
    const { bookInfo } = useLocation().state;
    const { userInfo } = useSelector(state => state.user);//获取用户信息
    const [modalOpen, setModalOpen] = useState(false);//是否显示对话框
    const [confirmLoading, setConfirmLoading] = useState(false);//是否点击了确认下载书籍按钮
    const dispatch = useDispatch();
    const newA = makeLink();//新的可以用来跳转的链接
    const userId = localStorage.getItem('userId');

    function handleLinkClick(e) {
        e.preventDefault();
        setModalOpen(true);//打开对话框
    }

    // 确认下载的回调
    async function handleModalOk() {
        setConfirmLoading(true);
        if (bookInfo.requirePoints > userInfo.points) {
            message.warning('您的积分不足，可以通过评论获取积分');
            setConfirmLoading(false);
        }
        else {
            dispatch(updateUserInfoAsync({
                id: userInfo._id,
                newInfo: {
                    points: userInfo.points - bookInfo.requirePoints
                }
            }))
            setConfirmLoading(false);
            newA.click();//新开下载页面
        }
        setModalOpen(false);
    }

    // 关闭对话框的回调
    function handleModalClose() {
        setModalOpen(false);
    }

    // 获取新的a元素用于跳转
    function makeLink() {
        const a = document.createElement('a');
        a.href = bookInfo.downloadLink;
        a.target = '_blank';
        return a
    }
    return (
        <div>
            <PageHeader
                title='书籍详情'
            />
            <div className={styles.detailContainer}>
                <div className={styles.left}>
                    <div className={styles.img}>
                        <Image
                            src={bookInfo.bookPic}
                        />
                    </div>
                    <div className={styles.content}>
                        <div>
                            <span>下载所需积分：<em
                                style={{
                                    color: 'red',
                                    fontSize: '1.3em',
                                    marginRight: 5
                                }}
                            >{bookInfo.requirePoints}</em>分</span>
                        </div>
                        {
                            userId &&
                            <a
                                href="/"
                                target="_blank"
                                rel=" noreferrer"
                                onClick={handleLinkClick}
                            >百度云下载地址</a>
                        }
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>{bookInfo.bookTitle}</div>
                    <div dangerouslySetInnerHTML={{ __html: bookInfo.bookIntro }}></div>
                </div>
            </div>
            <div className={styles.discuss}>
                <Discuss commentType={2} bookInfo={bookInfo} />
            </div>
            <Modal
                confirmLoading={confirmLoading}
                title='下载提示'
                open={modalOpen}
                onCancel={handleModalClose}
                onOk={handleModalOk}
            >
                <div>
                    <span>是否使用<em
                        style={{
                            color: 'red',
                            fontSize: '1.3em',
                            margin: '0 5px'
                        }}
                    >{bookInfo.requirePoints}</em>积分下载此书籍?</span>
                </div>
            </Modal>
        </div>
    )
}
