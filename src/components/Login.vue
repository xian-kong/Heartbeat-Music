<template>
  <div class="lg-container" @click="btnclose($event,'ruleForm')">
    <el-drawer
    title="登录"
    :visible.sync="logdialog"
    direction="ltr"
    custom-class="demo-drawer"
    ref="drawer"
    size="30%"
    :wrapperClosable="false"
    > 
      <div class="demo-drawer__content">
        <el-form 
        :model="ruleForm" 
        status-icon 
        :rules="rules" ref="ruleForm" label-width="100px" 
        class="demo-ruleForm"
        >
        <!-- 手机号输入框 -->
          <el-form-item 
          label="手机号" :label-width="formLabelWidth"
          prop="phone"
          >
            <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
          </el-form-item>
        <!-- 密码输入框 -->
          <el-form-item 
          label="密码" :label-width="formLabelWidth"
          type="password"
          prop="pass"
          >
            <el-input 
            v-model="ruleForm.pass" autocomplete="off"
            type="password"
            show-password></el-input>
          </el-form-item>
          <el-form-item  class="demo-drawer__footer">
            <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
            <el-button class="quxiao" @click="resetForm('ruleForm')">取 消</el-button>
          </el-form-item>
        </el-form>

      
        
        <div class="reglink">
        <!-- 记住密码 -->
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <el-link :underline="false" @click="showreg('ruleForm')">没有账号？去注册</el-link>
        </div>
        
      </div>
        
    </el-drawer>
    
  </div>
  
</template>
<script>
import {mapActions,mapState,mapMutations} from "vuex"

export default {
  data() {
    // 手机号验证
    var validatePhone = (rule, value, callback)=>{
      var reg=/^1[3-9]\d{9}$/;
      if (value === '') {
        callback(new Error('请输入手机号'));
      }else if(!reg.test(value)){
        callback(new Error('手机号格式不正确'));
      }else{
        callback();
      }
    };
    // 密码验证
    var validatePass = (rule, value, callback)   =>{
      var reg=/^\w{6,12}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(!reg.test(value)){
        callback(new Error('密码格式不正确'));
      }else{
        callback();
      }
    }; 
    
    return {
      logdialog: false,
      LtoR:true,
      islogin:false,
      checked:false,
      remembered:false,
      // avatarDefault:require('../../public/imgs/avatar/avatar_default.jpg'),
      ruleForm: {
        phone:'',
        pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
      },
      formLabelWidth: '80px',
    };
  },
  methods: {
    // 点击关闭按钮清空表单内容以及验证效果
    btnclose(event,formName){
      if(event.target.className==="el-dialog__close el-icon el-icon-close"){
          this.$refs[formName].resetFields();
      }
     
    },
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) =>{
          // 登录前先判断localStorage中是否有loginstate，有的话提示您的账户已登录
          if(this.loginstate){
              this.$message({
              message: '您的账户已登录！',
              center:true,
              duration:2000,
              offset:200
            });
        }else{
          this.axios.get(
            "/user/log",
            {
              params:{
                phone:this.ruleForm.phone,
                pass:this.ruleForm.pass
              }
            }
          ).then(result=>{
            //result.data才是服务器返回的结果
            console.log(result.data)
            if(result.data.code===200){
              // 登录成功后将登录成功的状态存储到localStorage中
              
              // 登录成功后查询用户头像信息存储到localStorage中
              // this.axios.get(
              //   "/user/detail",
              //   {
              //     params:{
              //       phone:this.ruleForm.phone
              //     }  
              //   }  
              // ).then(result=>{
              //   console.log( result.data.avatar)
                // 如果发现用户头像未上传过，也就是第一次登录，设置为默认头像
                // if(!result.data.avatar){
                //   localStorage.setItem("imgurlLocal",avatarDefault);
                // }else{
                  // 否则就将其之前上传过的最新头像存到localStorage
                //   localStorage.setItem("imgurlLocal",result.data.avatar);
                // }
              // });
              // 登录成功后将用户信息存储到localStorage中
              var userarr=result.data.msg;
              localStorage.setItem("lsphone",userarr.phone);
              localStorage.setItem("lspass",userarr.pass);
            
              if(this.checked){
                localStorage.setItem("remembered",this.checked);
              }else{
                localStorage.removeItem("remembered");
                localStorage.removeItem("lspass");
              }
              console.log("登陆时",this.checked)
             
              // sessionStorage.setItem("lsphone",userarr.phone);
              // sessionStorage.setItem("lspass",userarr.pass);
              // localStorage.setItem("imgurlLocal",this.avatarDefault);
              // 发送登录成功消息
              this.$message({
                message: '欢迎回到Heartbeat，听您心动的音乐',
                center:true,
                duration:2000,
                offset:200
              });
             
              this.resetForm('ruleForm'); 
              setTimeout( ()=>{
                location.reload()
                this.islogin=true;
                this.postlog();
              },1500)
            }else{
              // 登录失败
              this.$message({
                message: '账户不存在，请注册后重新登录',
                center:true,
                duration:2000,
                offset:200
              })
            }
          })
        }
      });
    },
    // 重置页面函数
    resetForm(formName) {
      this.logdialog = false;
      this.$refs[formName].resetFields();
     
    },
    showlog(l){
      this.logdialog = l; 
      this.checked=localStorage.getItem("remembered");
      console.log(this.checked)
      if(localStorage.getItem("remembered")){
        this.checked=true;   
      }else{
         this.checked=false;
       }
      this.ruleForm.phone=localStorage.getItem("lsphone")||'';
      this.ruleForm.pass=localStorage.getItem("lspass")||'';   
    },
    showreg(formName){
      this.bus.$emit('regbus',this.LtoR);
      this.logdialog=false;
      this.$refs[formName].resetFields();
    },
  // 向myheader组件传递登录状态信息
    postlog(){
      this.bus.$emit('logstate',this.islogin);
      localStorage.setItem("loginstate",this.islogin);
    },
    // 选择记住密码就永久存储，并显示在输入框
      // dopass(){
      //   setTimeout(()=>{
      //     console.log(this.checked);
      //     localStorage.setItem("remembered",this.checked);
      //   })
      // },
    // dopass(e){
    //   setTimeout(()=>{
    //     console.log(this.checked)
    //     // if((e.target.className==="el-checkbox__original")||(e.target.className==="el-checkbox__label")){
    //     //   }
    //     localStorage.setItem("remembered",this.checked);       
    //     }
    //       ,500)
    // },
    // 清除lspass永久缓存
    // clearlspass(){
    //   localStorage.removeItem("lspass");
    //   localStorage.removeItem("remembered");
    // }

    // vuex尝试
  //   logout(){
  //     this.setPhone("");
  //   },
  // //去vuex的actions中取出login函数放到此地
  //   ...mapActions([
  //     "login"
  //   ]),
  // //去vuex的mutations中取出setPhone函数放到此地
  //   ...mapMutations([
  //     "setPhone"
  //   ])
  },
  computed:{
  //去vuex的state中取出phone变量放到此地
    // ...mapState(["phone","pass"])
    // checked(){
    //   var remembered=localStorage.getItem("remembered");
    //   return remembered;
    // }
  },
  
  created(){
    // 接收header组件 reg组件传递的打开注册页命令
    this.bus.$on("logbus",this.showlog.bind(this))
    console.log(1)
  },
  mounted(){
    // var remembered=localStorage.getItem("remembered");
    // if(!this.remembered){
    //   localStorage.removeItem("lspass");
    // }
    // this.ruleForm.phone=localStorage.getItem("lsphone")||'';
    // this.ruleForm.pass=localStorage.getItem("lspass")||'';
    
    // this.checked=localStorage.getItem("remembered");
    // console.log("加载",this.checked)
   //应该吧用户的状态存到数据库
    // if(!this.checked){
    //   this.clearlspass()
    // }
    console.log(this.checked)
  },
  updated(){
    
  }
}
</script>
<style>
.el-input{
  width: 90% !important;
}
.el-menu-item.is-disabled {
  opacity: 1;
  cursor: default;
  background: 0 0!important;
}
.el-drawer__header{
    background-color: #545c64 !important;
    color: #fff !important;
    padding: 20px !important;
    text-align: center;
    font-size: larger;
}
.el-drawer__close-btn,
.el-drawer__header>:first-child{
  outline: 0 !important;
}
.demo-drawer__footer .el-form-item__content{
  text-align: center;
  margin:0 !important;
}
.reglink{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.reglink .el-checkbox:last-of-type{
  margin-bottom: 0;
}
.reglink .el-link.el-link--default:hover{
  color: #10c6a3;
}
.lg-container .el-button--primary{
  background: #10c6a3 !important;
  border-color: #10c6a3 !important;
}
.lg-container .el-button--primary:focus, .lg-container .el-button--primary:hover{
  background: #15967c !important;
  border-color: #15967c !important;
}
.lg-container .el-button.quxiao:focus,
.lg-container .el-button.quxiao:hover {
  color: #fff !important;
  border-color: #545c64 !important;
  background-color: #545c64 !important;
}
</style>
