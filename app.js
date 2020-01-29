//hb/server.js
//功能：服务器端程序
//1:下载四个模块
//  express			web服务器
//  mysql				mysql驱动
//  cors				处理跨域
//  express-session	会话session对象
//  vue_server_000/进入命令行
//  npm i mysql express express-session cors
//加载四个第三方模块
const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
//引入中间件
const bodyParser=require('body-parser');
//配置数据库连接池:基本效率高保证
//引入路由器
const userRouter=require('./API/user.js');
const songRouter=require('./API/song.js');
const carouselRouter=require('./API/carousel.js');
const rankRouter=require('./API/rank.js');
//创建web服务器
var app = express();
//配置跨域  允许程序列表
//  http://127.0.0.1:8080
//  http://localhost:8080
app.use(cors({
   origin:["http://127.0.0.1:8080","http://localhost:8080"],
   credentials:true  //每次请求验证
}))
//配置session环境
app.use(session({
   secret:"128位安全字符串",
   resave:true,         //请求更新数据 
   saveUninitialized:true//保存初始数据
}));
//配置静态目录 pubic
app.use(express.static("public"))
//启动监听端口  3000
app.listen(5050);
//使用body-parser中间件
app.use( bodyParser.urlencoded({
  extended:false
}) );
//在服务器下使用，并挂载到/user
//所有路由的url自动添加/user, /user/reg
app.use('/user',userRouter);
app.use('/song',songRouter);
app.use('/carousel',carouselRouter);
app.use('/rank',rankRouter);

//1:启动服务器 node server.js
//2:打开浏览器在址栏
//http://127.0.0.1:5050/login?uname=t&upwd=1
//http://127.0.0.1:5050/login?uname=tom&upwd=123
//http://127.0.0.1:5050/login?uname=tom&upwd=123






