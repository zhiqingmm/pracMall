<template>
    <div id="login">
        <img src="../assets/img/login/back.svg" class="back" @click="back">
        <h2>登录后操作</h2>

        <div class="phone">
            <label for="phone">
                <span>用户名</span>
            </label>
            <input type="text" placeholder="输入用户名" id="phone" v-model="username" @input="btnDisabled">
            <img src="../assets/img/login/delete.svg" @click="deletePhone">  
        </div>

        <div class="psd">
            <label for="password">密码</label>
            <input :type="psdType" placeholder="6-16位数字和字母组合" id="password" v-model="password" @input="btnDisabled">
            <img src="../assets/img/login/delete.svg" @click="deletePsd" :style="{'opacity':deleteShow()}">
            <img :src="src" @click="showPsd">
        </div>

        <div class="verify">
            <label for="verify">验证码</label>
            <input type="text" placeholder="输入图片显示内容" id="verify" v-model="verify" @input="btnDisabled">
            <img :src="myImg" class="verify-img" @click="changeImg">
        </div>

        <div class="treaty">
            <input type="checkbox" v-model="ischecked" id="agree">
            <label for="agree">已阅读并同意用户协议、隐私政策和买家须知 首次登录将自动注册</label>
        </div>

        <button @click="login" disabled ref="login">登录</button>
        <div class="before_login">
            <p @click="toRegister">前往注册</p>
            <p>找回密码</p>
        </div>
    </div>
</template>

<script>
import axios from '../network/request.js'
import { Toast } from 'vant';
export default {
    name:'Login',
    data(){
        return {
            username:'',
            password:'',
            psdType:'password',
            src:require('../assets/img/login/psd_close.svg'),
            verify:'',
            myImg:'', 
            ischecked:false,
        }
    },
    created(){
        axios.instance({
            url:'/imageCode/getImageCode',
            method:'get',
            responseType:'blob',
        }).then(res => {
            console.log(res);
            let img = window.URL.createObjectURL(res.data)
            this.myImg = img
        }).catch(err => {
            console.log(err);
        })
    },
    methods:{
        //返回上一页
        back(){
            this.$router.go(-1);
        },
        //一键清空电话号码
        deletePhone(){
            this.phone = ''
        },
        //一键清空密码
        deletePsd(){
            this.password = ''
        },
        //显示与隐藏密码
        showPsd(){
            this.psdType = this.psdType === 'password' ? 'text' : 'password'
            this.src = this.src === require('../assets/img/login/psd_close.svg') ? require('../assets/img/login/psd_open.svg') : require('../assets/img/login/psd_close.svg')
        },
        //当密码框内有内容时出现删除按钮
        deleteShow(){
            if(this.password == ''){
                return 0
            }else{
                return 1
            }
        },
        //更换验证码图片
        changeImg(){
            axios.instance({
                url:'/imageCode/getImageCode',
                method:'get',
                responseType:'blob',
            }).then(res => {
                let img = window.URL.createObjectURL(res.data)
                this.myImg = img
            }).catch(err => {
                console.log(err);
            })
        },
        //判断登录按钮是否应该解禁
        btnDisabled(){
            if(this.phone != '' && this.password.length >= 6 && this.verify != ''){
                this.$refs.login.disabled = false
            }else{
                this.$refs.login.disabled = true
            }
        },
        //登录跳转
        login(){
            //1. 判断是否同意用户协议
            if(!this.ischecked){
               Toast({
                    message: '需要同意用户协议才可以登录',
                    position: 'top',
                });
                return false
            }
   
            //2. 登录判断：验证码和密码
            axios.instance({
                url:'/user/login',
                method:'get',
                params:{
                    username:this.username,
                    password:this.password,
                    enCode:this.verify,
                }
            }).then(res => {
                console.log(res);
                if(res.data[1] == '密码错误'){
                    Toast({
                        message: '密码输入错误',
                        position: 'top',
                    });
                }else if(res.data[1] == '验证码错误'){
                    Toast({
                        message: '验证码输入错误',
                        position: 'top',
                    });
                }else if(res.data[1] == '用户名不存在'){
                    Toast({
                        message: '该用户名不存在',
                        position: 'top',
                    });
                }else{
                    localStorage.setItem('user',JSON.stringify({username:res.data.data[0].username,psd:this.password,id:res.data.data[0].id,token:res.data.token}))
                    this.$router.push('/profile')
                }
            }).catch(err => {
                console.log(err);
            })
        },
        //跳转注册
        toRegister(){
            this.$router.push('/register')
        }
    }
}
</script>

<style scoped>
    #login{
        width: 80vw;
        height: 100vw;
        margin:20vw auto;
        display: flex;
        flex-direction: column;
        justify-content:center; 
    }
    .back{
        position: absolute;
        left: 15px;
        top: 15px;
    }
    h2{
        font-weight: 100;
        text-align: center;
    }
    img{
        width: 5vw;
        height: 5vw;
    }
    /* 输入框相关样式 */
    .phone,.psd,.verify{
        margin-top:10vw;
        padding-bottom: 5px;
        border-bottom: 1px solid silver;
    }
    label:not(:last-child){
        display: inline-block;
        width:15vw;
        font-size: 14px;
    }
    label img{
        vertical-align:middle;
        width: 14px;
        height: 14px;
    }
    input{
        border:none;
        outline:none;
        font-size:20px;
    }
    .phone input{
        width: 60vw;
    }
    .psd input{
        width: 55vw;
    }
    .verify input{
        width: 40vw;
    }
    .phone input::placeholder,.psd input::placeholder,.verify input::placeholder{
        font-size:13px;
        color: silver;
    }
    .verify-img{
        width: 25vw;
        height: 7vw;
    }

    /* 协议同意相关样式 */
    .treaty{
        margin:3vw 0;
        display: flex;
        line-height: 12px;
        font-size:12px;
        color:silver;
    }

    /* 登录相关样式 */
    button{
        height: 50px;
        border:none;
        background-color: #2A2A34;
        color:#fff;
    }
    button:disabled{
        background-color: #ACAAB8;
        color:#CBCBD5;
    }

    /* 注册与找回 */
    .before_login{
        display: flex;
        justify-content: space-around;
        padding-top: 3vw;
    }
    .before_login p{
        color:rgb(130, 130, 130);
        font-size: 3vw;
        text-decoration: underline;
    }
</style>