import request from "./request";

// 获取所有类型
export function fetchAllTypes() {
    return request.get('/api/type')
}