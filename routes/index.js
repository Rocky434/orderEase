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

router.post('/signUp', (req, res) => {
  db(() => {
    const { account, password } = req.body;

    const checkExistingAccount = () => {
      return Account.findOne({ account });
    };

    const createAccount = () => {
      const newAccount = new Account({ account, password });
      return newAccount.save();
    };

    const handleSuccess = (savedAccount) => {
      res.json({ success: true, message: 'Registration successful!', savedAccount });
    };

    const handleError = (error) => {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
    };

    checkExistingAccount()
      .then((existingAccount) => {
        if (existingAccount) {
          return Promise.reject({ status: 400, message: 'Account already exists. Please choose a different account.' });
        }

        // You can implement your own validation for password here
        if (!isValidPassword(password)) {
          return Promise.reject({ status: 400, message: 'Password is not valid.' });
        }

        return createAccount();
      })
      .then(handleSuccess)
      .catch((error) => {
        if (error.status) {
          res.status(error.status).json({ success: false, message: error.message });
        } else {
          handleError(error);
        }
      });


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