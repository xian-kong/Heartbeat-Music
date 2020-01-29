<template>
  <!-- 榜单 -->
  <div class="rl-container">
    <!-- titlebar -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="榜单" :disabled="true"></el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="8" v-for="(r, index) in ranknames" :key="index" :offset="0">
        <el-card class="box-card" :style="r.rc">
          <div slot="header" class="clearfix">
            <div>{{ r.rn }}</div>
            <el-button class="rkbt iconfont icon-bofang-" type="text" title="播放全部"></el-button>
          </div>
          <div
            v-for="(r, index) in rankDataF"
            :key="index"
            class="text item"
            style="padding:5px 5px;border-radius:10px"
          >
            <div class="dofont">
              <span class="rank-index">{{ index + 1 }}</span>
              <span class="index-tit">{{ r.rftit }}</span>
            </div>
            <div class="doicon">
              <span 
              class="iconfont icon-bofang rankicon" title="播放"
              style="margin-right:10px;"
              @click="playR(index)"></span>
              <span class="iconfont icon-jia rankicon" title="添加到收藏列表"></span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      rankDataF: [],
      ranknames: [
        {
          rn: "Heartbeat飙升榜",
          rc: "background-color:rgba(216,124,149,0.7)"
        },
        {
          rn: "Heartbeat新歌榜",
          rc: "background-color:rgba(108,152,179,0.7)"
        },
        {
          rn: "Heartbeat原创榜",
          rc: "background-color:rgba(115,188,177,0.7)"
        }
      ]
      // rankcolors:[
      //   "backgorund-color:rgba(216,124,149,0.7)",
      //   "backgorund-color:rgba(108,152,179,0.7)",
      //   "backgorund-color:rgba(115,188,177,0.7)",
      // ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    indexMethod(index) {
      return index + 1;
    },
    loadRankF() {
      this.axios.get("/rank/fdetail").then(res => {
        this.rankDataF = res.data;
        console.log(this.rankDataF);
      });
    },
    // 点击播放按钮会进行播放
    playR(index){
      this.bus.$emit("playSong",this.rankDataF[index].rftit);
    }
  },
  created() {
    this.loadRankF();
  }
};
</script>
<style>
/* 容器div */
.rl-container {
  width: 60%;
  margin: 0 auto;
}
@media screen and ( max-width: 1050px){
    .rl-container {
    width: 650px;
  }
}
/* titlebar */
.el-tabs__item.is-disabled:hover,
.el-tabs__item.is-disabled {
  color: #303133 !important;
}
.rl-container .el-tabs__header {
  width: 100% !important;
}
/* contentt */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.el-card__header {
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.text.item {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease-in;
}
.text.item:hover {
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 10px 0px;
}
.rl-container .clearfix {
  text-align: center;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.rank-index {
  margin-right: 10px;
}
.rl-container .el-button--text {
  color: #303133 !important;
  font-size: 1.5rem;
  padding: 3px 0;
  outline: 0 !important;
  transition: all 0.3s ease-out;
}
.rl-container .el-button--text:hover {
  font-size: 2.5rem;
  color: #1abf9e !important;
  text-shadow: 0px 0px 10px #000;
}
.rl-container .rankicon {
  font-size: 18px;
  color: #303133;
  font-weight: bold;
  transition: all 0.2s ease-out;
}
  
.rl-container .rankicon:hover {
  color: #1abf9e;
}
.dofont{
  display: flex;
  align-items: center;
  width: 70%;
  
}
.dofont .index-tit{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.doicon{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  opacity: 0;
  transition: all 0.3s ease-out;
}
.text.item:hover .doicon{
  opacity:1;
}
</style>
