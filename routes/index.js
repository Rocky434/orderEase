var express = require('express');
var router = express.Router();
const shortid = require('shortid');
const fs = require('fs');
const path = require('path');
const db = require('../db/db');  //mongodb資校處理設定
const accountModel = require('../models/accountModel');//mongodb資料類型設定
const login_signup_Function = require('../functions/login_signup_Function');

let checkLoginMiddleware = (req, res, next) => {
  if (!req.session.sid) {
    console.log('hi/n');
    return res.redirect('login');
  }
  next();
}
/* GET home page. */
router.get('/', checkLoginMiddleware, (req, res, next) => {
  res.render('index', { title: 'Express' });

});

router.get('/signUp', (req, res) => {
  res.render('signUp', { tempAccount: '', errorMes: ' ' });
});

router.post('/signUp', (req, res, next) => {
  login_signup_Function.registerUser(req.body)
    .then((message) => {
      res.redirect(message.page);
    })
    .catch((message) => {
      res.render(message.page, { tempAccount: req.body.account, errorMes: message.error });
    });
});

router.get('/login', (req, res) => {
  res.render('login', { tempAccount: '', errorMes: '' });
});

router.post('/login', (req, res) => {
  login_signup_Function.loginUser(req.body)
    .then((message) => {
      req.session.account = req.body.account;
      req.session.sid = message.id;
      req.session.save((err) => {
        if (err) {
          res.send(err);
        }
        else {
          res.redirect(message.page);
        }
      });
    })
    .catch((message) => {
      res.render(message.page, { tempAccount: req.body.account, errorMes: message.error });
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('login');
  });
})

module.exports = router;  