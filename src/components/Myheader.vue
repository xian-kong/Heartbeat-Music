<template>
  <div class="mh-container">
  <!--头部    -->
    <!-- 头部导航栏 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" class="clearbottom" disabled="">HeartBeat</el-menu-item>
      <el-menu-item index="2" class="clearbottom">心动音乐馆</el-menu-item>
      <el-menu-item index="3" class="clearbottom">我的音乐</el-menu-item>
      <el-menu-item index="4" disabled>音乐号</el-menu-item>
      <el-menu-item 
      index="5" 
      class="clearbottom"
      @click="showlog"
      v-show="!login"
      >
      <!-- v-show="!login" -->
        <span>登录</span>
      </el-menu-item>
      <el-submenu index="5" v-show="login">
        <template slot="title">
          <a href="javascript:;" class="userimg">
          <img :src="imageUrl1" alt="">
          </a>
        </template>
        <el-submenu index="5-1">
          <template slot="title">我的资料</template>
          <el-menu-item 
          index="5-1-1"
          @click="dialogVisible=true">修改头像</el-menu-item>   
          <el-menu-item index="5-1-2">修改昵称</el-menu-item>
        </el-submenu>
        <el-menu-item index="5-2">我的关注</el-menu-item>
        <el-menu-item index="5-3" @click="logout">退出</el-menu-item>
        
      </el-submenu>
      <el-menu-item 
      index="6" 
      class="clearbottom"
      @click="showreg"
      v-show="!login"
      >注册</el-menu-item>
      <el-menu-item index="7" class="clearbottom">
        <!-- 输入框 -->
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
        size="small">
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
          @click="handleIconClick">
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr">{{ item.address }}</span>
        </template>
      </el-autocomplete>
      </el-menu-item>
    </el-menu>
    <!-- 修改头像对话框 -->
    <el-dialog
    title="上传头像"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
      <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-progress="showload"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i 
        v-else 
        class="el-icon-plus avatar-uploader-icon"
        v-loading="loadingA"
        ></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadA">上 传</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import config from '../config'
  export default {
    data() {
      return {
        activeIndex: '2',
        restaurants: [],
        state: '',
        dialog:true,
        login:false,
        imageUrl: '',
        imageUrl1: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        dialogVisible: false,
        avatarChange:false,
        loadingA:false,
        uploadurl:config.CONSTANT.BASEURL+config.CONSTANT.UPLOADURL,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" }
        ];
      },
      handleSelect(item) {
        // console.log(item);
      },
      handleIconClick(ev) {
        // console.log(ev);
      },
    // 通过媒介bus向兄弟登录组件发送数据
      showlog(){
        this.bus.$emit('logbus',this.dialog);   
      },
    // 通过媒介bus向兄弟注册组件发送数据
      showreg(){
        this.bus.$emit('regbus',this.dialog)
      },
      letuserImg(l){
        this.login=l;
      },
      logout(){
        this.login=false;
        localStorage.removeItem("loginstate");
        // localStorage.removeItem("rememberPass");
      
        this.$message({
            message: '您已退出登录哦',
            center:true,
            duration:1000,
            offset:200
        });
        location.reload();
      },
      // 修改头像弹出的对话框
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 头像上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(666,res)
        console.log(777,file)
      },
      beforeAvatarUpload(file) {
        const isIMG=['image/jpg','image/jpeg','image/png','image/gif'].includes(file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isIMG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isIMG && isLt2M;
      },
      uploadA(){
        this.dialogVisible = false;
        this.imageUrl1=this.imageUrl;
        this.$message({
          message: '头像更新成功',
          center:true,
          duration:1000,
          offset:200
        })
        // 上传用户头像到数据库
        // var phone=localStorage.getItem("lsphone");
        // this.axios.get(
        //   "/user/avatar",
        //  {
        //   params:{
        //     phone:phone,
        //     avatar:this.imageUrl1
        //   }  
        //  }  
        // ).then(
        //   this.$message({
        //     message: '头像更新成功',
        //     center:true,
        //     duration:1000,
        //     offset:200
        //   })
        // ); 
        // localStorage.setItem("imgurlLocal",this.imageUrl1);
      },
      // 头像加载中效果
      showload(){
        this.loadingA=true; 
      }
    },
    // 接收登录状态并决定是否显示用户头像
    created(){
      this.bus.$on('logstate',this.letuserImg.bind(this)); 
    },
    mounted() {
      this.restaurants = this.loadAll();
      // 尝试从浏览器的localstorage或者sessionstorage中获取imageUrl1变量
      // 两者都不会受网页影响的，属于浏览器的存储机制
      var phone=localStorage.getItem("lsphone");
      // console.log(this.imageUrl1);
      // 将登录状态存入到localStorage中
      this.login=localStorage.getItem("loginstate");
      
    }
  }
</script>
<style>
  .clearbottom{
    border-bottom: 0 !important;
  }
  .mh-container .el-menu.el-menu--horizontal {
    justify-content: center;
    display: flex;
    border-bottom: 0;
  }
  .mh-container .el-menu-item.is-disabled {
    opacity: 1;
    cursor: default;
    background: 0 0!important;
  }
  /* 用户头像栏 */
  .userimg{
    display: flex;
    align-items: center;
  }
  .userimg img{
    width:50px;
    height:50px;
    border-radius: 50%;
    /* box-shadow: 0px 0px 5px 0px #fff; */
  }
  .mh-container .el-menu--horizontal>.el-submenu .el-submenu__title{
    display: flex !important;
  }
  .mh-container .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
    display: flex !important;
    align-items: center !important;
  }
  /* .userimg img:hover{

  } */
  /* 头像上传 */
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #1abf9e;
    color: #1abf9e;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    border-radius: 50%;
    display: block;
  }
  .el-icon-plus.avatar-uploader-icon{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>