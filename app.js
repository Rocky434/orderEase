const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const loginsignupRouter = require('./routes/loginSignup');
const cartRouter = require('./routes/cart');
const orderRecordsRouter = require('./routes/orderRecords');
const storeRouter = require('./routes/store');
const Middleware = require('./models/middleware');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const { DBHOST, DBPOST, DBNAME } = require('./config/config');

var app = express();

app.use(session({
  name: 'sid', //設置cookie的name，默认值是：connect.sid
  secret: 'Wu', //參與加密的字符串(簽名)
  saveUninitialized: false, //是否為每次請求都設置一个cookie用來存儲session的id
  resave: true, //是否在每次請求時重新保存session
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPOST}/${DBNAME}` //數據庫的連接配置
  }),
  cookie: {
    httpOnly: true, // 開啟後前端無法通過 JS 操作
    maxAge: 1000 * 60 * 60 // 這一條是控制 sessionID 的過期時間的！！！
  },
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', loginsignupRouter);
app.use('/', cartRouter);
app.use('/', orderRecordsRouter);
app.use('/store', Middleware.checkLoginMiddleware, storeRouter);
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

module.exports = app;
