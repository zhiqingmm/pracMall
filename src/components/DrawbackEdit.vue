<template>
    <div id="drawback_edit">
        <nav-bar>
      <template #left-bar>
        <img src="../assets/img/profile/left_arr.svg" @click="back" />
      </template>
      <template #middle-bar>
        <h2>申请退款</h2>
      </template>
    </nav-bar>
    <div class="seat"></div>

    <div class="main">
      <textarea
        id="speak"
        rows="10"
        v-model="speak"
        placeholder="请在此填写退款原因，等待商家同意"
      ></textarea>
      <van-button color="#00cacc" @click="submitdrawback">申请退款</van-button>
    </div>
    </div>
</template>

<script>
import { Toast } from "vant";
import NavBar from "./NavBar.vue";
import axios from "../network/request.js";
export default {
    name:'DrawbackEdit',
    components:{
        NavBar,
    },
    data(){
        return {
            speak:'',
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        submitdrawback(){
          //提交退款申请
            axios
      .instance({
        url: "/returnCargo/add",
        method: "get",
        params: {
          returnCargo:this.$route.query.cargoId,
          returnNumber:this.$route.query.cargoNum,
          returnDescription:this.speak,
          returnUser:JSON.parse(localStorage.getItem('user')).username
        },
      })
      .then((res) => {
        console.log(res);
        if(res.data.msg == "添加退货成功"){
          Toast("退款申请提交成功，请耐心等待商家退款");
        }
      })
      .catch((err) => {
        console.log(err);
      });
        }
    }
}
</script>

<style scoped>
/* 顶部导航 */
.left-bar img {
  width: 5vw;
  height: 5vw;
}
.middle-bar h2 {
  font-size: 5vw;
}
.seat {
  height: 14vw;
}
.main {
  padding: 3vw;
}

#speak {
  border-radius: 10px;
  padding: 1vw;
  margin: 3vw 0;
  width: 92vw;
}
.van-button {
  width: 100%;
  font-weight: bold;
}
</style>