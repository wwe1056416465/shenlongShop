<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="byuCount" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" :class="{selected:flag==0}" @click="flag=0">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" :class="{selected:flag==1}" @click="flag=1">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-html="goodsinfo.content" v-show="flag==0">
                            </div>
                            <div class="tab-content" v-show="flag==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model="textContent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item,index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | detailTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <Page :current="pageIndex" :total="totalcount" show-sizer :page-size="pageSize" :page-size-opts="[5,8,10]" placement="top" show-elevator @on-change="change" @on-page-size-change="changepage" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item,index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail?artID='+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail?artID='+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | timemanage}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>
<script>
export default {
    name: 'productDatil',
    data() {
        return {
            // 商品id
            artID: '',
            // 商品的详情
            goodsinfo: {},
            // 热卖商品列表
            hotgoodslist: [],
            // 图片列表
            imglist: [],
            // 购买数量
            byuCount: 1,
            // 显示隐藏评论和商品详情内容
            flag: 0,
            // 页码
            pageIndex: 1,
            // 页容量
            pageSize: 5,
            // 一次显示评论内容数
            comments: [],
            //所有的评论总数
            totalcount: 0,
            // 提交的需要提交的评论
            textContent: '',
            images: {
                'normal_size': // required                          
                    []
            },
            zoomerOptions: {
                'zoomFactor': 3,
                'pane': 'pane',
                'hoverDelay': 300,
                'namespace': 'zoomer',
                'move_by_click': false,
                'scroll_items': 7,
                'choosed_thumb_border_color': "#dd2c00"
            }
        }
    },
    created() {
        // 获取到商品信息
        this.initInfo()
            // 获取到用户评论数据
        this.getdetail()
    },
    methods: {
        // 获取到商品的信息
        initInfo() {
            // 初始化购买数量
            this.byuCount = 1
                // 保存数据
            this.artID = this.$route.query.artID
            console.log(this.artID);
            // 获取到商品详情信息
            this.$axios.get(`site/goods/getgoodsinfo/${this.artID}`).then(res => {
                this.goodsinfo = res.data.message.goodsinfo
                this.hotgoodslist = res.data.message.hotgoodslist
                this.imglist = res.data.message.imglist
                this.images.normal_size = []
                this.imglist.forEach(v => {
                    this.images.normal_size.push({
                        id: v.id,
                        url: v.original_path
                    })
                })

            })
        },
        // 获取到用户评论的数据
        getdetail() {
            this.$axios.get(`site/comment/getbypage/goods/${this.artID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res => {
                this.comments = res.data.message
                this.totalcount = res.data.totalcount
            })
        },
        // 点击分页的事件
        change(page) {
            // 修改数据中的页码
            this.pageIndex = page;
            // 从新调用获取评论数据的方法
            this.getdetail()
        },
        changepage(pageSize) {
            // 修改页容量
            this.pageSize = pageSize;
            // 从新调用获取评论数据的方法
            this.getdetail()
        },
        // 点击按钮提交评论
        submitComment() {
            // 设置为空
            if (!this.textContent.trim()) {
                this.$Message.warning('评论不能为空');
                return
            }
            // this.$axios({
            //     method: "post",
            //     url: `http://111.230.232.110:8899/site/validate/comment/post/goods/${this.artID}`,
            //     data:{
            //         commenttxt:this.textContent
            //     }
            // }).then(res=>{
            //     console.log(res);
            // })

            this.$axios.post(`site/validate/comment/post/goods/${this.artID}`, {
                commenttxt: this.textContent
            }).then(res => {
                // 初始化页码为1
                this.pageIndex = 1
                    // 调用评论查询的方法
                this.getdetail()
                    // 成功提示
                this.$Message.success(res.data.message);

            })
        }
    },
    watch: {
        $route(newVal, oldVale) {
            // 当商品的id修改后就重新调用获取商品和品论的数据
            // 当路由发生变化后 修改图片的数组为空
            this.images.normal_size=[]
            this.initInfo()
            this.getdetail()
        }
    }
}
</script>
<style>
.tab-content img {
    display: block;
}

.thumb-list img {
    width: 100px;
    height: 100px;
}

.pic-box {
    width: 395px;
}
</style>
