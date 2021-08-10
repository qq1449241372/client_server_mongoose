// const jwt = require('jsonwebtoken');
// const jwtConfig = require('./jwtConfig');

// // 请求头加上 Bearer
// // 验证token
// module.exports = function (req, res, next) {
//   const token = req.headers['Authorization'];
//   if (token === undefined) {
//     // return next()
//     return res.sendResult(null, 400, 'token获取错误,请重新登陆')
//   }
//   console.log(token);
//   jwt.verify(token, jwtConfig.jwtSecretKey, (err, decoded) => {
//     if (err) return res.sendResult(err, 400, '')
//     return next()
//   })
// }