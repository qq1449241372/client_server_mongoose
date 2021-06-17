const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/client",
  {
    //更新版本以后需要添加，不然会报错
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("数据库连接成功！");
  }
);

module.exports = mongoose;
