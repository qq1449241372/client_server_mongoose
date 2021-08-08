const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
const expressJWT = require("express-jwt");
const path = require("path");
const jwtConfig = require('./middleware/authrization/jwtConfig');
// const _ = require('lodash');
const routerInterceptor = require('./middleware/Interceptor/Interceptor');
// const upload = multer({ dest: path.join(__dirname, "../uploads") });

// 创建服务器实例对象
const app = express()
// 定义监听端口
const port = 3000;
// 配置静态资源文件
app.use("/uploads", express.static("./uploads"));
// 设置跨域和相应数据格式
app.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
})
// 配置cors中间件
app.use(cors());
// 配置解析表单数据中间件,注意只能解析application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 初始化统一响应机制
const resExtra = require('./middleware/handleRes/resExtra');
app.use(resExtra)
// 配置解析token中间件
app.use(expressJWT({
  secret: jwtConfig.jwtSecretKey
})
  .unless({
    //除了这个地址，其他的URL都需要验证
    path: ['/login', '/^\/api/']
  }));
// 启用路由拦截功能
app.use(routerInterceptor)
// 加载自动配置路由
const routeLoader = require('./routes/loader');
app.use('/', routeLoader)
// 监听端口
app.listen(port, () => {
  console.log(`Client app listening at http://localhost:${port}`)
})