import React, { useState, useEffect } from 'react'
import { fetchBooksByPage } from '../../api/book'
import styles from './index.module.less'
import BookItem from './BookItem'
import { Spin, Pagination, Empty } from 'antd'
import { useSelector } from 'react-redux'

export default function Book() {
    const [bookList, setBookList] = useState([]);//书籍分页列表
    const [bookPageInfo, setBookPageInfo] = useState({
        current: 1,
        pageSize: 15,
    });//当前的分页信息
    const { bookTypeId } = useSelector(state => state.type)
    const [spinning, setSpinning] = useState(false);//是否正在加载数据
    const [pageCount, setPageCount] = useState(0);//当前的总数据量
    function handlePageChange(newPage) {
        setBookPageInfo({
            ...bookPageInfo,
            current: newPage
        })
        // 滚动到顶部
        document.documentElement.style.scrollBehavior = 'smooth'
        document.documentElement.scrollTop = 0;
    }
    // 每次分页信息改变后重新获取分页列表
    async function getBooksByPage() {
        const newParams = { ...bookPageInfo };
        setSpinning(true);
        if (bookTypeId !== 'all') {
            newParams.typeId = bookTypeId
            newParams.current = 1
        }
        const { data } = await fetchBooksByPage(newParams);
        setPageCount(data.count);
        setBookList(data.data);
        setSpinning(false);
    }
    useEffect(() => {
        getBooksByPage()
        /* eslint-disable */
    }, [bookPageInfo])

    // 根据有没有点击分类重新更新分页信息
    useEffect(() => {
        setBookPageInfo({
            pageSize: bookPageInfo.pageSize,
            current: 1
        })
    }, [bookTypeId])

    const books = bookList.map(book => <BookItem bookInfo={book} key={book._id} />)
    return (
        <div className={styles.container}>
            <Spin
                size='large'
                tip='加载中...'
                spinning={spinning}
            >
                <div className={styles.bookItems}>
                    {books}
                </div>
            </Spin>
            {bookList.length > 0 ? <Pagination
                total={pageCount}
                pageSize={bookPageInfo.pageSize}
                current={bookPageInfo.current}
                showQuickJumper
                onChange={handlePageChange}
                style={{
                    textAlign: 'center',
                    margin: '50px 0 20px 0'
                }}
            />
                :
                <Empty
                    description='该分类下暂无书籍'
                    style={{
                        marginBottom: 50,
                        marginTop: 40
                    }}
                />
            }
        </div>
    )
}
