const isString = (v) => {
    return typeof v === 'string';
}
const isArray = (v) => {
    return Object.prototype.toString.call(v) === '[object Array]';
}
/**
 * 去掉多余的/
 * @param url 
 */
const formatURL = (url) => {
    return url.replace(/\/\//g, '/');
}
module.exports = {
    isString,
    isArray,
    formatURL
}