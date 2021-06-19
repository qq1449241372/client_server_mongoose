const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
const expressJWT = require("express-jwt");
const config = require("./config");
// const multer = require("multer");
const path = require("path");
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
const resExtra = require('./modules/resExtra');
app.use(resExtra)
// 配置解析token中间件
// algorithms: ["HS265"] 6.0.x版本以后需要加上
// app.use(
//     expressJWT({ secret: config.jwtSecretKey }).unless({
//         path: [/^\/api/],
//     })
// );
// 配置路由
const routeLoader = require('./routes/loader');
app.use('/', routeLoader)
// 监听端口
app.listen(port, () => {
  console.log(`Client app listening at http://localhost:${port}`)
})