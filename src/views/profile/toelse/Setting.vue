<template>
    <div id="setting">
        <nav-bar>
            <template #left-bar>
                <img src="../../../assets/img/profile/left_arr.svg" @click="back">
            </template>
            <template #middle-bar>
                <h2>设置</h2>
            </template>
        </nav-bar>
        <div class="seat"></div>
        <ul><li @click="toAddress">
                <p>收货地址设置</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
            <li>
                <p>隐私设置</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
            <li>
                <p>消息设置</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
            <li>
                <p>通用设置</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
            <li>
                <p>青少年模式</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
        </ul>
        <ul>
            <li>
                <p>反馈与建议</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
            <li>
                <p>投诉维权</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
            <li>
                <p>应用权限</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
            <li>
                <p>个人信息收集清单</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
            <li>
                <p>第三方合作个人信息共享</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
            <li>
                <p>隐私政策</p>
                <img src="../../../assets/img/profile/right_arr.svg">
            </li>
        </ul>
        <button @click="outLogin">退出登录</button>
    </div>
</template>

<script>
import NavBar from '../../../components/NavBar.vue'
export default {
    name:'Setting',
    components:{
        NavBar,
    },
    methods:{
        //返回上一页
        back(){
            this.$router.go(-1)
        },
        //跳转到收货地址设置页
        toAddress(){
            this.$router.push('/address')
        },
        //退出
        outLogin(){
            localStorage.removeItem('user')
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
    /* 导航条设置 */
    .left-bar img{
        width: 5vw;
        height: 5vw;
    }
    .middle-bar h2{
        font-size:5vw;
    }
    .seat{
        height: 14vw;
    }

    /* 列表设置 */
    ul{
        border-top: 10px solid #f4f4f4;
    }
    li{
        height: 12vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:0 3vw;
        border-bottom: 1px solid rgba(130, 130, 130, 0.2);
    }
    li p{
        font-size:3vw;
    }
    li img{
        width: 3vw;
        height: 3vw;
    }

    /* 退出 */
    button{
        font-size:3vw;
        margin-top:3vw;
        margin-left:3vw;
        height: 10vw;
        width: 94vw;
        color:#fff;
        background-color: #00cacc;
        border:1px solid rgba(130, 130, 130, 0.2);
    }
</style>