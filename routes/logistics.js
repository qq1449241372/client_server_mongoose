const express = require('express')
const router = express.Router()
const Logistics = require('../models/logistics');

// 查询运输列表
router.get('/logistics', (req, res) => {
  // 验证参数
  if (!req.query.pagenum || req.query.pagenum <= 0) {
    return res.sendResult(null, 400, "pagenum 参数错误");
  }
  if (!req.query.pagesize || req.query.pagesize <= 0) {
    return res.sendResult(null, 400, "pagesize 参数错误")
  }
  const pgnum = (req.query.pagenum - 1) * req.query.pagesize
  const pgsize = req.query.pagesize * 1
  Logistics.find({ device_id: req.query.device_id }, (err, result) => {
    if (err) return res.sendResult(err, 400, `查询${req.query.device_id}运输信息失败`)
    const resultData = {}
    resultData["total"] = result.length
    resultData['logistics'] = result
    res.sendResult(resultData, 200, `查询${req.query.device_id}运输信息成功`)
  }).skip(pgnum).limit(pgsize)
})
router.post('/logistics', (req, res) => {
  // 查找提交表单中各参数对应的数组，再返回对象并保存
  
  const newLogistics = new Logistics({
    device_id: req.body.device_id,
    main_part: req.body.main_part,
    main_boom: req.body.main_boom,
    fly_jib: req.body.fly_jib,
    weight: req.body.weight,
    hook: req.body.hook,
    others: req.body.others,
  })
})

module.exports = router