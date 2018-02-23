// import Vue from 'vue'
// import App from './App'

// /* eslint-disable no-new */
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

// // 公共变量
// Vue.prototype.needloginCode="9000";
// Vue.prototype.successCode="0000";

// //开启debug模式
// //Vue.config.debug = true;

Vue.use(VueRouter);
// Vue.use(VueResource);
// // import ElementUI from 'element-ui'
// // import 'element-ui/lib/theme-chalk/index.css'
// // // import 'element-ui/lib/theme-default/index.css'


// // Vue.use(ElementUI)

// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import App from './App.vue'



import routes from './routes.js'
import store from './vuex/store'



// Vue.use(ElementUI)
// // // 创建一个路由器实例
// // // 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})
router.afterEach(route => {
  console.log(route);
  scrollTo(0,0);
  if (route.meta.title) {
        document.title = route.meta.title;
    }
})
// router.propTypes = {
//     history: PropTypes.any,
// };
// // const app = new Vue({
// //   router
// // }).$mount('#app')

// // 现在我们可以启动应用了！
// // 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。

// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
const app = new Vue({
  router: router,
  store:store,
  render: h => h(App)
}).$mount('#app')