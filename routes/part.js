const express = require('express')
const router = express.Router()
const Part = require('../models/part');

// 获取部件列表
router.get('/part', (req, res, next) => {
  // 验证参数
  if (!req.query.pagenum || req.query.pagenum <= 0) {
    return res.sendResult(null, 400, "pagenum 参数错误");
  }
  if (!req.query.pagesize || req.query.pagesize <= 0) {
    return res.sendResult(null, 400, "pagesize 参数错误")
  }
  next();
}, (req, res) => {
  flag = [
    {
      $lookup: {
        from: "subparts",
        localField: "id",
        foreignField: "part_id",
        as: 'subparts',
      }
    },
    {
      $sort: { device_id: 1 }
    }
  ]
  Part.aggregate(flag, (err, result) => {
    if (err) {
      return res.sendResult(err, 400, '获取部件列表失败')
    }
    const resultData = {
      total: result.length,
      parts: result
    }
    res.sendResult(resultData, 200, '获取部件列表成功')
  })
}
)
/* 
添加部件信息
*/
router.post('/part', (req, res) => {
  const newPart = new Part({
    device_id: req.body.device_id,
    id: req.body.id,
    children: req.body.children,
    part_name: req.body.part_name,
    parent_id: req.body.parent_id,
    part_type: req.body.part_type,
    part_length: req.body.part_length,
    part_width: req.body.part_width,
    part_height: req.body.part_height,
    part_weight: req.body.part_weight,
    part_codename: req.body.part_codename,
    part_location: req.body.part_location
  })
  newPart.save((err, result) => {
    if (err) return res.sendResult(err, 400, '添加部件信息失败！')
    res.sendResult(result, 201, '添加部件信息成功！')
  })
})
// 更改部件信息
router.put('/part/:id', (req, res) => {
  Part.updateOne({ _id: req.params.id }, {
    device_id: req.body.device_id,
    part_name: req.body.part_name,
    part_type: req.body.part_type,
    part_length: req.body.part_length,
    part_width: req.body.part_width,
    part_height: req.body.part_height,
    part_weight: req.body.part_weight,
    part_codename: req.body.part_codename
  }, (err, result) => {
    if (err) {
      return res.sendResult(err, 400, '修改部件信息失败！')
    }
    res.sendResult(result, 201, '修改部件信息成功！')
  })
})

// 获取部件信息
router.get('/part/:id', (req, res) => {
  Part.findById(req.params.id, (err, result) => {
    if (err) { return res.sendResult(err, 400, '获取部件信息失败！') }
    res.sendResult(result, 200, '查询部件信息成功！')
  })
})
// 查询部件
router.post('/part/search', (req, res) => {
  partName = req.body.part_name
  Part.find({ part_name: { $regex: partName } }, (err, result) => {
    if (err) return res.sendResult(err, 400, '查询部件信息失败！')
    if (result.length == 0) return res.sendResult(null, 400, '未查询到该部件')
    res.sendResult(result, 200, '查询部件信息成功！')
  })
})
//删除部件信息
router.delete('/part/:id', (req, res) => {
  Part.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) { return res.sendResult(err, 400, '删除部件信息失败！') }
    res.sendResult(result, 200, '删除部件信息成功！')
  })
})
module.exports = router;