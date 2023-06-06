import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { getIssueByPage } from '../../api/issue'
import IssueItem from '../IssueItem';
import { fetchAllTypes } from '../../redux/typeSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Spin, Empty } from 'antd';

export default function Issue() {

    const [issueList, setIssueList] = useState([]);//问答列表，需要进一步转换
    const { types, issueTypeId } = useSelector(state => state.type)
    const [spinning, setSpinning] = useState(false);//是否正在加载列表
    const [pageInfo, setPageInfo] = useState({
        current: 1,//当前是第几页
        pageSize: 10,//每页显示的条数
        count: 0,//总数据量
        issueStatus: true,
        totalPage: 0,//总页数
    })
    const dispatch = useDispatch();
    const TagColors = ['rgb(237, 74, 74)', 'red', 'orange', 'gold', 'green', 'blue', 'cyan', 'geekblue', 'purple', '#f50', '#87d068', '#008c8c', '#d4e58d'];//标签颜色数组

    function handlePageChange(newPage) {
        updataPageInfo(newPage);
        // 滚动到顶部
        document.documentElement.style.scrollBehavior = 'smooth'
        document.documentElement.scrollTop = 0;
    }

    // 获取新的分页数据并更新状态
    async function updataPageInfo(page) {
        const newParams = {
            ...pageInfo
        }
        if (page) {
            newParams.current = page
        }
        if (issueTypeId !== 'all') {
            newParams.typeId = issueTypeId
            newParams.current = 1
        }
        setSpinning(true);
        const { data } = await getIssueByPage(newParams);
        setPageInfo({
            ...pageInfo,
            current: data.currentPage,
            totalPage: data.totalPage,
            count: data.count
        })
        setIssueList(data.data);
        setSpinning(false)
    }

    // 首次加载需要做的事
    useEffect(() => {
        // 获取分页数据
        updataPageInfo();
        // 获取所有分类属性
        if (!types.length) {
            dispatch(fetchAllTypes())
        }
        /* eslint-disable */
    }, [])

    useEffect(() => {
        updataPageInfo();
    }, [issueTypeId])

    const issueListDoms = issueList.map(issue => <IssueItem
        key={issue._id}
        info={issue}
        colors={TagColors}
    />)

    return (
        <div className={styles['issue-container']}>
            {/* 问答列表 */}
            <div className={styles.issues}>
                {/* 该样式在index.css中有重置 */}
                <Spin
                    spinning={spinning}
                    tip='加载中......'
                    size='large'
                    className={styles['ant-spin-nested-loading']}
                >
                    {issueListDoms}
                </Spin>
            </div>
            {/* 分页 */}
            <div className={styles.paginationContainer}>
                {issueList.length > 0 ?
                    <Pagination
                        total={pageInfo.count}
                        current={pageInfo.current}
                        pageSize={pageInfo.pageSize}
                        showQuickJumper
                        onChange={handlePageChange}
                    />
                    :
                    <Empty />
                }
            </div>
        </div>
    )
}
