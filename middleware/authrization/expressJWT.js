const expressJWT = require("express-jwt");
const jwtConfig = require('./jwtConfig');

module.exports = expressJWT({
  secret: jwtConfig.jwtSecretKey
}).unless({
  // 验证url/method白名单
  path: ['/api/login',
    { url: /^\/api/, methods: ['GET'] }
  ]
})