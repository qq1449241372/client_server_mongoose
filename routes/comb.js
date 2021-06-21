const express = require('express')
const router = express.Router()
const Comb = require('../models/combination');
const Part = require('../models/part');
const events = require('events');
// 获取组合列表
router.get('/comb', (req, res) => {
  if (!req.query.pagenum || req.query.pagenum <= 0) {
    return res.sendResult(null, 400, "pagenum 参数错误");
  }
  if (!req.query.pagesize || req.query.pagesize <= 0) {
    return res.sendResult(null, 400, "pagesize 参数错误")
  }
  // 只能查询指定设备组合信息
  if (!req.query.device_id) {
    return res.sendResult(null, 400, 'device_id参数错误，请选择设备')
  }
  Comb.find({ device_id: req.query.device_id }, (err, result) => {
    if (err) return res.sendResult(err, 400, `获取${req.query.device_id}组合列表失败`)
    const resultData = {}
    resultData["total"] = result.length
    resultData['combs'] = result
    res.sendResult(resultData, 200, `获取${req.query.device_id}组合列表成功`)
  })
})
// 添加组合信息
router.post('/comb', (req, res) => {
  // 臂杆校验
  let mainboom_length = 0
  let flyjib_length = 0
  let unfindList = []
  const myEventEmitter = new events.EventEmitter
  myEventEmitter.on('valid', validLength)

  req.body.comb_mainboom.forEach((item, index) => {
    Part.findOne({ part_codename: item }, (err, result) => {
      if (err) return console.log(err);
      if (!result) {
        unfindList.push(item)
        return console.log(unfindList);
      }
      // console.log(result);
      else {
        mainboom_length += result.part_length
        console.log(mainboom_length);
      }
    })
  })
  if (mainboom_length !== req.body.comb_mainboom_length) {
    console.log(req.body.comb_mainboom_length);
    console.log(mainboom_length);
    return res.sendResult(null, 400, '杆长校验失败，请检查！')
  }

  const newComb = new Comb({
    device_id: req.body.device_id,
    comb_name: req.body.comb_name,
    // 主臂长度
    comb_mainboom_length: req.body.comb_mainboom_length,
    // 副臂长度
    comb_flyjib_length: req.body.comb_flyjib_length,
    // 数组中填写臂杆代号
    // 主臂组合
    comb_mainboom: req.body.comb_mainboom,
    // 副臂组合
    comb_flyjib: req.body.comb_flyjib,
  })

  newComb.save((err, result) => {
    if (err) return res.sendResult(err, 400, '添加组合信息失败')
    else { myEventEmitter.emit('valid') }
    // res.sendResult(result, 201, '添加组合信息成功')
  })
})
// 更改组合信息
router.put('/comb/:id', (req, res) => {
  comb = {
    // device_id: req.body.device_id,
    comb_name: req.body.comb_name,
    comb_mainboom_length: req.body.comb_mainboom_length,
    comb_flyjib_length: req.body.comb_flyjib_length,
    comb_mainboom: req.body.comb_mainboomrray,
    comb_flyjib: req.body.comb_flyjib,
  }
  Comb.updateOne({ _id: req.params.id }, comb, { runValidators: true }, (err, result) => {
    if (err) return res.sendResult(err, 400, '更新组合信息失败')
    res.sendResult(result, 201, '更新组合信息成功')
  })
})
// 查询组合信息
router.get('/comb/:id', (req, res) => {
  Comb.findById(req.params.id, (err, result) => {
    if (err) return res.sendResult(err, 400, '查询组合信息失败')
    res.sendResult(result, 200, '查询组合信息成功')
  })
})
//删除组合信息
router.delete('/comb/:id', (req, res) => {
  Comb.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) return res.sendResult(err, 400, '删除组合信息失败')
    res.sendResult(result, 200, '删除组合信息成功')
  })
})

module.exports = router;