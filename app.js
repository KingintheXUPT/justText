/**
 * Created by 哈哈哈 on 2017/8/4.
 */
let express = require('express');


let app = express();
let port = process.env.PORT || 80;

let findAll = require('./models/findAll.js');


let server = app.listen(port,function (req,res) {

    let host = server.address().address;
    let port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

app.use('/findAll',function (req,res) {
   res.send("Hello");
   findAll();
});

