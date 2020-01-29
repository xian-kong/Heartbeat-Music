const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象 
var router=express.Router();
//添加路由
//1.注册的路由
router.post('/reg',function(req,res){
  //获取数据
  var obj=req.body;
  // 验证昵称和手机号是否已存在
  pool.query('SELECT uid FROM hb_user WHERE uname=? OR phone=?',[obj.uname,obj.phone],function(err,result){
    if(err) throw err;
    if(result.length>0){//查询到了
      res.send({code:301,msg:'昵称已存在'});
    }else{
      //执行SQL语句 
      pool.query('INSERT INTO hb_user SET ?',[obj],function(err,result){
        if(err) throw err;
        console.log(result);
        if(result.affectedRows>0){
          //插入成功
          res.send({code:200,msg:'register suc'});
        }
      })
    }
  });
})
//2.登录的路由
router.get('/log',function(req,res){
  //获取数据
  var obj=req.query;
  console.log(obj);
  //执行SQL语句
  pool.query('SELECT uid FROM hb_user WHERE phone=? AND pass=?',[obj.phone,obj.pass],function(err,result){
    if(err) throw err;
    console.log(result);
    //判断是否登录成功
    if(result.length>0){//查询到了
      // 登录成功后将登录凭证id保存session对象
      //获取当前登录用户id
      //result[{id:3}]
      var uid = result[0].uid;
      //将用户id保存session对象
      req.session.uid = uid;
      console.log(req.session);
      res.send({code:200,msg:obj});

      
    }else{//没有查询到
      res.send({code:302,msg:'uname or pass err'});
    }
  });
});

//.修改头像
router.get('/avatar',function(req,res){
  //获取数据
  var obj=req.query;
  console.log(obj);     
//执行SQL语句
  pool.query('UPDATE hb_user SET avatar=? WHERE phone=?',[obj.avatar,obj.phone],function(err,result){
    if(err) throw err;
    //console.log(result);
    //判断是否修改成功
    if(result.affectedRows>0){
      res.send({code:200,msg:obj});
    }else{
      res.send({code:301,msg:'update err'});
    }
  });
});

//4.检索用户
router.get('/detail',function(req,res){
  //4.1获取数据
  var obj=req.query;
 
  //4.3执行SQL语句
  pool.query('SELECT * FROM hb_user WHERE phone=?',[obj.phone],
    function(err,result){
      if(err) throw err;
      console.log(result);
      //如果检索到用户
      if(result.length>0){
        res.send( result[0] );
      }else{//没有检索到
        res.send({code:301,msg:'not found'});
      }; 
  });
});
//导出路由器对象
module.exports=router;