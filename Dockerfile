# 使用 Node.js 官方境像做為基礎境像
FROM node:latest

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json 
COPY package*.json ./

# 安裝依賴包
RUN npm install

# 將資料傳到境象中
COPY . .

EXPOSE 3000

# 启动应用
CMD ["npm", "start"]  # 替换 server.js 为你的入口文件
