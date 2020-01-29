<template>
  <div>
    <!-- 主页导航栏 -->
    <!-- 主色调rgb(26, 191, 158)  #1abf9e -->
  <el-menu
  :default-active="activeIndex2"
  class="pricolor el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
    <el-menu-item index="1">推荐</el-menu-item>
    <el-menu-item index="2">歌手</el-menu-item>
    <el-menu-item index="3">新碟</el-menu-item>
    <el-menu-item index="4">排行榜</el-menu-item>
    <el-menu-item index="5">分类歌单</el-menu-item>
    <el-menu-item index="6">电台</el-menu-item>
    <el-menu-item index="7">MV</el-menu-item>
  </el-menu>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
  .el-menu--horizontal>.el-menu-item {
    height: 36px;
    line-height: 36px;
    display: flex !important;
    justify-content: center !important;
  }
  .pricolor el-menu--horizontal el-menu{
    background-color: #1abf9e !important;
  }
  .pricolor.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: #1abf9e;
  }
</style>