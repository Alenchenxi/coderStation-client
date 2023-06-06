import request from "./request";

// 获取验证码
export function getCaptcha() {
    return request.get('/res/captcha')
}

// 验证帐号是否已经注册过
export function vaildateIsRegistered(loginId) {
    return request.get(`/api/user/userIsExist/${loginId}`)
}

// 注册用户
export function registerUser(userInfo) {
    return request.post(`/api/user/`, userInfo, {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded	'
        },
    })
}

// 用户登录
export function userLogin(userInfo) {
    return request.post(`/api/user/login`, userInfo, { headers: { "Content-Type": 'application/x-www-form-urlencoded	' } })
}

// 根据id查找用户
export function findUserById(id) {
    return request.get(`/api/user/${id}`)
}

// 恢复登录
export function whoAmI() {
    return request.get('/api/user/whoami')
}

// 获取积分前十的用户
export function fetchRandOrder() {
    return request.get('/api/user/pointsrank')
}

// 修改用户
export function modifyUserInfo(id, newInfo) {
    return request.patch(`/api/user/${id}`, newInfo)
}

// 验证帐号密码是否正确
export function vaildatePwdIsRight(params) {
    return request.post('/api/user/passwordcheck', params)
}