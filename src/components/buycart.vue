<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodslist" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.isSelect" active-color="#13ce66" inactive-color="#ccc">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt=""> {{item.title}}
                                    </td>
                                    <td>
                                        {{item.sell_price}}
                                    </td>
                                    <td>
                                        <el-input-number v-model="item.buycount" :min="0"></el-input-number>
                                    </td>
                                    <td>
                                        {{item.buycount*item.sell_price}}
                                    </td>
                                    <td>
                                        <el-button @click="deleteshop(index)" type="danger" icon="el-icon-delete">删除</el-button>
                                    </td>
                                </tr>
                                <!-- 没有商品时显示的站位 -->
                                <tr v-show="goodslist.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{buysome}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{pricesome}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link  to="/index">
                                <button class="button">继续购物</button>
                            </router-link>
                            <router-link  to="/order">
                            <button class="submit">立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <el-button type="text">点击打开 Message Box</el-button>
        
    </div>
</template>
<script>
export default {
    name: "buycar",
    data() {
        return {
            goodslist: [],

        }
    },
    computed: {
        // 购买总数
        buysome() {
            let num = 0
            this.goodslist.some(v => {
                if (v.isSelect == true) {
                    num += v.buycount
                }
            })
            return num
        },
        // 需要支付的总金额
        pricesome() {
            let price = 0
            this.goodslist.some(v => {
                if (v.isSelect == true) {
                    price += v.buycount * v.sell_price
                }
            })
            return price
        }
    },

    watch: {
        goodslist: {
            handler: function(val, oldVal) {
                // 深度监听,可以监听到复杂数据类型中的嵌套数据的变化
                // 监听到数据发生变化时 需要去修改状态管理的state属性
                let obj = {}
                val.some(v => {
                    obj[v.id] = v.buycount
                })
                this.$store.commit('updatebuycount', obj)
            },
            deep: true
        }
    },
    methods: {
        deleteshop(index) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                });
                // 根据索引删除goodlist中的对应的商品
                // 删除后 watch监听了goodslist,所以一旦发生数据变化,就会自动触发watch中的方法,去更新vuex中的数据
                this.goodslist.splice(index, 1)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    },
    created() {
        // 获取到store 状态管理 中的数据
        let ids = ''
        for (let key in this.$store.state.cartData) {
            ids += key
            ids += ','
        }
        ids = ids.substring(0, ids.length - 1)

        this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res => {
          
            // 给返回来的数据新增一些字段 用来保存需要的数据
            // 遍历返回来的数据有我们需要的数据的数组
            // 1 添加商品数量的字段 buyCount
            res.data.message.some(v => {
                v.buycount = this.$store.state.cartData[v.id]
                v.isSelect = true
            })
            this.goodslist = res.data.message
        })
    },
}
</script>
<style>
td img {
    width: 100px;
    vertical-align: middle;
}
</style>
