import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import { Comment } from '@ant-design/compatible';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/zh-cn'
import { Avatar, Button, Form, Input, List, Empty, message, Pagination } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import CommentItem from './CommentItem'
import { addComment, searchOneBookComment, searchOneIssueComment } from '../../api/comment';
import { modifyIssueInfo } from '../../api/issue'
import { modifyBookInfo } from '../../api/book'
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfoAsync } from '../../redux/userSlice'

export default function Discuss(props) {
    const isIssueComment = props?.issueInfo ? true : false;//判断当前是问答评论还是书籍评论
    const commentInfo = isIssueComment ? props.issueInfo : props.bookInfo;
    const modifyApi = isIssueComment ? modifyIssueInfo : modifyBookInfo
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);//评论列表
    const { userInfo, isLogin } = useSelector(state => state.user);
    const [pageInfo, setPageInfo] = useState({
        current: 1,//当前的评论页数
        pageSize: 5,//每页条数
        count: 0,//数据总量
    })

    const [submitting, setSubmitting] = useState(false);//是否正在提交评论
    const { TextArea } = Input;
    const editorRef = useRef();//编辑器实例
    const txtRef = useRef();//文本域实例
    const contentItem = isIssueComment ? <Editor
        initialValue=""
        previewStyle="vertical"
        height="300px"
        initialEditType="markdown"
        language='zh-CN'
        ref={editorRef}
    /> : <TextArea
        className={styles.textarea}
        ref={txtRef}
    />;
    const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header='当前评论'
            itemLayout="horizontal"
            renderItem={(props) => <CommentItem {...props} />}
        />
    );
    const Command = ({ onSubmit, submitting }) => (
        <>
            <Form.Item>
                {contentItem}
            </Form.Item>
            <Form.Item>
                <Button
                    disabled={!isLogin}
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    className={styles.btn}
                    type="primary"
                >
                    发布评论
                </Button>
            </Form.Item>
        </>
    );

    /**
     * 当评论可以请求发送时调用该函数
     * @param {*} commentContent 评论内容
     * @param {*} score 评论成功的分数
     */
    async function sendPost(commentContent, score) {
        // 提交评论
        setSubmitting(true);
        const { msg } = await addComment(props.commentType, {
            userId: userInfo._id,
            typeId: commentInfo?.typeId,
            issueId: commentInfo?._id,
            bookId: commentInfo?._id,
            commentContent
        })
        setSubmitting(false);
        if (msg) {
            message.error(msg);
        }
        else {
            message.success(`评论发布成功，积分+${score}`);
            setPageInfo({
                ...pageInfo,
                current: 1
            })
            const count = await getCommentList();//重新获取评论
            setPageInfo({
                ...pageInfo,
                count: count
            })
            dispatch(updateUserInfoAsync({
                id: userInfo._id,
                newInfo: {
                    points: userInfo.points + score
                }
            }))
        }
    }

    // 提交评论的回调
    function handleSubmit() {
        if (isIssueComment) {
            // 当前是问答评论
            const value = editorRef.current.getInstance().getHTML();
            if (value === '<p><br></p>') {
                // 表单不能为空
                message.warning('发布的评论不能为空');
                return
            }
            // 发送数据到服务器
            sendPost(value, 4);
        }
        else {
            // 当前是书籍评论
            const value = txtRef.current.resizableTextArea.textArea.value;
            if (!value) {
                // 表单不能为空
                message.warning('发布的评论不能为空')
                return
            }
            // 发送数据到服务器
            sendPost(value, 2);
        }
    };

    function handlePageChange(newPage) {
        setPageInfo({
            ...pageInfo,
            current: newPage
        })
    }

    // 获取评论列表
    async function getCommentList() {
        const apiFunc = isIssueComment ? searchOneIssueComment : searchOneBookComment
        const { current, pageSize } = pageInfo;
        const res = await apiFunc(commentInfo?._id, { current, pageSize });
        if (res) {
            setComments(res.data.data);
            return Promise.resolve(res.data.count)
        }
    }
    // 一开始需要获取的数据
    // 设定每次点击标记进入问答详情页时增加一次浏览量
    useEffect(() => {
        async function initial() {
            if (commentInfo && commentInfo._id) {
                const count = await getCommentList();
                pageInfo.count = count;
                setPageInfo(pageInfo)
                modifyApi(commentInfo._id, {
                    scanNumber: commentInfo.scanNumber + 1,
                })
            }
        }
        initial();
        /* eslint-disable*/
    }, [commentInfo])

    useEffect(() => {
        commentInfo && getCommentList();
        /* eslint-disable*/
    }, [pageInfo])

    // 实时更新评论数
    useEffect(() => {
        if (!pageInfo.count || !commentInfo?._id) {
            return
        }
        modifyApi(commentInfo._id, {
            commentNumber: pageInfo.count,

        })
    }, [pageInfo.count, commentInfo])


    return (
        <>
            <Comment
                avatar={<Avatar src={isLogin && userInfo.avatar} icon={<UserOutlined />} />}
                content={
                    <Command
                        onSubmit={handleSubmit}
                        submitting={submitting}
                    />
                }
            />
            {comments.length > 0 ?
                <CommentList
                    comments={comments}
                /> :
                <Empty
                    style={{
                        marginBottom: 100
                    }}
                    description='暂无评论'
                />
            }
            {comments.length > 0 && <Pagination
                style={{
                    textAlign: 'center',
                    marginTop: 20,
                    marginBottom: 50
                }}
                total={pageInfo.count}
                current={pageInfo.current}
                pageSize={pageInfo.pageSize}
                showQuickJumper//快速跳转
                onChange={handlePageChange}
            />}
        </>
    );
}
