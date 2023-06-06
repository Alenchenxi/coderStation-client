/**
 * 此文件用于配置有哪些路由需要登录后才能访问
 */
const routeArr = [
    { path: '/issues', login: false },
    { path: '/issues/:id', login: false },
    { path: '/addIssue', login: true },
    { path: '/books', login: false },
    { path: '/books/:id', login: false },
    { path: '/personal', login: true },
    { path: '/searchPage', login: false },
    { path: '/interview', login: false },
    { path: '/', login: false }
];
export default routeArr