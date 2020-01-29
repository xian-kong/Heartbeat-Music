<template>
  <div class="rg-container" @click="btnclose($event,'ruleForm')">
    <el-drawer
    title="注册"
    :visible.sync="regdialog"
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
        <!-- 昵称输入框 -->
          <el-form-item 
          label="昵称" :label-width="formLabelWidth"
          prop="uname"
          >
            <el-input v-model="ruleForm.uname" autocomplete="off"></el-input>
          </el-form-item>
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
            <el-input v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
        <!-- 密码确认框 -->
          <el-form-item 
          label="确认密码" :label-width="formLabelWidth"
          type="password"
          prop="checkpass"
          >
            <el-input v-model="ruleForm.checkpass" autocomplete="off"></el-input>
          </el-form-item>
        <!-- 邮箱输入框 -->
          <el-form-item 
          label="邮箱" :label-width="formLabelWidth"
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
          >
            <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  class="demo-drawer__footer">
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button class="quxiao" @click="resetForm('ruleForm')">取 消</el-button>
          </el-form-item>
        </el-form>
        <div class="reglink">
          <el-link :underline="false" @click="showlog('ruleForm')">已有账号？去登录</el-link>
        </div>
      </div>
    </el-drawer>

  </div>
</template>
<script>
export default {
  data() {
    // 昵称验证
    var validateUname = (rule, value, callback)=>{
      var reg=/^[a-zA-Z\u4e00-\u9fa5]{1,10}$/;
      if (value === '') {
        callback(new Error('请输入昵称'));
      }else if(!reg.test(value)){
        callback(new Error('昵称格式不正确'));
      }else{
        callback();
      }
    };
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
    // 确认密码框验证
    var validatePass2 = (rule, value, callback)   =>{
      var reg=/^\w{6,12}$/;
      if (value === '') {
        callback(new Error('请再次输入密码'));
      }else if(value!==this.ruleForm.pass){
        callback(new Error('两次输入密码不一致！'));
      }else{
        callback();
      }
    };
    return {
      regdialog: false,
      RtoL:true,
      ruleForm: {
        phone:'',
        pass: '',
        checkpass: '',
        uname:'',
        email:''
      },
      rules: {
        pass: [{ 
            validator: validatePass, 
            trigger: 'blur',
            required:true
        }],
        phone:[{ 
            validator: validatePhone, 
            trigger: 'blur',
            required:true
        }],
        checkpass: [{ 
            validator: validatePass2, 
            trigger: 'blur',
            required:true
        }],
        uname: [{ 
            validator: validateUname, 
            trigger: 'blur',
            required:true
        }],
      },
      formLabelWidth: '80px',
    };
  },
  methods: {
    btnclose(event,formName){
      if(event.target.className==="el-dialog__close el-icon el-icon-close"){
         this.$refs[formName].resetFields(); 
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.axios.post(
          "/user/reg",
          this.Qs.stringify({
            uname:this.ruleForm.uname,
            phone:this.ruleForm.phone,
            pass:this.ruleForm.pass,
            email:this.ruleForm.email
          })
          //在运行时，被翻译为"uname=dingding&upwd=22222"
        ).then(result=>{
          //result.data才是服务器返回的结果
          if(result.data.code==200){
            console.log(result.data)
            this.$message({
              message: '您已注册成功',
              center:true,
              duration:1000,
              offset:200
            });
            this.showlog();
          }else{
            this.$message({
              message: '昵称或者手机号已存在，请重新输入',
              center:true,
              duration:1000,
              offset:200
             });
            this.ruleForm.uname='';
            return false;
          }
        })    
      });
    },
    resetForm(formName) {
      this.regdialog = false;
      this.$refs[formName].resetFields(); 
    },
    showreg(r){
      this.regdialog = r;
      console.log("注册")
    },
    showlog(formName){
      var loginstate=localStorage.getItem("loginstate");
      if(!loginstate){
        this.bus.$emit('logbus',this.RtoL);
        this.regdialog=false;
        this.$refs[formName].resetFields();
      }else{
        this.$message({
          message: '您已处于登录状态，请勿重复登录',
          center:true,
          duration:1000,
          offset:200
          });
      }
       
    }
  },
  created(){
    // 接收header组件 login组件传递的打开注册页命令
    this.bus.$on("regbus",this.showreg.bind(this))
  }
}
</script>
<style scoped>
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
  text-align: center;
}
.reglink .el-link.el-link--default:hover{
  color: #10c6a3;
}

.rg-container .el-button--primary{
  background: #10c6a3 !important;
  border-color: #10c6a3 !important;
}
.rg-container .el-button--primary:focus, .rg-container .el-button--primary:hover{
  background: #15967c !important;
  border-color: #15967c !important;
}
.rg-container .el-button.quxiao:focus, 
.rg-container .el-button.quxiao:hover {
  color: #fff !important;
  border-color: #545c64 !important;
  background-color: #545c64 !important;
}
</style>
