<template>
  <!-- 热门推荐华语 | 流行 | 摇滚 | 民谣 | 电子 -->
  <div class="hr-cntainer">
    <!-- titlebar -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="热门推荐" :disabled="true"></el-tab-pane>
      <el-tab-pane label="流行" name="first">
        <!-- content -->
        <el-row :gutter="30">
          <el-col :span="6" v-for="(h, index) in hrlists" :key="index" :offset="0">
            <el-card :body-style="{ padding: '0px' }">
              <div class="cardimg" @click="playsong(index)">
                <img :src="'http://127.0.0.1:5050/imgs/' + h.hrpic" class="image" />
                <div class="imgcover iconfont icon-bofang-"></div>
              </div>
              <div style="padding: 14px;">
                <div class="tit">
                  <!-- :title="h.hrtit" -->
                  <span>{{ h.hrtit }}</span>
                  <el-button
                    type="text"
                    class="button iconfont icon-xinaixin1 likecolor"
                    :class="{ 'icon-xinaixin': hrlists[index].liked }"
                    @click="changeClass(index)"
               
                  ></el-button>
                </div>
                <div class="bottom clearfix">
                  <time class="time" :title="h.hrdetails">
                  </time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="华语" name="second">华语</el-tab-pane>
      <el-tab-pane label="摇滚" name="third">摇滚</el-tab-pane>
      <el-tab-pane label="民谣" name="fourth">民谣</el-tab-pane>
      <el-tab-pane label="电子" name="fifth">电子</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      currentDate: new Date(),
      hrlists: [],

      c: 0
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    changeClass(index) {
      this.hrlists[index].liked = !this.hrlists[index].liked;
      if (this.hrlists[index].liked) {
        this.$message({
          message: "已添加到我喜欢列表",
          center: true,
          duration: 1000,
          offset: 200
        });
      } else {
        this.$message({
          message: "已从我喜欢列表移除",
          center: true,
          duration: 1000,
          offset: 200
        });
      }
      console.log(index);
    },
    // 深克隆
    clone(obj) {
      if (obj === null) {
        return null;
      }
      if ({}.toString.call(obj) === "[object Array]") {
        var newarr = [];
        newarr = obj.slice();
        return newarr;
      }
      var obj = {};
      for (var key in obj) {
        if (obj[key] !== "object") {
          newarr[key] = arr[key];
        } else {
          clone(obj[key]);
        }
      }
    },
    // 给Musicplayer组件传hraudio的值，点击哪个卡片播放哪个
    playsong(index) {
      this.bus.$emit("playSong", this.hrlists[index].hraudio);
      // console.log("传index", index);
    },
    loadHr(){
      // 从数据库获取hot_rec歌曲信息
      this.axios.get("/song/detail").then(res => {
        // console.log(res.data);
        this.hrlists =res.data;
        // console.log(this.hrlists)
        // 给每个卡片对象添加喜欢的状态属性
        for (var i = 0; i < this.hrlists.length; i++) {
          this.$set(this.hrlists[i], "liked", false);
          // console.log(this.hrlists);
        }
      });
    }
  },
  computed: {},
  created() {
    // 从数据库获取hot_rec歌曲信息
    this.loadHr();
  }
};
</script>
<style>
/* titlebar */
.el-tabs__item.is-disabled:hover,
.el-tabs__item.is-disabled {
  color: #303133 !important;
}
.el-tabs__header {
  margin: 0 auto !important;
  width: 60% !important;
}
.el-tabs__item:hover,
.el-tabs__item.is-active {
  color: #1abf9e !important;
}
.el-tabs__active-bar {
  background-color: #1abf9e !important;
}
.tit span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.time {
  font-size: 13px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  padding: 2px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  border: 0 !important;
  outline: 0 !important;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
/* contentt */
.el-tabs__content {
  overflow: hidden;
  position: relative;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.cardimg {
  position: relative;
}
.cardimg .imgcover {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-out;
  color: rgba(26, 191, 158, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.cardimg:hover .imgcover {
  height: 100%;
  font-size: 60px;
  text-shadow: 0px 0px 5px 5px #fff;
}
.hr-cntainer .el-button--text {
  color: #ee5e7b !important;
  width: 20px;
}
.tit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}
</style>
