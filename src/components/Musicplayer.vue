<template>
  <!-- 开关颜色 #ffd04b  messagebox  #303133-->
  <div class="mp-container">
    <div class="playbox" @mouseleave="boxhide" @mouseenter="boxshow" :style="boxstyle">
      <audio
        id="myaudio"
        :src="'http://127.0.0.1:5050/audio/'+toplays[i]"
        :autoplay="isauto"
        preload="meta"
      >您的浏览器不支持 audio 标签。</audio>
      <div class="playcontrol">
        <span class="iconfont icon-shangyiqu1" @click="prevsong"></span>
        <span class="iconfont playbt" v-bind:class="classObj1" @click="playcontrol"></span>
        <span class="iconfont icon-xiayiqu" @click="nextsong"></span>
      </div>
      <div class="process">
        <div class="processbar">
          <div class="sliderbox1">
            <div class="detail">
              <span class="songdetail">{{toplays[i]}}</span>
              <span class="timedetail">{{timedetail}}</span>
            </div>
            <el-slider v-model="value1" :show-tooltip="false" :format-tooltip="formatTooltip"></el-slider>
          </div>
        </div>
      </div>
      <div class="dealit">
        <span
          class="playstyle iconfont"
          :class="playstyles[ps]"
          @click="changeps"
          :title="styletits[ps]"
        ></span>
        <span class="iconfont" :class="likeit" @click="changelike" style="color:#EE5E7B"></span>
        <span class="iconfont icon-xiazai"></span>
        <!-- <span class="iconfont icon-pinglun"></span> -->
        <div class="voice">
          <div class="iconfont icon-shengyin volicon" @click="decideshow"></div>
          <div class="volslide" v-if="isshow">
            <el-slider v-model="value2" vertical height="80px"></el-slider>
          </div>
        </div>
        <el-switch v-model="value3" active-text="锁定"></el-switch>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 100,
      value3: false,
      toplays: [],
      playstyles: [
        "icon-shunxubofang-",
        "icon-xunhuanbofang",
        "icon-danquxunhuan",
        "icon-qiatong-suijibofang"
      ],
      styletits: ["顺序播放", "循环播放", "单曲循环", "随机播放"],
      ps: 0,
      "icon-bofang-": true,
      "icon-zanting-": false,
      "icon-xinaixin1": true,
      "icon-xinaixin": false,
      isstop: true,
      islike: true,
      isshow: false,
      i: 0,
      timedetail: "",
      isauto: false,
      boxstyle: {
        tranform: "translateY(70px)",
        opacity: "0"
      },
      door: true,
      timer1: ""
      // playdoor:false
    };
  },
  methods: {
    //当鼠标移到body下方边缘时，音乐播放器显示
    boxhide() {
      if (!this.value3) {
        this.timer1 = setTimeout(() => {
          this.boxstyle = {
            transform: "translateY(70px)",
            opacity: "0"
          };
        }, 1000);
      }
    },
    boxshow() {
      clearTimeout(this.timer1);
      this.boxstyle = {
        transform: "translateY(0px)",
        opacity: "1"
      };
    },
    // 滑块当前划到值
    formatTooltip(val) {
      return val / 100;
    },
    // 播放
    playit() {
      var myaudio = document.getElementById("myaudio");
      myaudio.play();
      this.isstop = false;
      this.isauto = true;
    },
    // 暂停
    stopit() {
      var myaudio = document.getElementById("myaudio");
      myaudio.pause();
      this.isstop = true;
      this.isauto = false;
    },
    // 控制播放键
    playcontrol() {
      var myaudio = document.getElementById("myaudio");
      if (myaudio.paused) {
        this.playit();
      } else {
        this.stopit();
      }
    },
    // 上一曲
    prevsong() {
      this.i--;
      if (this.i < 0) {
        this.i = this.toplays.length - 1;
      }
      console.log(this.i);
      if (!myaudio.paused) {
        this.playit();
      } else {
        this.stopit();
      }
    },
    // 下一曲
    nextsong() {
      this.i++;
      if (this.i > this.toplays.length - 1) {
        this.i = 0;
      }
      if (!myaudio.paused) {
        this.playit();
      } else {
        this.stopit();
      }
    },
    //时间规范函数
    timeStandard(t) {
      if (t < 10) {
        t = "00:0" + t;
      } else if (t >= 10 && t < 60) {
        t = "00:" + t;
      } else if (t % 60 < 10) {
        t = "0" + Math.floor(t / 60) + ":" + "0" + (t % 60);
      } else {
        t = "0" + Math.floor(t / 60) + ":" + (t % 60);
      }
      return t;
    },
    // 当操作滑块时改变myaudio.currentTime
    changect() {
      var sliderun = document.getElementsByClassName("el-slider__runway")[0];
      var myaudio = document.getElementById("myaudio");
      sliderun.addEventListener("click", () => {
        myaudio.currentTime = (this.value1 / 100) * myaudio.duration;
        console.log(555);
      });
      var slidebt = document.getElementsByClassName("el-slider__button")[0];
      // console.log(slidebt)
      slidebt.addEventListener("dragend", () => {
        myaudio.currentTime = (this.value1 / 100) * myaudio.duration;
        console.log(666666);
      });
    },
    //顺序播放
    playinOrder() {
      if (this.i == this.toplays.length - 1) {
        console.log(this.i);
        this.i = 0;
        this.stopit();
      } else {
        this.i++;
        this.playit();
      }
    },
    // 循环播放
    playinCircle() {
      this.i++;
      if (this.i > this.toplays.length - 1) {
        this.i = 0;
      }
      this.playit();
    },
    // 单曲循环
    playinSingle() {
      this.playit();
    },
    //随机播放
    playinRandom() {
      this.i = Math.floor(Math.random() * this.toplays.length);
      this.playit();
    },
    //记录音乐播放的当前时间
    getcTime() {
      var nowtime, l, x, t;
      var myaudio = document.getElementById("myaudio");
      nowtime = myaudio.currentTime.toFixed(0);
      l = myaudio.duration.toFixed(0);
      nowtime = this.timeStandard(nowtime);
      // console.log(nowtime)
      l = this.timeStandard(l);
      x = parseFloat((100 / myaudio.duration) * myaudio.currentTime);
      this.timedetail = nowtime + "/" + l;
      this.value1 = x;
      // 当播放结束时
      if (myaudio.ended) {
        this.isstop = true;
        console.log(this.i);
        //顺序播放
        if (this.ps == 0) {
          setTimeout(() => {
            this.playinOrder();
          }, 500);
        }
        // 循环播放
        if (this.ps == 1) {
          setTimeout(() => {
            this.playinCircle();
          }, 500);
        }
        //单曲循环
        if (this.ps == 2) {
          setTimeout(() => {
            this.playinSingle();
          }, 500);
        }
        if (this.ps == 3) {
          setTimeout(() => {
            this.playinRandom();
          }, 500);
        }
      }
    },
    // 改变音量
    changevol() {
      myaudio.volume = this.value2 / 100;
    },

    // 切换播放方式
    changeps() {
      this.ps++;
      if (this.ps > this.playstyles.length - 1) {
        this.ps = 0;
      }
    },

    // 收藏或者取消到我喜欢
    changelike() {
      this.islike = !this.islike;
      if (!this.islike) {
        this.$message({
          message: "已收藏到我喜欢列表",
          center: true,
          duration: 1000
        });
      } else {
        this.$message({
          message: "已从我喜欢列表移除",
          center: true,
          duration: 1000
        });
      }
    },
    // 控制音量框出现和隐藏
    decideshow() {
      this.isshow = !this.isshow;
    },
    // 接收兄弟组件传来的要播放哪首歌曲的信息
    letitplay(s) {
      this.boxshow();
      setTimeout(() => {
        this.boxhide();
      }, 1000);
      // es5中提供了函数arr.some()
      // var bool=arr.some(function(elem,i,arr){
      // return 判断条件
      // })
      for (var j = 0; j < this.toplays.length; j++) {
        if (this.toplays[j].split(" ").join("").indexOf(s.split(" ").join(""))>=0) {
          this.i = j;
          this.playit();
        }
      }
    },
    // 从数据库获取hot_rec歌曲audio信息
    loadAudio() {
      this.axios.get("/song/detail").then(res => {
        // console.log(res.data);
        // 获取res.data中每个对象的hraudio属性
        for (var i = 0; i < res.data.length; i++) {
          this.toplays[i] = res.data[i].hraudio;
        }
        // console.log(this.toplays)
      });
    }
  },
  computed: {
    // 图标class名切换
    classObj1() {
      return {
        "icon-bofang-": this.isstop,
        "icon-zanting-": !this.isstop
      };
    },
    likeit() {
      return {
        "icon-xinaixin1": this.islike,
        "icon-xinaixin": !this.islike
      };
    }
  },
  created() {
    this.bus.$on("playSong", this.letitplay.bind(this));
    this.loadAudio();
  },
  beforeMount() {},
  mounted() {
    setInterval(() => {
      this.getcTime();
    }, 1000);
    setInterval(() => {
      this.changevol();
    }, 500);
    this.changect();
  },
  beforeUpdate() {},
  updated() {
    console.log("更新");
  }
};
</script>
<style>
/* 音乐播放器 */
.playbox {
  min-width: 700px;
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-image: linear-gradient(90deg, #333 30%, #10c6a3);
  box-shadow: 0px 0px 20px 10px #444;
  transform: translateY(70px);
  transition: all 0.5s ease-out;
  z-index: 10;
}
.playbox:hover {
  box-shadow: 0px 0px 40px 10px #000;
}
.playcontrol {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.process {
  width: 40%;
  margin: 0 50px;
}
.process > .detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 15px;
  padding: 0 6px;
}
.processbar {
  width: 100%;
  position: relative;
}
.sliderbox1 .detail {
  display: flex;
  justify-content: space-between;
}
.playbox .el-slider__bar {
  background-color: #10c6a3 !important;
}
.playbox .el-slider__button {
  border: 2px solid #10c6a3;
}
.playbox .el-slider__runway {
  margin: 8px 0;
}
.playbox .songdetail,
.playbox .timedetail {
  font-size: 13px;
}
.dealit {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
span.icon-shangyiqu1,
span.icon-xiayiqu {
  font-size: 25px;
}
span.playbt {
  font-size: 40px;
  margin: 0 15px;
}
.dealit {
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  width: 280px;
}
.dealit span {
  width: 30px;
}
/* 音量控制 */
.voice {
  display: flex;
  flex-flow: column;
  position: relative;
  /* align-items: center; */
}
.voice:hover {
  text-shadow: 0px 0px 15px #000;
}

.voice .volslide {
  position: absolute;
  bottom: 35px;
  left: -7px;
  padding: 20px 0 10px 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 30px;
  transition: all 0.3s ease-out;
}
.volicon {
  width: 30px;
}
.vol_button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  margin-left: 70px;
}
/* 悬浮特效 */
.audio,
.process_button,
.volbar,
.vol_button {
  transition: box-shadow 0.2s ease-out;
  box-shadow: 0px 0px 0px 0px;
}
.processbar:hover .audio,
.process_button:hover,
.vol:hover .volbar,
.vol_button:hover {
  box-shadow: 0px 0px 6px 0.3px;
}
.songdetail,
.dealit span,
.playcontrol span {
  transition: text-shadow 0.2s ease-out;
  /* text-shadow: 0px 0px 0px #fff; */
}
.songdetail:hover,
.dealit span:hover,
.playcontrol span:hover {
  text-shadow: 0px 0px 5px #fff;
}
.playbox .el-switch.is-checked .el-switch__core {
  border-color: #ffd04b;
  background-color: #ffd04b;
}
.playbox .el-switch__label {
  color: #fff;
}
.playbox .el-switch__label.is-active {
  color: #ffd04b;
}
.el-message {
  background-color: #303133 !important;
  border-color: #303133 !important;
}
.el-message .el-icon-info,
.el-message--info .el-message__content {
  color: #fff !important;
}
/* @media screen and (min-width: 700px) {
  
} */
</style>