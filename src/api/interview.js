import request from './request';

// 查找所有分类对应的面试题标题
export function fetchAllInterviewsTitle() {
    return request.get('/api/interview/interviewTitle')
}

// 根据id查找面试题
export function fetchInterviewById(interviewId) {
    return request.get(`/api/interview/${interviewId}`)
}