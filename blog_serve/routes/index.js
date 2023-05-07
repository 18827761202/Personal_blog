var express = require('express');
var router = express.Router();
var { db } = require('../app');
var jwt = require('jsonwebtoken');
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* 后台登录 */
router.post('/login', (req, res, next) => {
  const { name, password } = req.body
  db.query('select * from admin_user where user_name = ? and user_pswd = ?', [name, password], (err, ress) => {
    if (ress[0]) {
      const token = 'Bearer ' + jwt.sign(
        { userinfo: ress },
        'blog_server256',
        { expiresIn: 10 }
      )
      res.send({ success: true, message: `欢迎您,${ress[0].nick_name}`, token });
    } else {
      res.send({ success: false, message: "账号或密码错误" });
    }
  })
});

router.get('/admin/home', (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token,'blog_server256',(err,resolvers)=>{
    console.log(err,resolvers)
  })
  db.query('select * from admin_user where user_name = admin', (err, ress) => {
    res.send({ success: true, message: ress });
  })
});



module.exports = router;
