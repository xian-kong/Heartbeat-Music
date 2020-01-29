<template>
  <div>
    <el-carousel :interval="4000" type="card" :height="bannerH+'px'">
      <el-carousel-item v-for="(c,item) in carousels" :key="item">
        <div style="color: #000000;text-align: center;overflow: hidden;width: 100%;">
          <img
            class="bannerimg"
            :src="'http://127.0.0.1:5050/imgs/'+c"
            alt
            style="width:100%;"
            :height="bannerH+'px'"
          />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carousels: [],
      bannerH: ""
    };
  },
  methods: {
    setbannerH() {
      this.bannerH = (window.innerWidth * 0.5) / (1048 / 432);
      console.log(this.bannerH);
    },
    // 从数据库获取轮播图信息
    loadCarousel() {
      this.axios.get("/carousel/detail").then(res => {
        console.log(res.data);
        // 获取res.data中每个对象的cpic属性
        for (var i = 0; i < res.data.length; i++) {
          this.$set(this.carousels, i, res.data[i].cpic);
        }
        console.log(this.carousels);
      });
    }
  },
  created() {
    this.loadCarousel();
  },

  mounted() {
    // 走马灯高度初始值是中等于自适应后的图片的高度
    // 监听事件resize,当改变窗口尺寸时，让走马灯的尺寸随图片自适应的尺寸变化
    this.setbannerH();
    window.addEventListener(
      "resize",
      () => {
        this.setbannerH();
      },
      false
    );
  }
};
</script>
<style>
.el-carousel__mask {
  background-color: #000 !important;
  opacity: 0.6 !important;
}
.el-carousel__button {
  height: 3px !important;
}
.el-carousel__indicator.el-carousel__indicator--horizontal.is-active button {
  opacity: 1 !important;
}
.el-carousel__indicators--outside button {
  background-color: #1abf9e !important;
  opacity: 0.3 !important;
}
.el-carousel__indicators {
  padding: 3px !important;
}
.el-carousel__arrow {
  background-color: rgba(255, 255, 255, 0.4) !important;
  color: #000 !important;
  outline: 0 !important;
  border: 0 !important;
}
.el-carousel__arrow:hover {
  background-color: rgba(26, 191, 158, 0.7) !important;
}
/* @media screen {
    
  } */
</style>