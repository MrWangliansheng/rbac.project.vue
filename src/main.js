import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./style/global.css"
import Storage from 'vue-ls'
import VueSession from 'vue-session'

import iconPicker from 'e-icon-picker';
import "e-icon-picker/lib/symbol.js"; //基本彩色图标库
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库

Vue.use(VueSession)

// vue-ls 的配置
const storageOptions = {
  namespace: 'vue_',   // key 键的前缀（随便起）
  name: 'ls',          // 变量名称（随便起） 使用方式：Vue.变量名称 或 this.$变量名称
  storage: 'local'     // 作用范围：local、session、memory
}

Vue.use(Storage, storageOptions)
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(iconPicker, {
  FontAwesome: true, ElementUI: true, eIcon: true, eIconSymbol: true
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

