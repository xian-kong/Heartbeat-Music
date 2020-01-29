<template>
  <div>
    <!-- 注册 -->
    <hb-reg></hb-reg>
    <!-- 登录 -->
    <hb-login></hb-login>
    <!-- 主页导航栏 -->
    <!-- 主色调rgb(26, 191, 158)  #1abf9e -->
    <nav-one class="topindex"></nav-one>
    <!-- 轮播图一 -->
    <carousel-one></carousel-one>
    <!-- 热门推荐 -->
    <hot-rec></hot-rec>
    <!-- 榜单   -->
    <rank-list></rank-list> 
    <!-- 底部 -->
    <my-footer></my-footer>
    <!-- 播放器 -->
    <music-player></music-player>
  </div>
</template>
<script>
  import Navone from "../components/Navone"
  import Carouselone from "../components/Carouselone"
  import Hotrec from "../components/Hotrec"
  import Ranklist from "../components/Ranklist"
  import Myfooter from "../components/Myfooter"
  import Musicplayer from "../components/Musicplayer"
  import Reg from "../components/Reg"
  import Login from "../components/Login"
  export default {
    data() {
      return {
      };
    },
    methods: {
     
    },
    components:{
      "nav-one":Navone,
      "carousel-one":Carouselone,
      "hot-rec":Hotrec,
      "rank-list":Ranklist,
      "my-footer":Myfooter,
      "music-player":Musicplayer,
      "hb-login":Login,
      "hb-reg":Reg,
    }
  }
</script>
<style scoped>
  
</style>