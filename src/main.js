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
// aixos默认发送跨域请求是限制了,无法携带cookie 需要手动设置axios.defaults.withCredentials=true;才能发送cookie
axios.defaults.withCredentials = true;
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
        islogin:false,
    },
    // 修改state中的数据
    mutations: {
        // 加入购物车后修改state中的数据
        increment(state, obj) {
            if (state.cartData[obj.goodid] != undefined) {
                // 累加到这个商品的个数
                state.cartData[obj.goodid] += obj.goodNum
            } else {
                // 手动调用Vue.set方法去为某个对象添加键值对,这个键值对的变化将会被跟踪到,会做自动同步更新到视图
                Vue.set(state.cartData, obj.goodid, obj.goodNum);

                // state.cartNum[obj.goodid] = obj.goodNum//这种添加的键值对无法同步更新到视图
            }
        },
        // 修改购物车中的数据
        updatebuycount(state, obj) {
            state.cartData = obj
        },
        // // 删除购物车中的数据
        // deleteshop(state,artID){
        //     // 使用Vue.delete 删除后会自动同步到视图
        //     Vue.delete  state.cartData[artID]
        // }
        // 修改是否登入字段
        changelogin(state,islogin){
            state.islogin=islogin
        }
    },
    // store 中的计算属性
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
    //导入首页组件
import index from './components/index.vue'
// 导入详情页组件
import detail from './components/productDatil.vue'
// 导入购物车组件
import buycar from './components/buycart.vue'
// 导入下单组件
import order from './components/order.vue'
// 登入组件
import login from './components/logion.vue'
// 支付组件
import payMone from './components/payMone.vue'
// 支付成功组件
import paySuccess from './components/paySuccess.vue'
// 会员中心
import vipcontaien from './components/vipcontaien.vue'

// 实例路由对象 配置路由规则
let router = new VueRouter({
    routes: [
        { path: "/", redirect: '/index' },
        { path: "/index", component: index },
        { path: "/detail", component: detail },
        { path: "/buycar", component: buycar },
        { path: "/order/:ids", component: order },
        { path: "/login", component: login },
        { path: "/payMone/:orderId", component: payMone },
        { path: "/paySuccess", component: paySuccess },
        { path: "/vipcontaien", component: vipcontaien },
    ]
})

//导航守卫,路由发生变化时触发的函数
router.beforeEach((to, from, next) => {
    // 在路由跳转之前 触发的处理函数
    if (to.fullPath.includes('/order')) {
        // 需要改变到的那个路径如果等于 /order 就 发送请求,判断是否有登入
        axios.get('site/account/islogin').then(res => {
         
            if (res.data.code == 'nologin') {
                // 如果没有登入就先弹出提示框(提示框的方法是挂载到VUe的原型当中的,
                // 在Vue中 $开头的方法都是挂载到Vue原型的第三方方法 )
                Vue.prototype.$message({
                    message: '请先登入!!!',
                    type: 'warning'
                });
                // 这里是通过代码的方式进行路由跳转,这个过程的术语叫 编程导航
                router.push('/login')

            } else {
                // 走到这里就说明之前有登入过,这里就不做任何处理,直接调用next()结束这路由导航  就根据点击的路由去处理
               next()
            }
        })

    } else {
        // 如果要跳转的路由不等于 order则不做处理  // 必须要调用next方法来结束这个生命周期函数,否则无法进入下一个钩子
        next() // 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
    }

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
    store,
    created(){
        // 请求判断是否登入的接口
        axios.get('site/account/islogin').then(res=>{
           if(res.data.code=="nologin"){
                store.state.islogin=false
           }else{
                store.state.islogin=true

           }
        })
    }
}).$mount('#app')
