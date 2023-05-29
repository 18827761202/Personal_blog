var express = require('express');
var path = require('path');
var logger = require('morgan');
var expressJwt = require('express-jwt');
// 引入mysql
var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'personal_blog'
});

db.connect((err) => {
  if (err === null) {
    console.log("mysql数据库连接成功")
  }
});

// 导出db
module.exports = { db };

var indexRouter = require('./routes/index');

var app = express();

app.use(express.static(path.join(__dirname, '/public/images')));

app.use(expressJwt.expressjwt({
  secret: 'blog_server256',
  algorithms: ['HS256']
}).unless({
  path: ['/login']
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(() => {
  console.log(`express框架服务已在 http://localhost:3000 开启`)
})

module.exports = app;
