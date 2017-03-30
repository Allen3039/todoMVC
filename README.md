# todoMVC 0.0.1

> todo app

> 前端基于Vue.js 后端基于Node.js 的todo应用

## Features

###### 前端
* Vue.js 1.x
* Vue-resource

###### 后端
* Node.js
* mongoDB (mongoose)
* Express

###### 工具
* Webpack
* ES6
* stylus

## Setup
###### 环境
* Node.js **v6**
* mongoDB [Download](https://www.mongodb.com/download-center?jmp=nav#community)
[安装方法](https://docs.mongodb.com/manual/installation/)

安装完成并建立数据库文件夹后，进入mongodb根目录，启动mongdb
``` bash
mongod
```
进入项目目录
```
cd todoMVC
```
安装依赖
```
npm install
```

##运行
###### build模式
进入server目录
```
cd server
```
运行服务器文件server.js
```
node server.js
```
打开浏览器输入http://localhost:8081/index
###### dev模式(需要分别运行服务器端 和 客户端)
进入server目录
```
cd server
```
运行服务器文件server.js
```
node server.js
```
项目根目录下
```
npm run build
```
