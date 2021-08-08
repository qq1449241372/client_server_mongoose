// 将角色权限对应url数组处理为标准格式

// const _ = require('lodash');

module.exports = function handleUrlList(urlList) {
  handledUrlList = []
  urlList.map(url => {
    // url第一层遍历
    childrenList = []
    // 第二次遍历
    url.map(subUrl => {
      if (subUrl.parentId) {
        childrenList.push(subUrl)
      }
    })
    // console.log(childrenList);
    url[0].children = childrenList
    handledUrlList.push(url[0])
  })
  return handledUrlList
}