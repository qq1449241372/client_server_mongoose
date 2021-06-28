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
    return result
  }).then(result => {
    const promises = result.comb_mainboom.map(item => {
      return Part.findOne({ part_codename: item })
    })
    const promises1 = result.comb_flyjib.map(item => {
      return Part.findOne({ part_codename: item })
    })
    // 0 主机 1主臂 2副臂 3桅杆 4吊钩 5配重 6拉板（连接件）7其它
    const queryCode = ["0", "4", "5"]
    const promises2 = queryCode.map(item => {
      return Part.find({ device_id: req.body.device_id, part_type: item })
    })
    return Promise.all(_.concat(promises, promises1, promises2)).then(part_list => {
      // console.log(part_list);
      return part_list
    })
  }).then(part_list => {
    // console.log(part_list);
    let sum_weight = 0
    let main_boom = []
    let fly_jib = []
    let main_part = []
    location = part_list[0].part_location
    console.log(location);
    part_list.forEach(item => {
      // console.log(item);
      main_boom.push(item.part_type === '1' ? item : null)
      fly_jib.push(item.part_type === '2' ? item : null)
      if (item.part_weight) {
        sum_weight += item.part_weight
      }
      else {
        item.forEach(subItem => {
          main_part.push(subItem.part_type === '0' ? subItem : null)
          sum_weight += subItem.part_weight
        })
      }
    })
    console.log(main_part.filter(Boolean));
    // console.log(main_boom.filter(Boolean));
    // console.log(fly_jib.filter(Boolean));
    // console.log(sum_weight);
    const newLogistics = new Logistics({
      device_id: req.body.device_id,
      main_part: main_part.filter(Boolean),
      main_boom: main_boom.filter(Boolean),
      fly_jib: fly_jib.filter(Boolean),
      // weight: req.body.weight,
      // hook: req.body.hook,
      // others: req.body.others,
      from: location,
      destination: req.body.destination,
      sum_weight: sum_weight
    })
    console.log(newLogistics);
    newLogistics.save((err, doc) => {
      if (err) res.sendResult(err, 400, '添加物流信息失败')
      res.sendResult(201, doc, '添加物流信息成功')
    })
  })
})
// 修改运输清单
router.put('/logistics/:id', (req, res) => {
  logistic = {
    device_id: req.body.device_id,
    // main_part: part_list[0],
    // main_boom: _.dropRight(boom_list, result.comb_flyjib.length),
    // fly_jib: _.drop(boom_list, result.comb_mainboom.length),
    // // weight: req.body.weight,
    // // hook: req.body.hook,
    // // others: req.body.others,
    // from: location,
    destination: req.body.destination,
    // sum_weight: sum_weight
  }
  Logistics.updateOne({ _id: req.params.id }, logistic, { runValidators: true }, (err, result) => {
    if (err) return res.sendResult(err, 400, '更新物流信息失败')
    res.sendResult(result, 201, '更新物流信息成功')
  })
})
// 查询运输信息
router.get('/logistics/:id', (req, res) => {
  Logistics.findById(req.params.id, (err, result) => {
    if (err) return res.sendResult(err, 400, '查询物流信息失败')
    res.sendResult(result, 200, '查询物流信息成功')
  })
})
// 删除运输信息
router.delete('/logistics/:id', (req, res) => {
  Logistics.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) return res.sendResult(err, 400, '删除物流信息失败')
    res.sendResult(result, 200, '删除物流信息成功')
  })
})
module.exports = router