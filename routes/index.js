var express = require('express');
var router = express.Router();
const shortid = require('shortid');
const fs = require('fs');
const path = require('path');
const db = require('../db/db');  //mongodb資校處理設定
const accountModel = require('../models/accountModel');//mongodb資料類型設定
const { default: mongoose } = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/signUp', (req, res) => {
  res.render('signUp', { tempAccount: '', errorMes: ' ' });
})

router.post('/signUp', (req, res) => {

  const { account, password } = req.body;

  const isAccountValid = () => {
    return new Promise((resolve, reject) => {
      if (account.length >= 8) {
        resolve();
      }
      else {
        reject({ status: 400, message: '帳戶至少8個字', account: account });
      }
    });
  };

  const isAccountUnique = () => {
    return accountModel.findOne({ account })
      .then(existingAccount => {
        if (existingAccount)
          return Promise.reject({ status: 400, message: '帳號已註冊過', account: account });
      });
  }

  const isPasswordValid = () => {
    return new Promise((resolve, reject) => {
      if (password.length >= 8) {
        resolve();
      }
      else {
        reject({ status: 400, message: '密碼至少8個字', account: account });
      }
    });
  };

  const createAccount = () => {
    const Account = new accountModel({ account, password });
    return Account.save();
  }

  const handleSuccess = () => {
    res.redirect('/login');
  }

  const handleError = (error) => {
    if (error.status) {
      res.render('signUp', { tempAccount: error.account, errorMes: error.message });
    }
    else {
      console.log(error);
      res.render('signUp', { tempAccount: error.account, errorMes: '錯誤' });
    }
  }
  // Check account length
  db()
    .then(isAccountValid)
    .then(isAccountUnique) // Check if account is unique
    .then(isPasswordValid)
    .then(createAccount) // Create account
    .then(handleSuccess)
    .catch(handleError)
    .finally(() => {
      mongoose.disconnect();
    });




})

router.post('/login', (req, res) => {
  //#region  本地log檔
  // let id = shortid.generate();
  // const reqBodyWithId = {
  //   id,
  //   ...req.body
  // };
  // let reqbody = requestBody = JSON.stringify(reqBodyWithId, null, 2);
  //#endregion fs.appendFileSync(path.resolve(__dirname, '../accounts.log'), reqbody);

  // 傳遞帳戶資訊給mongodb


  res.redirect('/');
});

module.exports = router;  