# 使用 Node.js 官方镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm install

# 将项目文件复制到镜像中
COPY . .

# 暴露端口（如果你的应用使用了某个端口，替换 3000 为你的实际端口）
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]  # 替换 server.js 为你的入口文件
