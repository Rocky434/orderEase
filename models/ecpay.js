const ecpay_payment = require('ecpay_aio_nodejs');
require('dotenv').config();
const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;

// 綠界後台與付款功能設定
const options = {
    OperationMode: 'Test', //Test or Production
    MercProfile: {
        MerchantID: MERCHANTID,
        HashKey: HASHKEY,
        HashIV: HASHIV,
    },
    IgnorePayment: [
        //    "Credit",
        //    "WebATM",
        //    "ATM",
        //    "CVS",
        //    "BARCODE",
        //    "AndroidPay"
    ],
    IsProjectContractor: false,
};






// inst分期期數
function setPayment() {

    // 唯一的交易碼，請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    let TradeNo = 'test' + new Date().getTime();

    // 日期
    let MerchantTradeDate = new Date().toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    });

    // 基本商品設定
    let base_param = {

        MerchantTradeNo: TradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
        MerchantTradeDate, //ex: 2017/02/13 15:45:30
        TotalAmount: '100',
        TradeDesc: '測試交易描述',
        ItemName: '測試商品等',
        ReturnURL: `${HOST}/return`,
        ClientBackURL: `${HOST}/clientReturn`,
        // ChooseSubPayment: '',
        // OrderResultURL: 'http://192.168.0.1/payment_result',
        // NeedExtraPaidInfo: '1',
        // ClientBackURL: 'https://www.google.com',
        // ItemURL: 'http://item.test.tw',
        // Remark: '交易備註',
        // HoldTradeAMT: '1',
        // StoreID: '',
        // CustomField1: '',
        // CustomField2: '',
        // CustomField3: '',
        // CustomField4: ''
    }

    // 發票設定
    let inv_params = {
        // RelateNumber: 'PLEASE MODIFY',  //請帶30碼uid ex: SJDFJGH24FJIL97G73653XM0VOMS4K
        // CustomerID: 'MEM_0000001',  //會員編號
        // CustomerIdentifier: '',   //統一編號
        // CustomerName: '測試買家',
        // CustomerAddr: '測試用地址',
        // CustomerPhone: '0123456789',
        // CustomerEmail: 'johndoe@test.com',
        // ClearanceMark: '2',
        // TaxType: '1',
        // CarruerType: '',
        // CarruerNum: '',
        // Donation: '2',
        // LoveCode: '',
        // Print: '1',
        // InvoiceItemName: '測試商品1|測試商品2',
        // InvoiceItemCount: '2|3',
        // InvoiceItemWord: '個|包',
        // InvoiceItemPrice: '35|10',
        // InvoiceItemTaxType: '1|1',
        // InvoiceRemark: '測試商品1的說明|測試商品2的說明',
        // DelayDay: '0',
        // InvType: '07'
    }

    const create = new ecpay_payment(options);
    create.payment_client
    const html = create.payment_client.aio_check_out_all(parameters = base_param, invoice = inv_params)

    return html;
}

// 檢核碼驗證方法:https://developers.ecpay.com.tw/?p=2902
// 驗證檢核碼
function checkMacValue(req) {
    console.log('req.body:', req.body);

    const { CheckMacValue } = req.body;
    const data = { ...req.body };
    delete data.CheckMacValue; // 此段不驗證

    const create = new ecpay_payment(options);
    const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

    console.log(
        '確認交易正確性：',
        CheckMacValue === checkValue,
        CheckMacValue,
        checkValue,
    );

    return CheckMacValue === checkValue;


}
module.exports = { setPayment, checkMacValue };