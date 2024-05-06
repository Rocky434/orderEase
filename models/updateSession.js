// 將餐點數量新增到session.cart中。
async function updataCartItemQuentity(req) {
    // 通過HTTP傳遞的數據通常是字符串形式，無論它們是數字、布靈還是其他類型。
    const { body } = req;
    const foodName = Object.keys(body);
    const value = parseInt(body[foodName]);
    //req.session.food : { salad: [0, 60], steak: [0, 220], salmon: [0, 250] } req.session.food.Value[0]是數量，value[1]是價格;
    // 避免負數
    if (req.session.food[foodName][0] + value >= 0) {

        req.session.food[foodName][0] += value;

        if (req.session.food[foodName][0] > 0) {
            // 第一次新增的食物，先新增數組後續才能存放資料。
            if (!req.session.cart[foodName]) {
                req.session.cart[foodName] = [];
            }

            req.session.cart[foodName][0] = req.session.food[foodName][0];
            req.session.cart[foodName][1] = req.session.food[foodName][1];
        }
    }
}

async function updateCartAndFoodItemQuentity(req) {
    const { body } = req;
    const { food } = req.session;

    //keys是前端回傳的索引值，索引指向session.cart的位置。
    const keys = Object.keys(body);
    // cartKeys是session.cart的json數列裡面的主鍵。
    const foodKeys = Object.keys(food);
    // 找出session.cart在keys位置的主鍵名稱，也就是食物名稱。
    const foodname = foodKeys[keys];
    // 食物的訂餐數量
    const values = parseInt(Object.values(body));

    // req.session.cart[foodname][0]是存放食物的訂餐數量，req.session.cart[foodname][1]是食物的價格
    req.session.food[foodname][0] += values;
}
module.exports = { updataCartItemQuentity, updateCartAndFoodItemQuentity };