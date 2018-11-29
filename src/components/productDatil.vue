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
                                <!--因为每次点击都会重新的对放大镜数组重新赋值, 所以这个地方通过数组的长度来增删html结构 保证每次绑定属性拿到的都是最新的商品图片 -->
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
                                                <button class="buy">立即购买</button>
                                                <button @click="addcart" class="add">加入购物车</button>
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
                                    <!-- iview框架提供的计数器 里面使用的 current:当前显示的高亮页码 和data中的页码同步  total:页码总数  page-size:页容量 page-size-opts:可选的页容量(通过属性绑定,值会被当做js代码来执行)
                                     placement:显示页容量选项向上伸展  两个事件,1 页码改变事件,有返回值为点击的页码  2 页容量改变事件 页容量发生改变触发的函数返回选中的页容量-->
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
                'normal_size': // 存放放大图片的数组                         
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
            //     // 获取到用户评论数据
            // this.getdetail()
    },
    methods: {
        // 获取到商品的信息
        initInfo() {
            // 初始化购买数量
            this.byuCount = 1
                // 接收路由的参数
            this.artID = this.$route.query.artID
                // 根据当前的商品id获取到商品详情信息
            this.$axios.get(`site/goods/getgoodsinfo/${this.artID}`).then(res => {
                this.goodsinfo = res.data.message.goodsinfo
                this.hotgoodslist = res.data.message.hotgoodslist
                this.imglist = res.data.message.imglist
                    //获取到商品详情成功后再获取用户评论
                    // 获取到用户评论数据
                this.getdetail()
                    // 为了保持存放 放大镜效果的图片 的数组每次保存的都是当前商品的图片 先数组中的旧内容 
                this.images.normal_size = []
                    // 遍历商品图片数组
                this.imglist.forEach((v,index) => {
                    // 把图片的id和图片地址push到用来存 需要放大镜效果图片 的数组中(这个数组需要这两的数据)
                    this.images.normal_size.push({
                        id: v.id,
                        url: v.original_path
                    })
                   
                })

            })
        },
        // 获取到用户评论的数据
        getdetail() {
            // 通过当前的商品id 和data中的页码和页容量获取到商品的评论数
            this.$axios.get(`site/comment/getbypage/goods/${this.artID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res => {
                this.comments = res.data.message //当次请求回来的评论数据
                this.totalcount = res.data.totalcount //评论的总条数
            })
        },
        // 点击分页的事件
        change(page) {
            // 这个事件是 iview 提供的分页的 on-change 事件 有一个参数,是点击后返回来的当前点击的页码
            // 修改当前data中的页码
            this.pageIndex = page;
            //使用修改后的页码重新调用获取评论数据的方法  获取到此页码的评论数据
            this.getdetail()
        },
        changepage(pageSize) {
            // 这个是 iview 框架提供的 on-page-size-change 事件, 有一个参数,是点击改变页容量后返回的页容量
            // 修改当前data页容量
            this.pageSize = pageSize;
            //使用修改后的页容量从新调用获取评论数据的方法
            this.getdetail()
        },
        // 点击按钮提交评论
        submitComment() {
            // 非空判断
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
            // 有输入内容,发送请求 提交评论
            this.$axios.post(`site/validate/comment/post/goods/${this.artID}`, {
                commenttxt: this.textContent
            }).then(res => {
                // 初始化页码为1 
                this.pageIndex = 1
                    //使用初始化后页码调用评论查询的方法
                this.getdetail()
                    // 成功提示
                this.$Message.success(res.data.message);

            })
        },
        //加入购物车
        addcart() {

            // 把数据提交到状态管理 叫提交载荷 
            // 当前组件中详情商品的id通过路由参数从index组件传递过来,需要购买商品数量也是在这个地方决定
            // 因为商品详情组件中的 商品id和 商品数量 这两个数据在其他的组件中也要使用到
            // 所以可以把不同商品的id 和数量通过 commit(提交载荷) 提交到状态管理仓库(vuex)中去 
            // 这样其他组件就可以通过vuex提供的通道方便的获取到这个组件中的值
            this.$store.commit('increment', {
                    goodid: this.artID, // 在当前详情页下,路由中的参数就是商品的id 因为之前做过处理,data中的artID也是商品的id
                    goodNum: this.byuCount //商品数量是同步到计数框选中的数量
                })
                //弹出提示,加入购物车成功 这个是框架提供的弹出框 $notify 这类带有$前缀的方法都是挂在Vue构造函数的原型中,所以所有的子组件都可以访问到这个方法
            this.$notify({
                title: 'success',
                message: '二货成功加入购物车',
                type: 'success',
                duration: 1000
            });

        }
    },
    watch: {
        $route(newVal, oldVale) {
            // 点击右侧的商品列表,为了获取被点击商品的详情,在点击右侧商品列表时已把商品id放到路由里了,
            // 所以每次点击商品列表时会改变路由的参数,此时使用侦听器(watch)侦听到路由的变化 就会触发这个函数,执行这里的代码
            // 路由发生变化后重新调用获取商品详情的方法,在获取商品详情的方法里有获取当前 路由参数 的代码. 就能相应的请求到当前点击商品的详情了
            // 当商品的id修改后就重新调用获取商品和品论的数据
            // 当路由发生变化后 清除之前商品的图片,用来存放当前显示详情的商品的图片
            this.images.normal_size = []
            this.initInfo()
                // 重新调用获取商品的评论
                // this.getdetail()
        }
    }
}
</script>
<style>
/*图片设置为块级*/

.tab-content img {
    display: block;
}


/*设置所有小图的*/

.thumb-list img {
    width: 100px;
    height: 100px;
}

.pic-box {
    width: 395px;
}
</style>
