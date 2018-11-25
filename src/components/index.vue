<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item,index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(iten,inde) in item.subcates" :key="iten.id">
                                                {{iten.title}}&nbsp;
                                            </span>
                                            
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="#" v-for="(ite,ind) in item.subcates" :key="ite.id">
                                                {{ite.title}}&nbsp;
                                            </a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel height="341px">
                                    <!--  -->
                                    <el-carousel-item v-for="(item,index) in sliderlist" :key="item.id">
                                        <img :src="item.img_url" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{++index}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time|timemanage}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item,index) in groupList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(it,i) in item.level2catel" :key="it.subcateid">{{it.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(it,i) in item.datas" :key="it.artID">
                            <router-link :to="'/detail?artID='+it.artID">
                                <div class="img-box">
                                    <img :src="it.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{it.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{it.market_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{it.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{it.sell_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {
            catelist: [],
            sliderlist: [],
            toplist: [],
            groupList: [],
        }
    },
    created() {
        // 获取到底部的数据
        this.$axios.get('site/goods/getgoodsgroup').then(res => {
            this.groupList = res.data.message
        })

        // 获取到头部的数据
        this.$axios.get('site/goods/gettopdata/goods').then(res => {

            this.catelist = res.data.message.catelist
            this.sliderlist = res.data.message.sliderlist
            this.toplist = res.data.message.toplist
        })
    },
    methods: {


    },

}
</script>
<style>
.banner-img img {
    width: 100%;
    height: 100%;
}
</style>
