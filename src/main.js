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
    // 把axios挂在到Vue的原型中,让所有的vue实例都可以调用axios
Vue.prototype.$axios = axios
    // 设置axios的默认公共地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
// 导入放大镜组件
import ProductZoomer from 'vue-product-zoomer'
// 注册到Vue实例
Vue.use(ProductZoomer)

// 导入vuex
import Vuex from 'vuex'
// vuex注册到vue
Vue.use(Vuex)

// 实例一个vuex实例
const store = new Vuex.Store({
    state: {
        cartData: JSON.parse(window.localStorage.getItem('shenlongshop')) || { 87: 3, 90: 4 }, //键值说明 , 商品id为这个对象的键 商品的数量为这个键的值
    },
    mutations: {
        increment(state, obj) {
            if (state.cartData[obj.goodid] != undefined) {
                // 累加到这个商品的个数
                state.cartData[obj.goodid] += obj.goodNum
            } else {
                // 手动调用Vue.set方法去为某个对象添加键值对,这个键值对的变化将会被跟踪到,会做自动同步更新到视图
                Vue.set(state.cartData, obj.goodid, obj.goodNum);

                // state.cartNum[obj.goodid] = obj.goodNum//这种添加的键值对无法同步更新到视图
            }
        }
    },
    getters: {
        cartCount(state) {
            let num = 0
            for (let key in state.cartData) {
                num += state.cartData[key]
            }
            return num
        }
    }
})

window.onbeforeunload = function() {
    window.localStorage.setItem('shenlongshop', JSON.stringify(store.state.cartData))
}

Vue.config.productionTip = false
    // 导入组件
import index from './components/index.vue'
import detail from './components/productDatil.vue'
import buycar from './components/buycart.vue'

// 实例路由对象 配置路由规则
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
    // APP组件
    render: h => h(App),
    // 关联路由对象
    router,
    // 关联vuex对象
    store
}).$mount('#app')
