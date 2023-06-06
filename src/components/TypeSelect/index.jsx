import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllTypes, updateBookTypeId, updateIssueTypeId } from '../../redux/typeSlice'
import { Tag } from 'antd'
import { useLocation } from 'react-router-dom'

/**
 * 书籍和问答的通用顶部标签组件
 */
export default function TypeSelect() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const typeList = useSelector(state => state.type.types);
    const TagColors = ['rgb(237, 74, 74)', 'red', 'orange', 'gold', 'green', 'blue', 'cyan', 'geekblue', 'purple', '#f50', '#87d068', '#008c8c', '#d4e58d'];//标签颜色数组
    useEffect(() => {
        if (!typeList.length) {
            dispatch(fetchAllTypes())
        }
    }, [typeList.length, dispatch])

    const tags = [{ _id: 'all', typeName: '全部' }].concat(typeList).map((type, ind) => <Tag
        style={{
            borderRadius: 2,
            cursor: 'pointer'
        }}
        color={ind === 0 ? 'magenta' : TagColors[(ind - 1) % typeList.length]}
        key={type._id}
        value={type._id}
    >{type.typeName}</Tag>)

    function handleClick(e) {
        const value = e.target.getAttribute('value')
        if (!value) {
            return
        }
        if (pathname === '/issues') {
            // 当前位于问答板块
            dispatch(updateIssueTypeId(value))
        }
        else {
            // 当前位于书籍板块
            dispatch(updateBookTypeId(value))
        }
    }
    return (
        <div
            style={{
                marginLeft: '200px'
            }}
            onClick={handleClick}
        >
            {tags}
        </div>
    )
}
