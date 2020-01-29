import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../public/css/swiper.min.css'
// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../public/iconfont/style.css"
import Myheader from "./components/Myheader"
// 用于子组件之间的通信
import bus from './bus';
//引入第三方 axios
import axios from "axios"
import Qs from "qs"
//配置访问服务器基础路径
axios.defaults.baseURL="http://127.0.0.1:5050/"
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.component("my-header",Myheader);
Vue.prototype.bus=bus;
Vue.config.productionTip = false
//保存session 信息
//每次ajax访问服务器将session id
//发送服务器验证使用 
axios.defaults.withCredentials=true
//将axios注册Vue实例中 
//  注意顺序不能配置在vue对象后面
Vue.prototype.axios = axios;
Vue.prototype.Qs = Qs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
