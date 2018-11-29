<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>
                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model.trim="userName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model.trim="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input @click="login" id="btnSubmit" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

    name: 'login',
    data() {
        return {
            userName: '',
            password: '',
        }
    },
    methods: {
        login() {
            // 非空判断
            if (this.userName == '' || this.password == '') {
                // 1提示用户输入用户名
                this.$Message.warning('用户名和密码不能为空')
                return
            }
            this.$axios.post('site/account/login', {
                user_name: this.userName,
                password: this.password
            }).then(res => {
                if (res.data.status === 0) {
                    // 登入成功后的事件处理
                    // 1提示用户登入成功
                    this.$Message.success(res.data.message)
                        // 清空输入框的内容
                    this.userName = this.password = ''
                        //修改状态仓库的数据
                    this.$store.commit('changelogin', true)
                        // 返回上一页,从哪里来到登入页面,登入成功就回到那个页面
                    this.$router.go(-1)
                } else if (res.data.status === 1) {
                    // 失败后的提示
                    this.$Message.error(res.data.message);
                    // 清空输入框的内容
                    this.userName = this.password = ''
                }
            })
        }
    }
}
</script>
<style>
</style>
