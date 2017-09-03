/**
 * Created by 哈哈哈 on 2017/8/4.
 */
let MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://localhost:27017/1610';



MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    console.log(db);
});

//添加内容
let add = function(db,callback) {
    //连接到表 site

    let collection = db.collection('user');
    //插入数据
    let data = [{"name":"扬帆","sex":"男"},{"name":"魏天亮","sex":"随机"},{"name":"李佳伟","sex":"女"}];
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
};

//查询数据库全部内容
let find =  function (db,callback) {
  let collection = db.collection('610');
    whereStr = {"name":"扬帆"};
  collection.find(whereStr).toArray(function (err,result) {
      if(err)
      {
          console.log('Error:'+ err);
          return;
      }
      callback(result);
  })
};