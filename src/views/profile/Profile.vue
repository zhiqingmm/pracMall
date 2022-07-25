<template>
  <div id="profile">
    <div id="main-profile" v-if="!this.$route.meta.showprofile">
      <div id="more">
        <img src="../../assets/img/profile/scan.svg" />
        <img src="../../assets/img/profile/message.svg" />
        <img src="../../assets/img/profile/setting.svg" @click="setting" />
      </div>
      <div id="information">
        <div class="head">
          <img src="../../assets/img/profile/head.jpeg" />
        </div>
        <div class="user-name">
          <div class="more-information">
            <h2>{{ getName() }}</h2>
            <img src="../../assets/img/profile/right_arr.svg" />
          </div>
          <p>未设置签名</p>
        </div>
      </div>
      <div id="trends">
        <option-item>
          <template v-slot:number>
            <h3>0</h3>
          </template>
          <template v-slot:title>
            <p>获赞与收藏</p>
          </template>
        </option-item>
        <option-item>
          <template v-slot:number>
            <h3>0</h3>
          </template>
          <template v-slot:title>
            <p>粉丝</p>
          </template>
        </option-item>
        <option-item>
          <template v-slot:number>
            <h3>0</h3>
          </template>
          <template v-slot:title>
            <p>关注</p>
          </template>
        </option-item>
        <option-item>
          <template v-slot:number>
            <h3>0</h3>
          </template>
          <template v-slot:title>
            <p>动态</p>
          </template>
        </option-item>
      </div>
      <div id="nav-collect" >
        <div @click="toCollect">
          <h3>收藏</h3>
          <p>0</p>
        </div>
        <div>
          <h3>足迹</h3>
          <p>0</p>
        </div>
        <div>
          <h3>订阅</h3>
          <p>0</p>
        </div>
      </div>
      <div id="order">
        <div class="all-order" @click="toAllOrder">
          <h3>购买</h3>
          <p>{{ordernum}}</p>
          <img src="../../assets/img/profile/right_arr.svg" alt="" />
        </div>
        <div class="order-state">
          <option-item @itemClick="toWaitPay">
            <template v-slot:number>
              <img src="../../assets/img/profile/wait_pay.svg" alt="" />
            </template>
            <template v-slot:title>
              <p>待支付</p>
            </template>
          </option-item>
          <option-item @itemClick="toWaitSend">
            <template v-slot:number>
              <img src="../../assets/img/profile/wait_send.svg" alt="" />
            </template>
            <template v-slot:title>
              <p>待发货</p>
            </template>
          </option-item>
          <option-item @itemClick="toWaitGet">
            <template v-slot:number>
              <img src="../../assets/img/profile/wait_receive.svg" alt="" />
            </template>
            <template v-slot:title>
              <p>待收货</p>
            </template>
          </option-item>
          <option-item @itemClick="toWaitAppraise">
            <template v-slot:number>
              <img src="../../assets/img/profile/wait_appraise.svg" alt="" />
            </template>
            <template v-slot:title>
              <p>待评价</p>
            </template>
          </option-item>
           <option-item @itemClick="toDrawback">
            <template v-slot:number>
              <img src="../../assets/img/profile/drawback.svg" alt="" />
            </template>
            <template v-slot:title>
              <p>退款/售后</p>
            </template>
          </option-item>
        </div>
      </div>
      <div id="wallet">
        <option-item>
          <template v-slot:number>
            <h3>￥0.00</h3>
          </template>
          <template v-slot:title>
            <p>余额</p>
          </template>
        </option-item>
        <option-item>
          <template v-slot:number>
            <h3>0</h3>
          </template>
          <template v-slot:title>
            <p>优惠券</p>
          </template>
        </option-item>
        <option-item>
          <template v-slot:number>
            <h3>0</h3>
          </template>
          <template v-slot:title>
            <p>得币</p>
          </template>
        </option-item>
        <option-item>
          <template v-slot:number>
            <h3>￥0.00</h3>
          </template>
          <template v-slot:title>
            <p>津贴</p>
          </template>
        </option-item>
        <option-item>
          <template v-slot:number>
            <img src="../../assets/img/profile/wallet.svg" alt="" />
          </template>
          <template v-slot:title>
            <p>钱包</p>
          </template>
        </option-item>
      </div>
      <div id="enterprise">
        <div>
          <h3>申请个人商家</h3>
          <img src="../../assets/img/profile/right_arr.svg" alt="" />
        </div>
        <div>
          <h3>企业/品牌商家入驻</h3>
          <img src="../../assets/img/profile/right_arr.svg" alt="" />
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import OptionItem from "../../components/OptionItem.vue";
export default {
  name: "Profile",
  components: {
    OptionItem,
  },
  data(){
    return {
      ordernum: localStorage.getItem('ordernum')
    }
  },
  methods: {
    //获取用户名进行显示
    getName() {
      if(JSON.parse(localStorage.getItem("user"))){
        return JSON.parse(localStorage.getItem("user")).username;
      }
    },
    //跳转到设置页面
    setting() {
      this.$router.push("/profile/setting");
    },
    //跳转到全部订单页面
    toAllOrder(){
      this.$router.push('/order')
    },
    //跳转到待支付页面
    toWaitPay(){
      this.$router.push('/order/waitpay')
    },
    //跳转到待发货页面
    toWaitSend(){
      this.$router.push('/order/waitsend')
    },
    //跳转到待收货页面
    toWaitGet(){
      this.$router.push('/order/waitget')
    },
    //跳转到待评价页面
    toWaitAppraise(){
      this.$router.push('/order/waitappraise')
    },
    //跳转到退款页面
    toDrawback(){
      this.$router.push('/order/drawback')
    },
    //跳转到收藏页面
    toCollect(){
      this.$router.push('/collect')
    }
  },
};
</script>

<style scoped>
img {
  padding: 3vw;
}
p,
h3 {
  font-size: 3vw;
}

/* 顶部功能设置 */
#more {
  display: flex;
}
#more img:first-child {
  margin-right: auto;
}

/* 个人信息   */
#information {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 2vw;
}
.head img {
  width: 20vw;
  height: 20vw;
}
.user-name {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 2vw 0;
  font-size: 3vw;
}
.more-information {
  display: flex;
  align-items: center;
}
.more-information img {
  width: 3vw;
  height: 3vw;
}

/* 收藏关注导航栏 */
#trends {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding-bottom: 3vw;
}
#trends p {
  padding-top: 1vw;
  color: rgb(130, 130, 130);
}

/* 收藏足迹导航栏 */
#nav-collect,
#enterprise {
  display: flex;
  justify-content: space-between;
}
#nav-collect div {
  border: 1px solid rgba(192, 192, 192, 0.3);
  border-right: 0;
  height: 13vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
}
#nav-collect div p {
  color: rgb(130, 130, 130);
}
#nav-collect div:first-child {
  border-left: 0;
}

/* 订单 */
#order,
#wallet {
  padding-bottom: 3vw;
  border-bottom: 10px solid #f4f4f4;
}
.all-order {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3vw;
  padding-bottom: 0;
}
.all-order img {
  width: 3vw;
  height: 3vw;
}
.all-order h3 {
  flex-grow: 1;
}
.all-order p {
  color: rgb(130, 130, 130);
}
.order-state {
  display: flex;
  justify-content: space-around;
}

/* 钱包卡券 */
#wallet {
  padding-top: 5vw;
  padding-bottom: 5vw;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  text-align: center;
}
#wallet h3 {
  padding-bottom: 4vw;
}
#wallet div:last-child img {
  padding-top: 0;
  vertical-align: middle;
  padding-bottom: 2vw;
}
#wallet div:last-child {
  padding-left: 5vw;
  border-left: 1px solid rgba(192, 192, 192, 0.3);
}

/* 个人/商家入驻 */
#enterprise {
  border-bottom: 10px solid #f4f4f4;
}
#enterprise div {
  padding: 3vw 0;
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
}
#enterprise div:first-child {
  border-right: 1px solid rgba(192, 192, 192, 0.3);
}
#enterprise img {
  width: 3vw;
  height: 3vw;
}
</style>