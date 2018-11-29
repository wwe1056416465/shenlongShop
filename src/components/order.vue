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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input v-model="ruleForm.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区" prop="area">
                                    <VDistpicker @selected="selected" :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></VDistpicker>
                                </el-form-item>
                                <el-form-item label="详细地址" prop="address">
                                    <el-input v-model="ruleForm.address"></el-input>
                                </el-form-item>
                                <el-form-item label="联系手机" prop="mobile">
                                    <el-input v-model="ruleForm.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱地址" prop="email">
                                    <el-input v-model="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码" prop="post_code">
                                    <el-input v-model="ruleForm.post_code"></el-input>
                                </el-form-item>
                                </el-form-i <h2 class="slide-tit">
                                <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                            <em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio @change="ruleForm.expressMoment=24" v-model="ruleForm.express_id" label="1">顺丰</el-radio>&nbsp;
                                        <em>费用：24.00元</em>&nbsp;&nbsp;

                                        <el-radio @change="ruleForm.expressMoment=15" v-model="ruleForm.express_id" label="2">圆通</el-radio>&nbsp;
                                        <em>费用：15.00元</em>&nbsp;&nbsp;

                                        <el-radio @change="ruleForm.expressMoment=10" v-model="ruleForm.express_id" label="3">韵达</el-radio>&nbsp;
                                        <em>费用：10.00元</em>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item,index) in goodslist" :Key="item.id">
                                            <td width="68">
                                                <router-link :to="'/detail?artID='+item.id">
                                                    <img :src="item.img_url">
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="'/detail?artID='+item.id">{{item.title}} </router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                ￥{{item.sell_price*item.buycount}}
                                            </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea v-model="ruleForm.message" name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{totalPrice+ruleForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/buycar">
                                                <button class="btn button">返回购物车</button>
                                            </router-link>
                                            <a id="btnSubmit" @click="submint" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
    components: {
        VDistpicker
    },
    name: "order",

    data() {
        // Mobile 表单验证逻辑
        var validateMobile = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机号不能为空'));
            } else {
                let rge = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if (rge.test(value)) {
                    callback();
                } else {
                    callback(new Error('请输入正确的手机号'));
                }

            }
        };
        // Email  表单验证逻辑
        var validateEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('邮箱地址不能为空'));
            } else {
                let rge = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
                if (rge.test(value)) {
                    callback();
                } else {
                    callback(new Error('请输入正确的邮箱地址'));
                }

            }
        };
        //PostCode 表单验证逻辑
        var validatePostCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('邮政编码不能为空'));
            } else {
                let rge = /^[1-9]\d{5}(?!\d)$/
                if (rge.test(value)) {
                    callback();
                } else {
                    callback(new Error('请输入正确的邮政编码'));
                }

            }
        };
        return {
            //ids 所有购买的商品id
            ids:'',
            // 商品数组
            goodslist: [],
            // 商品总数
            totalCount: 0,
            // 商品总价
            totalPrice: 0,
            ruleForm: {
                // 收货人
                accept_name: '王志玲',
                // 收货地址
                address: '屯里',
                // 收货人手机号
                mobile: '18879888888',
                // 收货人邮箱
                email: '888@qq.com',
                // 收货人邮政编码
                post_code: '142000',
                // 支付方式
                payment_id: '6',
                // 配送方式
                express_id: '1',
                // 配送费用
                expressMoment: 24,
                // 备注
                message:'送货速度要快',
                // 商品id和数量
                cargoodsobj:{},
                // 收货人所属地区
                area: {
                    province: {
                        code: 140000,
                        value: '山西省',
                    },
                    city: {
                        code: 140100,
                        value: '太原市',
                    },
                    area: {
                        code: 140106,
                        value: '迎泽区',
                    },
                },

            },
            // 表单验证规则
            rules: {
                accept_name: [{
                    required: true,
                    message: '收货人姓名不能为空',
                    trigger: 'change'
                }, {
                    min: 2,
                    max: 15,
                    message: '长度在 2 到 15 个字符',
                    trigger: 'change'
                }],
                address: [{
                    required: true,
                    message: '收货地址不能为空',
                    trigger: 'change'
                }, {
                    min: 2,

                    message: '请再次确认地址是否详细',
                    trigger: 'change'
                }],
                mobile: [{
                    validator: validateMobile,
                    trigger: 'change'
                }],
                email: [{
                    validator: validateEmail,
                    trigger: 'change'
                }],
                post_code: [{
                    validator: validatePostCode,
                    trigger: 'change'
                }],
            }
        }
    },
    created() {
        // 重状态管理库取出商品数据
        // 接收到路由的参数
        this.ids = this.$route.params.ids
            // 请求商品详情的接口
        this.$axios.get(`site/validate/order/getgoodslist/${this.ids}`).then(res => {
            // 遍历数据
            res.data.message.some(v => {
                    // 把vuex的数据手动加到数据中
                    v.buycount = this.$store.state.cartData[v.id]
                        // 计算结算商品的总数 并保存到data
                    this.totalCount += v.buycount
                        // 计算结算商品的总价并保存到data
                    this.totalPrice += v.buycount * v.sell_price
                    this.ruleForm.cargoodsobj[v.id]=v.buycount
                })
                // 把数据保存到data
            this.goodslist = res.data.message
        })
    },
    methods: {
        selected(result) {
            // v-distpicker 插件提供的 selected 事件 处理函数有一个返回值 这个返回这是所选地区的信息和邮政编码
            // 保存到 arae对象中去
            this.ruleForm.area.province.value = result.province.value
            this.ruleForm.area.province.code = result.province.code

            this.ruleForm.area.city.value = result.city.value
            this.ruleForm.area.city.code = result.city.code

            this.ruleForm.area.area.value = result.area.value
            this.ruleForm.area.area.code = result.area.code

            this.ruleForm.post_code = result.area.code
        },
        submint(){
                // 准备好数据
                this.ruleForm.goodsAmount=this.totalPrice
                this.ruleForm.goodsids=this.ids
                this.$axios.post('site/validate/order/setorder',this.ruleForm).then(res=>{
                         this.$router.push('/payMone/'+res.data.message.orderid)
                })    
            
        }
    }
}
</script>
<style>
</style>
