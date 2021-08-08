const _ = require('lodash');
module.exports = function toNumberArray(data) {
  children_list = []
  console.log(typeof data);
  if (typeof data === 'object') {
    data.forEach(item => {
      children_list.push(_.toNumber(item))
    })
    return children_list
  }
  if (typeof data === 'string') {
    if (_.isEmpty(data)) return null
    return _.toNumber(data)
  }
  return null
}