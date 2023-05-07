var createError = require('http-errors');
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

app.use(expressJwt.expressjwt({
  secret: 'blog_server256',
  algorithms: ['HS256']
}).unless({
  path: ['/login']
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(() => {
  console.log(`express框架服务已在 http://localhost:3000 开启`)
})

module.exports = app;
