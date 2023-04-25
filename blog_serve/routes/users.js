var express = require('express');
var router = express.Router();
var { db } = require('../app')


/* 后台登录 */
router.post('/login', function (req, res, next) {
  db.query('select * from admin_user',(err,res)=>{
    console.log(err,res)
  })
  res.send('respond with a resource');
});

module.exports = router;
