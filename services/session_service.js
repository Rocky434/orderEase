
const createSession = async (req, accountId) => {
    req.session.sid = accountId;
    req.session.food = { salad: [0, 60], steak: [0, 220], salmon: [0, 250] };
}

const resetSessionFood = async (req) => {
    // 將點選的餐點初始化
    Object.keys(req.session.food).forEach(foodName => {
        req.session.food[foodName][0] = 0;
    });
}

module.exports = {
    createSession,
    resetSessionFood
}