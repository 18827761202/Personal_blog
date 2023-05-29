var express = require('express');
var router = express.Router();
var { db } = require('../app');
var jwt = require('jsonwebtoken');
var multer = require("multer");
var upload = multer({ dest: 'public/binary' })
const fs = require('fs');
const path = require('path');
/* GET home page. */
var key = 'blog_server256'

// 导入 moment-timezone 模块
const moment = require('moment-timezone');
// 将时区设置为上海
moment.tz.setDefault('Asia/Shanghai');

router.get('/', function (req, res) {
  res.send({ success: true, message: "服务器启动成功" })
});

// 后台登录
router.post('/login', (req, res) => {
  const { name, password } = req.body
  db.query('select * from admin_user where user_name = ? and user_pswd = ?', [name, password], (err, ress) => {
    if (ress[0]) {
      const token = 'Bearer ' + jwt.sign(
        { userinfo: ress[0].user_guid },
        key,
        { expiresIn: 60 * 5 }
      )
      res.send({ success: true, message: `欢迎您,${ress[0].nick_name}`, token });
    } else {
      res.send({ success: false, message: "账号或密码错误" });
    }
  })
});

// 首页个人信息渲染
router.get('/admin/home', (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  var user_guid;
  jwt.verify(token, key, (err, resolvers) => {
    user_guid = resolvers.userinfo
  })
  db.query('select * from admin_user where user_guid = ?', [user_guid], (err, ress) => {
    ress[0].birthday = moment(ress[0].birthday).format('YYYY-MM-DD')
    res.send({ success: true, message: ress[0] });
  })
});

// 修改个人信息
router.post('/admin/update_userinfo', upload.single('file'), (req, res) => {
  const { birthday, contact_number, nick_name, signature, sex, user_guid } = JSON.parse(req.body.data)
  if (req.file == undefined) {
    db.query('update admin_user set birthday = ?,contact_number = ?, nick_name = ?, signature = ?, sex = ?, last_time = now() where user_guid = ?', [birthday.slice(0, 10), contact_number, nick_name, signature, sex, user_guid])
    db.query('select * from admin_user where user_guid = ?', [user_guid], (err, resolvers) => {
      resolvers[0].birthday = moment(resolvers[0].birthday).format('YYYY-MM-DD')
      res.send({ success: true, message: "保存成功", data: resolvers[0] });
    })
  } else {
    fs.readFile(req.file.path, (err, uersdata) => {
      if (err) res.send({ success: false, message: "读取失败" });
      const keepname = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222) + '.' + req.file.mimetype.split('/')[1];
      fs.writeFile(path.join(__dirname, '../public/images/' + keepname), uersdata, (err) => {
        if (err) res.send({ success: false, message: "写入失败" });
      });
      db.query('update admin_user set birthday = ?,contact_number = ?, nick_name = ?, signature = ?, sex = ?, last_time = now(), avatar = ? where user_guid = ?', [birthday.slice(0, 10), contact_number, nick_name, signature, sex, keepname, user_guid])
      db.query('select * from admin_user where user_guid = ?', [user_guid], (err, resolvers) => {
        resolvers[0].birthday = moment(resolvers[0].birthday).format('YYYY-MM-DD')
        res.send({ success: true, message: "保存成功", data: resolvers[0] });
      })
    })
  }
})

// 获取文章分类列表
router.get("/admin/get_category_list", (req, res) => {
  db.query("select * from category", (err, ress) => {
    ress.forEach(item => {
      item.create_time = moment(item.create_time).format('YYYY-MM-DD')
      item.update_time = moment(item.update_time).format('YYYY-MM-DD')
    });
    res.send({ success: true, message: "获取成功", data: ress });
  })
})

module.exports = router;
