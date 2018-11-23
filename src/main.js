// 导入vue
import Vue from 'vue'
// 导入APP.vue
import App from './App.vue'
// 导入样式
import './assets/css/style.css'
// 导入elementui框架
import ElementUI from 'element-ui';
// 导入elementui的样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入vue-router
import VueRouter from 'vue-router'
//导入axios
import axios from 'axios'
// 导入格式化时间插件	
import moment from 'moment'
// 导入iview框架
import iView from 'iview';
// 导入iview的样式
import 'iview/dist/styles/iview.css';
// 给Vue注册iview
Vue.use(iView)
    // 给Vue注册emlmentui
Vue.use(ElementUI);
// 给Vue注册VueRouter
Vue.use(VueRouter)
Vue.prototype.$axios = axios

Vue.config.productionTip = false
import index from './components/index.vue'
import detail from './components/productDatil.vue'
import buycar from './components/buycart.vue'




let router = new VueRouter({
        routes: [
            { path: "/", redirect: '/index' },
            { path: "/index", component: index },
            { path: "/detail", component: detail },
            { path: "/buycar", component: buycar },



        ]
    })
    //简写时间
Vue.filter('timemanage', value => {
        return moment(value).format('YYYY-MM-DD')
    })
    // 详细时间
Vue.filter('detailTime', value => {
    return moment(value).format('YYYY-MM-DD hh:mm:ss')
})
new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
