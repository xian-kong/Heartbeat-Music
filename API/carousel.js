const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象 
var router=express.Router();
//添加路由
// 查询路轮播图信息的路由
router.get('/detail',function(req,res){
  //获取数据
  // var obj=req.query;
  //执行SQL语句
  var sql='SELECT cpic FROM carousel';
  pool.query(sql,
    function(err,result){
      if(err) throw err;
      // console.log(result);
      //如果检索到用户
      if(result.length>0){
        res.send( result );
      }else{//没有检索到
        res.send({code:-1,msg:'not found'});
      }; 
  });
});
//导出路由器对象
module.exports=router;