<template>
  <div id="appraise">
    <nav-bar>
      <template #left-bar>
        <img src="../assets/img/profile/left_arr.svg" @click="back" />
      </template>
      <template #middle-bar>
        <h2>发表评价</h2>
      </template>
    </nav-bar>
    <div class="seat"></div>

    <div class="main">
      <div class="rate">
        <p>综合评分</p>
        <van-rate v-model="value" @change="changeScore" />
        <p>{{ valueMean }}</p>
      </div>
      <textarea
        id="speak"
        rows="10"
        v-model="speak"
        placeholder="写下商品感受会更受欢迎哦"
      ></textarea>
      <van-button color="#00cacc" @click="submitAppraise">发表评价</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "../network/request.js";
import NavBar from "./NavBar.vue";
export default {
    name:'Appraise',
    components:{
        NavBar,
    },
    data(){
        return {
            //星号点亮数
            value: 0,
            //星号数量对应的评价
            valueMean:'',
            //评价内容
            speak:'',
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        //评分改变时触发
        changeScore(){
            switch(this.value){
                case 0:
                    this.valueMean = ''
                    break
                case 1:
                    this.valueMean = '差'
                    break
                case 2:
                    this.valueMean = '较差'
                    break
                case 3:
                    this.valueMean = '一般'
                    break
                case 4:
                    this.valueMean = '好'
                    break
                case 5:
                    this.valueMean = '很好'
                    break
            }
        },
        submitAppraise(){
            axios.instance({
        url: "/comment/addComment",
        method: "get",
        params: {
          commentInner:this.speak,
          cargoId:this.$route.query.cargoId,
          commentLevel: this.value,
          commentPermissionId:this.$route.query.commentPermissionId,
          commentUser:JSON.parse(localStorage.getItem('user')).username
        },
      })
      .then((res) => {
        console.log(res);
        if(res.data.msg == "添加评价成功"){
          Toast("评价成功！");
          this.$router.push({
            path: "/gooddetail",
            query: {
              cargoId: this.$route.query.cargoId,
            },
      });
        }
        else{
          Toast("评价失败，请稍后再试");
        }
      })
      .catch((err) => {
        console.log(err);
      });
        }
    },
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
/* 评分 */
.rate {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
#appraise /deep/ .van-rate__icon--full {
  color: #00cacc !important;
}
.van-rate {
  margin: 0 4vw;
}
#appraise /deep/ .van-rate__item:not(:last-child) {
  padding-right: 3vw !important;
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