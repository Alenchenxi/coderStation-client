import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader';
import IssueItem from '../../components/IssueItem';
import BookItem from '../../components/BookItem';
import { getIssueByPage } from '../../api/issue'
import { fetchAllTypes } from '../../redux/typeSlice'
import { fetchBooksByPage } from '../../api/book'
import { useDispatch, useSelector } from 'react-redux';
import AddIssueBtn from '../../components/AddIssueBtn';
import PointsRankBoard from '../../components/PointsRankBoard';
import CommandContent from '../../components/CommandContent';
import { Pagination } from 'antd'

export default function SearchPage() {
    const { state } = useLocation();
    const { searchKey, select } = state;
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 3,
    })
    // 这样做可以解决每次重新渲染后都会再次创建该常量，但是这个常量为useEffect中的依赖项，所以将他设置为状态来存储
    const [distinguishSelect, setDistinguishSelect] = useState({
        issue: {
            extraParams: {
                issueStatus: true,
                issueTitle: searchKey
            },
            SearchItem: IssueItem,
            searchApi: getIssueByPage
        },
        book: {
            extraParams: {
                bookStatus: true,
                bookTitle: searchKey
            },
            SearchItem: BookItem,
            searchApi: fetchBooksByPage
        }
    })
    const { SearchItem, searchApi, extraParams } = distinguishSelect[select];
    const dispatch = useDispatch();
    const { types } = useSelector(state => state.type)
    const [count, setCount] = useState(0);//总数据量
    const TagColors = ['rgb(237, 74, 74)', 'red', 'orange', 'gold', 'green', 'blue', 'cyan', 'geekblue', 'purple', '#f50', '#87d068', '#008c8c', '#d4e58d'];//标签颜色数组
    const [searchList, setSearchList] = useState([]);//搜索列表项

    useEffect(() => {
        setDistinguishSelect({
            issue: {
                extraParams: {
                    issueStatus: true,
                    issueTitle: searchKey
                },
                SearchItem: IssueItem,
                searchApi: getIssueByPage
            },
            book: {
                extraParams: {
                    bookStatus: true,
                    bookTitle: searchKey
                },
                SearchItem: BookItem,
                searchApi: fetchBooksByPage
            }
        })
    }, [searchKey])

    useEffect(() => {
        setPageInfo({
            current: 1,
            pageSize: pageInfo.pageSize
        })
        setSearchList([]);
    }, [searchKey, select, pageInfo.pageSize])

    // 首次加载需要做的事
    useEffect(() => {
        // 获取所有分类属性
        if (!types.length) {
            dispatch(fetchAllTypes())
        }
    }, [dispatch, types.length])

    useEffect(() => {
        async function getSearchList() {
            const { current, pageSize } = pageInfo;
            const params = {
                current,
                pageSize,
                ...extraParams
            }
            const { data } = await searchApi(params)
            setSearchList(data.data);
            setCount(data.count);
        }
        getSearchList();
    }, [searchKey, select, pageInfo, searchApi, extraParams])



    function handlePageChange(newPage) {
        setPageInfo({
            ...pageInfo,
            current: newPage
        })
    }
    let searchListDoms = null;
    if (searchList.length > 0) {
        if ((select === 'issue' && Object.keys(searchList[0]).includes('issueTitle')) || (select === 'book' && Object.keys(searchList[0]).includes('bookTitle')))
            searchListDoms = searchList.map(item => <SearchItem key={item._id} info={item} colors={TagColors} />)
    }
    return (
        <div>
            <PageHeader
                title='搜索结果'
            />
            <div className={styles.container}>
                <div className={styles.left}>
                    {searchListDoms}
                    {searchList.length > 0 ? <div
                        className={styles.pagination}
                    >
                        <Pagination
                            current={pageInfo.current}
                            total={count}
                            showQuickJumper
                            pageSize={pageInfo.pageSize}
                            onChange={handlePageChange}
                        />
                    </div> : <h1 className={styles.notFond}>未搜索到符合条件的条目</h1>}
                </div>
                <div className={styles.right}>
                    <AddIssueBtn />
                    <CommandContent />
                    <PointsRankBoard />
                </div>
            </div>
        </div>
    )
}
