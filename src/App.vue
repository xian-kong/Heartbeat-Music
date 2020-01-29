<template>
  <div id="app">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>
<script>
import "./assets/css/common.css"

export default {
  components:{
 
  },
  methods:{
    
  }
}
</script>
<style>
  /* 页头样式修改 */
  .el-menu-item * {
    vertical-align: unset !important;
  }
  /* 主页导航样式修改 */
  .el-menu.el-menu--horizontal {
    justify-content: center;
    display: flex;
  }
  .pricolor.el-menu.el-menu--horizontal {
    background-color: #1abf9e !important;
  }
  .pricolor.el-menu--horizontal .el-menu-item[data-v-b6f3e9da]:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item[data-v-b6f3e9da]:not(.is-disabled):hover  {
    outline: 0;
    background-color: #15967c !important;
  }
  /* #15967c */
  .el-menu--horizontal>.el-menu-item[data-v-b6f3e9da]{
    background-color: #1abf9e !important;
  }
  /* 热门推荐样式 */
  .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  font-weight: 700;
  font-size: larger;
}
</style>
