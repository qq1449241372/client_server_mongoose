const _ = require('lodash');

module.exports = function (req, res, next) {
  if (req.path == '/login') {
    console.log(req.path, req.method);
    return next()
  }
  const reg = new RegExp(/^\/api/)
  if (reg.test(req.path)) {
    console.log(req.path, req.method);
    return next()
  }
  console.log('路由拦截已启动');
  userUrls = req.user.userUrls;
  console.log('用户路由表:', userUrls);
  console.log('当前请求路由：', req.path);
  flag = _.indexOf(userUrls, req.path)
  console.log(flag);
  if (flag <= 0) res.send("用户未授权，禁止访问！")
  else res.send('用户已授权，允许访问！')
  next()
}