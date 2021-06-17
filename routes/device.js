const express = require('express')
const router = express.Router()
const Device = require('../models/Device');
// 获取设备列表
router.get('/device', (req, res, next) => {
  // 验证参数
  if (!req.query.pagenum || req.query.pagenum <= 0) {
    return res.sendResult(null, 400, "pagenum 参数错误");
  }
  if (!req.query.pagesize || req.query.pagesize <= 0) {
    return res.sendResult(null, 400, "pagesize 参数错误")
  } next();
},
  (req, res) => {
    const pgnum = (req.query.pagenum - 1) * req.query.pagesize
    const pgsize = req.query.pagesize * 1
    Device.aggregate([{
      $lookup: {
        from: "parts",
        localField: "device_id",
        foreignField: "device_id",
        as: 'parts',
      }
    }], (err, result) => {
      if (err) { return res.sendResult(err, 400, err._message) }
      const resultData = {}
      resultData["total"] = result.length
      resultData['devices'] = result
      console.log(resultData);
      res.sendResult(resultData, 200, '获取设备列表成功')

    }).skip(pgnum).limit(pgsize)

  }
)
// 添加设备信息
router.post('/device', (req, res, next) => {
  const newDevice = new Device({
    device_id: req.body.device_id,
    device_capacity: req.body.device_capacity,
  })
  newDevice.save((err, result) => {
    if (err) {
      return res.sendResult(err, 400, '添加设备信息失败！')
    }
    res.sendResult(result, 201, '添加设备信息成功！')
  })
}
)

module.exports = router;