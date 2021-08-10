const express = require('express');
const router = express.Router()
const SubPart = require('../models/subPart');

// 获取部件列表
// router.get('/part', (req, res, next) => {
//   // 验证参数
//   if (!req.query.pagenum || req.query.pagenum <= 0) {
//     return res.sendResult(null, 400, "pagenum 参数错误");
//   }
//   if (!req.query.pagesize || req.query.pagesize <= 0) {
//     return res.sendResult(null, 400, "pagesize 参数错误")
//   }
//   next();
// },
//   (req, res) => {
//     Part.find({}, (err, result) => {
//       if (err) {
//         return res.sendResult(err, 400, '获取部件列表失败')
//       }
//       const resultData = {
//         total: result.length,
//         parts: result
//       }
//       return result
//       // res.sendResult(resultData, 200, '获取部件列表成功')
//     }).then(result => {
//       Part.find({})
//     })
//   }
// )
/* 
添加子部件信息
*/
router.post('/subpart', (req, res) => {
  const newSubPart = new SubPart({
    id: req.body.id,
    part_name: req.body.part_name,
    part_id: req.body.part_id,
    part_length: req.body.part_length,
    part_width: req.body.part_width,
    part_height: req.body.part_height,
    part_weight: req.body.part_weight,
    part_codename: req.body.part_codename,
  })
  newSubPart.save((err, result) => {
    if (err) return res.sendResult(err, 400, '添加子部件失败！')
    res.sendResult(result, 201, '添加子部件信息成功！')
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
router.get('/subpart/:id', (req, res) => {
  SubPart.findById(req.params.id, (err, result) => {
    if (err) { return res.sendResult(err, 400, '获取部件信息失败！') }
    res.sendResult(result, 200, '查询部件信息成功！')
  })
})
// 查询部件
router.post('/subpart/search', (req, res) => {
  partName = req.body.part_name
  SubPart.find({ part_name: { $regex: partName } }, (err, result) => {
    if (err) return res.sendResult(err, 400, '查询部件信息失败！')
    if (result.length == 0) return res.sendResult(null, 400, '未查询到该部件')
    res.sendResult(result, 200, '查询部件信息成功！')
  })
})
//删除部件信息
router.delete('/subpart/:id', (req, res) => {
  SubPart.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) { return res.sendResult(err, 400, '删除部件信息失败！') }
    res.sendResult(result, 200, '删除部件信息成功！')
  })
})
module.exports = router;