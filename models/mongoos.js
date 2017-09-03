/**
 * Created by 哈哈哈 on 2017/8/15.
 */
let mongoose = require('mongoose');

//写出映射
let TestSchema = new mongoose.Schema({
    name : {type:String},
    sex : {type:String},
    age:{type:Number}
},{ versionKey: false }); //设置版本锁位false

TestSchema.set('collection','user'); //设置集合名字，否则名字后就加s

let db = mongoose.connect('mongodb://localhost:27017/1610',{useMongoClient: true,});

//写对应的“集合”地模型
let mongooseModel = db.model("user", TestSchema);

//实体
let TestEntity = new mongooseModel({
    name:"魏娘娘",
    sex:"女1"
});

// //一次插入多条文档
// mongooseModel.create(doc,function (err,candies) {
//     if(err){
//         console.log(err);
//     }
//     console.log(candies[0]);
//     console.log(candies[1]);
// });



//添加文档函数
let add = function (doc,callback) {
    mongooseModel.create(doc,function (err,candies) {
        if(err){
            console.log("err:"+err);
        }else {
            console.log("success");
        }

        if(callback){
            callback();
        }
    });
};

//删除文档函数
let del = function (docName,callback) {
    mongooseModel.remove({name:docName},function (err,res) {
        if(err){
            console.log("err:"+err);
        }else{
            console.log("res:"+res);
        }
        if(callback){
            callback();
        }
    })
};

//更新文档函数
let update = function (docName,newData,callback) {
  mongooseModel.update({name:docName},{$set:newData},[{update:true},{safe:true}],function (err,raw) {
      if(err){
          console.log("err:"+err);
      }else {
          console.log('The raw response from Mongo was ', raw);
      }
      if(callback){
          callback();
      }
  });
};

//查询文档函数(查询一个)
let findOne = function (docName,callback) {
    mongooseModel.findOne({name:docName},function (err,doc) {
        if(err){
            console.log("err:"+err);
        }else{
            console.log(doc);
        }
        if(callback){
            callback(doc);
        }
    })
};

//根据名称查询符合条件地所有文档（模糊查询）
let findAll = function (docName,callback) {
    mongooseModel.find({name:{$regex:eval("/"+docName+"/i")}},function (err,doc) {
        if(err){
            console.log("err:"+err);
        }else{
            console.log(doc);
        }
        if(callback){
            callback();
        }
    })
};

exports.add = add;
exports.del = del;
exports.update = update;
exports.findOne = findOne;
exports.findAll = findAll;
