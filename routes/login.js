const express = require('express')
const router = express.Router()
const User = require('../models/user');
const Role = require('../models/role');
const Url = require('../models/url');
const handleUrlList = require('../utils/login/index');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../middleware/authrization/jwtConfig');
const _ = require('lodash');
// 登录
router.get('/login', (req, res) => {
  res.send('login')
})
// 登录验证
router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, result) => {
    if (!result) return res.sendResult(null, 400, '无此用户，请重新输入')
    if (result) {
      if (result.password != req.body.password) return res.sendResult(null, 400, '密码错误！')
    }
    if (err) return res.sendResult(null, 400, '获取用户信息失败！')
    Role.find({ role_type: result.role }, (err, roleResult) => {
      if (err) res.sendResult(null, 400, 'utils:服务器获取角色信息失败!')
      return roleResult
    }).then(roleResult => {
      roleMenuList = roleResult[0].role_menus
      promises = roleMenuList.map(item => {
        condition = {
          $or: [
            { id: _.toNumber(item) },
            { parentId: _.toNumber(item) }
          ]
        }
        return Url.find(condition)
      })
      Promise.all(promises).then(urlList => {
        userMenus = handleUrlList(urlList)
        userUrls = []
        _.flattenDeep(urlList).map(item => {
          userUrls.push(item.url)
          return userUrls
        })
        // 创建token
        token = jwt.sign({
          userInfo: result,
          userUrls: userUrls,
        }, jwtConfig.jwtSecretKey)
        // 服务器返回数据
        userData = {
          userInfo: result,
          userMenus: userMenus,
          token: token
        }
        return res.sendResult(userData, 200, '登录成功！')
      })
    })
  })
})
module.exports = router