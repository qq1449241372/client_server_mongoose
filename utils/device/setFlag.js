const _ = require('lodash');
// 查询条件判断函数
// 传入的是req.body
module.exports = function (object) {
  console.log(object);
  orFlag = {
    $or: [
      { device_id: object.device_id },
      { device_capacity: object.device_capacity }
    ],
  }
  andFlag = {
    $and: [
      { device_id: object.device_id },
      { device_capacity: object.device_capacity }
    ],
  }
  // 未输入查询条件，自动返回列表
  if (_.keys(object).length == 0) return {}
  // 有多个查询条件，使用and查询
  if (_.keys(object).length == 2) return andFlag
  // 其余情况均使用or查询
  else return orFlag
}
