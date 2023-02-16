/*
 * @Author: cwj
 * @Date: 2023-02-13 03:41:10
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-17 04:06:47
 * @Introduce:
 */
// 导入Express模块，并创建Express应用程序对象
var express = require("express");
const mysql = require("mysql"); // 引入mysql模块
const bodyParser = require("body-parser");
var app = express();

//设置body-parser的中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let con = mysql.createConnection({
  // 配置mysql数据库
  host: "localhost", // 主机名
  port: "3306", // 默认端口
  user: "root", // 连接的名字
  password: "666888", // 连接的密码
  database: "member", // 连接的数据库
});

con.connect(); // 与数据库建立连接

//helloWord
app.post("/api/helloWorld", function (req, res) {
  res.json({ msg: "hello world" });
});

//登陆
app.post("/api/login", function (req, res) {
  const phone = req.body.phone;
  const password = req.body.password;
  const sql = `select * from user where phone = ? and password = ?`;
  con.query(sql, [phone, password], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("登录失败，请稍后重试!");
    } else if (results.length === 0) {
      res.status(401).send("不合法的登录！");
    } else {
      res.json(results[0]);
    }
  });
});

//注册
app.post("/api/register", (req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;
  const defaultNickname = "User" + Math.floor(Math.random() * 10000);
  con.query("SELECT * FROM user WHERE phone = ?", phone, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(400).send({ message: "该号码已被注册" });
    } else {
      const sql =
        "INSERT INTO user (phone, password, nickname) VALUES (?, ?, ?)";
        con.query(sql, [phone, password, defaultNickname], (err, result) => {
        if (err) throw err;
        res.send({ message: "注册成功" });
      });
    }
  });
});

  
//通过ID获取详细信息
app.get("/api/detail", function (req, res) {
  const phone = req.query.phone;
  const sql = `select * from user where phone = ?`;
  con.query(sql, [phone], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("获取信息失败。");
    } else if (results.length === 0) {
      res.status(401).send("无此信息！");
    } else {
      res.json(results[0]);
    }
  });
});

/** 实现统一的异常处理，catchFun参数可选 */
function process(req, res, fun, catchFun) {
  try {
    fun();
  } catch (e) {
    if (catchFun) {
      catchFun();
    } else {
      res.json({ result: false, msg: e.message });
    }
  }
}

function checkNotNull(str, msg) {
  if (!str) {
    throw new Error(msg);
  }
}

// 启动应用程序，并监听50424端口上的请求
var server = app.listen(50424, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("当前应用程序正在监听http://%s:%s", host, port);
});
