import request from "./request";

// 分页获取书籍
export function fetchBooksByPage(params) {
    return request.get('/api/book', { params })
}

// 修改书籍
export function modifyBookInfo(id, newInfo) {
    return request.patch(`/api/book/${id}`, newInfo)
}