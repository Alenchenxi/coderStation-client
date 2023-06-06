import request from "./request";

// 分页获取问答
export function getIssueByPage(params) {
    return request.get('/api/issue/', {
        params
    })
}

// 新增问答
export function addIssue(info) {
    return request.post('/api/issue', info)
}

// 根据id查找问答
export function searchIssueById(id) {
    return request.get(`/api/issue/${id}`)
}

// 修改问答
export function modifyIssueInfo(id, newInfo) {
    return request.patch(`/api/issue/${id}`, newInfo)
}