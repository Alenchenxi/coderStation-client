// 此文件封装了所有的工具函数

/**
 *
 * @param {*} timestamp
 * @param {*} part
 */

export function formatDate(timestamp, part) {
    if (!timestamp) {
        return
    }
    // 根据不同的数字返回对应的含义
    const weekList = [
        [1, '星期一'],
        [2, '星期二'],
        [3, '星期三'],
        [4, '星期四'],
        [5, '星期五'],
        [6, '星期六'],
        [0, '星期天']
    ];
    const timeData = new Date(+timestamp)
    const year = timeData.getFullYear().toString().padStart(4, '0');
    const month = timeData.getMonth().toString().padStart(2, '0');
    const day = timeData.getDate().toString().padStart(2, '0');
    const hour = timeData.getHours().toString().padStart(2, '0');
    const minute = timeData.getMinutes().toString().padStart(2, '0');
    const second = timeData.getSeconds().toString().padStart(2, '0')
    const weeks = timeData.getDay();
    // 仅使用week属性
    /* eslint-disable */
    const [[num, week]] = weekList.filter((item) => item[0] === weeks)
    switch (part) {
        case 'year':
            return `${year}-${month}-${day}`
        case 'day':
            return `${day}-${hour}-${minute}`
        default:
            return `${year}-${month}-${day} ${hour}:${minute}:${second} ${week}`
    }
}

// 函数节流
export function throttle(callback, duration) {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                callback.apply(context, args);
                timer = null;
            }, duration);
        }

    }
}