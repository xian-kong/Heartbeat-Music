import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uname:"",
    phone:"",
    pass:""
  },
  mutations: {
    // 专门负责修改state中的变量
    setPhone(state,phone){
      state.phone=phone;
      // state.pass=pass;
    }
  },
  actions: {
    // 专门负责发送异步ajax请求，从服务器端获取数据
    login(context,user){
      (async function(){
        var result=await axios.get("/user/log",{
          params:user
        });
        // 调用mutation中的函数
        context.commit("setPhone");
        console.log(result)
      })()
    }
  },
  modules: {
  }
})
