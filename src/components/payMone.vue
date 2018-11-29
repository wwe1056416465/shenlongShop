<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderlist.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderlist.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderlist.area+orderlist.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderlist.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderlist.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderlist.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <qrcode :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderId" :options="{ size: 200 }"></qrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueQrcode from '@xkeshi/vue-qrcode';
// 二维码插件
// import VueQrcode from '@xkeshi/vue-qrcode';
// 注册到Vue中
// Vue.component(, );
export default {
    components: {
        [VueQrcode.name]: VueQrcode
    },
    name: 'payMone',
    data() {
        return {
            // 订单详情
            orderlist: {},
            // 订单id
            orderId: '',
            // 定时器id
            timeId: null,
        }
    },
    created() {
        this.orderId = this.$route.params.orderId
        this.$axios.get('site/validate/order/getorder/' + this.orderId).then(res => {
            this.orderlist = res.data.message[0]
        })

        this.timeId = setInterval(()=> {
            this.$axios.get('site/validate/order/getorder/' + this.orderId).then(res => {
                if (res.data.message[0].status === 2) {
                    this.$Message.success('支付成功')
                        // 跳转到支付成功页面
                    this.$router.push('/paySuccess')
                }
            })
        }, 2000)

    },

    destroyed() {
    		clearInterval(this.timeId)
    }
}
</script>
<style>
</style>
