const express = require('express')
const router = express.Router()
const Logistics = require('../models/logistics');
const Comb = require('../models/combination')
const Part = require('../models/part');
const _ = require('lodash');
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
// 新建运输清单
router.post('/logistics', (req, res) => {
  // 查找提交表单中各参数对应的数组，再返回对象并保存
  comb_query = {
    comb_mainboom_length: req.body.main_boom,
    comb_flyjib_length: req.body.fly_jib
  }
  Comb.findOne(comb_query).then(result => {
    console.log(result);
    plist = _.concat(result.comb_mainboom, result.comb_flyjib)
    console.log(plist);
    const promises = plist.map(item => {
      return Part.findOne({ part_codename: item })
    })
    Promise.all(promises).then(boom_list => {
      const newLogistics = new Logistics({
        device_id: req.body.device_id,
        // main_part: req.body.main_part,
        main_boom: _.dropRight(boom_list, result.comb_flyjib.length),
        fly_jib: _.drop(boom_list, result.comb_mainboom.length),
        // weight: req.body.weight,
        // hook: req.body.hook,
        // others: req.body.others,
      })
      console.log(newLogistics);
      newLogistics.save((err, doc) => {
        if (err) res.sendResult(err, 400, '添加物流信息失败')
        res.sendResult(201, doc, '添加物流信息成功')
      })
    })
  })
})

module.exports = router