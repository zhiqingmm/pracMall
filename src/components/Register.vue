<template>
    <div id="register">
        <img src="../assets/img/login/back.svg" class="back" @click="back">
        <h2>用户注册</h2>

        <div class="username">
            <label for="username">用户名</label>
            <input type="text" placeholder="输入昵称" id="username" v-model="username" @input="btnDisabled">
            <img src="../assets/img/login/delete.svg" @click="deletePhone" v-show="this.username !== ''">  
        </div>

        <div class="phone">
            <label for="phone">
                <span>+86</span><img src="../assets/img/login/bottom_arr.svg" class="phonemore">
            </label>
            <input type="text" placeholder="输入手机号" id="phone" v-model="phone" @input="btnDisabled">
            <img src="../assets/img/login/delete.svg" v-show="this.phone !== ''" @click="deletePhone1">  
        </div>

        <div class="psd">
            <label for="password">密码</label>
            <input :type="psdType" placeholder="6-16位数字和字母组合" id="password" v-model="password" @input="btnDisabled">
            <img src="../assets/img/login/delete.svg" :style="{'opacity':deleteShow()}" @click="deletePsd">
            <img :src="src" @click="showPsd" >
        </div>

        <div class="psd">
            <label for="password">确认密码</label>
            <input :type="psdType" placeholder="6-16位数字和字母组合" id="ispassword" v-model="ispassword" @input="btnDisabled">
            <img src="../assets/img/login/delete.svg" :style="{'opacity':deleteShow1()}" @click="deletePsd1">
            <img :src="src" @click="showPsd">
        </div>

        <button @click="register" disabled ref="register">注册</button>
    </div>
</template>

<script>
import axios from '../network/request.js'
import { Toast } from 'vant';
export default {
    name:'Register',
    data(){
        return {
            username:'',
            phone:'',
            password:'',
            ispassword:'',
            psdType:'password',
            src:require('../assets/img/login/psd_close.svg'),
        }
    },
    methods:{
        //返回上一页
        back(){
            this.$router.go(-1)
        },
        //一键清空电话号码
        deletePhone(){
            this.username = ''
        },
        deletePhone1(){
            this.phone = ''
        },
        deletePsd(){
            this.password = ''
        },
        deletePsd1(){
            this.ispassword = ''
        },
        //输入框有内容时出现删除按钮
        deleteShow(){
            if(this.password == ''){
                return 0
            }else{
                return 1
            }
        },
        deleteShow1(){
            if(this.ispassword == ''){
                return 0
            }else{
                return 1
            }
        },
        //密码显示与隐藏
        showPsd(){
            this.psdType = this.psdType === 'password' ? 'text' : 'password'
            this.src = this.src === require('../assets/img/login/psd_close.svg') ? require('../assets/img/login/psd_open.svg') : require('../assets/img/login/psd_close.svg')
        },
        //注册按钮是否应该被解禁
        btnDisabled(){
            if(this.phone != '' && this.password.length >= 6 && this.ispassword != '' && this.username != ''){
                this.$refs.register.disabled = false
            }else{
                this.$refs.register.disabled = true
            }
        },
        //进行注册
        register(){
            if(this.password != this.ispassword){
                Toast({
                        message: '两次密码输入不一致',
                        position: 'top',
                    });
            }
            axios.instance({
                url:'/user/add',
                method:'get',
                params:{
                    username:this.username,
                    password:this.password,
                    phone:this.phone
                }
            }).then(res => {
                console.log(res);
                if(res.data['0'] && res.data['0'] == "用户添加成功" ){
                    Toast({
                        message: '注册成功！',
                        position: 'top',
                    });
                    this.$router.push('/login')
                }else if(res.data['1'] && res.data['1'] == "用户已存在" ){
                    Toast({
                        message: '该用户已存在！',
                        position: 'top',
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        }    
    }
}
</script>

<style scoped>
    #register{
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
    .username,.phone,.psd{
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
    .phone input,.username input{
        width: 60vw;
    }
    .psd input{
        width: 55vw;
    }
    .verify input{
        width: 40vw;
    }
    .phone input::placeholder,.psd input::placeholder,.username input::placeholder{
        font-size:13px;
        color: silver;
    }
    .verify-img{
        width: 25vw;
        height: 7vw;
    }
    button{
        height: 50px;
        border:none;
        margin-top: 5vw;
        background-color: #2A2A34;
        color:#fff;
    }
    button:disabled{
        background-color: #ACAAB8;
        color:#CBCBD5;
    }
</style>