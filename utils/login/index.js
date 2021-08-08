// 根据rbac模型获取用户菜单
const _ = require('lodash');

function handleUrlList(urlList) {
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

module.exports = handleUrlList