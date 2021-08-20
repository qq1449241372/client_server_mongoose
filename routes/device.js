const express = require('express')
const router = express.Router()
const Device = require('../models/device');
const setFlag = require('../utils/device/setFlag');
// 获取设备列表
router.get('/device', (req, res, next) => {
  // 验证参数
  if (!req.query.pagenum || req.query.pagenum <= 0) {
    return res.sendResult(null, 400, "pagenum 参数错误");
  }
  if (!req.query.pagesize || req.query.pagesize <= 0) {
    return res.sendResult(null, 400, "pagesize 参数错误")
  }
  next();
}, (req, res) => {
  const pgnum = (req.query.pagenum - 1) * req.query.pagesize
  const pgsize = req.query.pagesize * 1
  flag = [
    {
      $lookup: {
        from: "parts",
        localField: "device_id",
        foreignField: "device_id",
        as: 'parts',
      }
    },
    {
      $lookup: {
        from: "workers",
        localField: "device_id",
        foreignField: "device_id",
        as: 'workers',
      }
    },
    // 对结果进行排序 1：升序 -1：降序
    {
      $sort: { device_id: 1 }
    }
  ]
  Device.aggregate(flag, (err, result) => {
    if (err) { return res.sendResult(err, 400, '获取设备列表失败') }
    const resultData = {
      count: result.length,
      list: result
    }
    // console.log(resultData);
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
  Device.find({ device_id: req.body.device_id }, (err, result) => {
    if (err) return res.status(400).sendResult(err, 400, '')
    if (result.length !== 0) res.status(400).sendResult('', 400, '重复ID，设备已存在，请重新输入')
    if (result.length == 0) {
      newDevice.save((err, result) => {
        if (err) {
          return res.sendResult(err, 400, '添加设备信息失败！')
        }
        res.sendResult(result, 201, '添加设备信息成功！')
      })
    }
  })
})
// 更新设备信息
router.put('/device/:id', (req, res) => {
  Device.updateOne({ _id: req.params.id }, {
    device_id: req.body.device_id,
    device_capacity: req.body.device_capacity,
  }, (err, result) => {
    if (err) {
      return res.sendResult(err, 400, '更新设备信息失败！')
    }
    res.sendResult(result, 201, '更新设备信息成功！')
  })
})
// 查询设备信息
router.post('/device/search', (req, res) => {
  Device.find(setFlag(req.body), (err, result) => {
    if (err) return res.sendResult(err, 400, '查询设备信息失败！')
    if (result.length == 0) return res.sendResult(null, 400, '未查询到该设备')
    res.sendResult(result, 200, '查询设备信息成功！')
  }).sort({ 'device_id': 1 })
})
//删除设备信息
router.delete('/device/:id', (req, res) => {
  Device.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) { return res.sendResult(err, 400, '删除设备信息失败！') }
    if (!result) return res.sendResult(result, 400, '未找到该设备，删除失败')
    res.sendResult(result, 200, '删除设备信息成功！')
  })
})

module.exports = router;