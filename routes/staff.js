const express = require('express')
const router = express.Router()
const Staff = require('../models/staff');
const docName = '职工'
//获取职工列表
router.get('/staff', (req, res, next) => {
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
  Staff.find({}, (err, result) => {
    if (err) return res.sendResult(err, 400, `获取${docName}列表失败`)
    const resultData = {}
    resultData["total"] = result.length
    resultData['staffs'] = result
    res.sendResult(resultData, 200, `获取${docName}列表成功`)
  }).skip(pgnum).limit(pgsize)
}
)
// 添加职工信息
router.post('/staff', (req, res) => {
  const newStaff = new Staff({
    staff_name: req.body.staff_name,
    staff_phonenumber: req.body.staff_phonenumber,
    staff_gender: req.body.staff_gender,
    staff_isParty: req.body.staff_isParty,
    staff_join_party_time: req.body.staff_join_party_time
  })
  newStaff.save((err, result) => {
    if (err) {
      return res.sendResult(err, 400, `添加${docName}信息失败！`)
    }
    res.sendResult(result, 201, `添加${docName}信息成功！`)
  })
})
// 修改职工信息
router.put('/staff/:id', (req, res) => {
  Staff.updateOne({ _id: req.params.id }, {
    staff_name: req.body.staff_name,
    staff_phonenumber: req.body.staff_phonenumber,
    staff_gender: req.body.staff_gender,
    staff_isParty: req.body.staff_isParty,
    staff_join_party_time: req.body.staff_join_party_time
  }, (err, result) => {
    if (err) return res.sendResult(err, 400, `添加${docName}信息失败！`)
    res.sendResult(result, 201, `更新${docName}信息成功！`)
  })
})
// 查询职工信息
router.get('/staff/:id', (req, res) => {
  Staff.findById(req.params.id, (err, result) => {
    if (err) return res.sendResult(err, 400, `查询${docName}信息失败！`)
    res.sendResult(result, 200, `查询${docName}信息成功！`)
  })
})
// 删除职工信息
router.delete('/staff/:id', (req, res) => {
  Staff.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) { return res.sendResult(err, 400, `删除${docName}信息失败！`) }
    if (!result) return res.sendResult(result, 400, '未搜索到该职工,删除失败')
    res.sendResult(result, 200, `删除${docName}信息成功！`)
  })
})
module.exports = router