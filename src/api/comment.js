import request from "./request";

// 查询某一问答评论
export function searchOneIssueComment(id, pageInfo) {
    if (!id) {
        return
    }
    return request({
        url: `/api/comment/issuecomment/${id}`,
        method: 'GET',
        params: { ...pageInfo }
    })
}

// 查询某一书籍评论
export function searchOneBookComment(id, pageInfo) {
    return request({
        url: `/api/comment/bookcomment/${id}`,
        method: 'GET',
        params: { ...pageInfo }
    })
}

// 新增评论
export function addComment(commentType, data) {
    let newData = data;
    if (commentType === 1) {
        delete newData.bookId;
    }
    else {
        delete newData.issueId;
    }
    newData.commentType = commentType;
    return request.post(`/api/comment`, newData)
}