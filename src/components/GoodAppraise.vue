<template>
  <div v-if="appraiselist.length == 0">
     <!-- 顶部导航 -->
    <nav-bar>
      <template #left-bar>
        <img src="../assets/img/profile/left_arr.svg" @click="back" />
      </template>
      <template #middle-bar>
        <h2>商品评价</h2>
      </template>
      <template #right-bar>
        <img src="../assets/img/gooddetail/more.svg" />
      </template>
    </nav-bar>
    <div class="seat"></div>

    <ul class="scroll-nav">
        <li v-for="(item,index) in navitem" 
        :key="item" 
        @click="activeNav(index)" 
        :class="{'active-nav':isactive == index}"
        ><div>{{item}}</div></li>
    </ul>

    <van-empty description="暂无相关评价" :image="emptyimg"> </van-empty>
  </div>
  <div id="good-appraise" v-else>
    <!-- 顶部导航 -->
    <nav-bar>
      <template #left-bar>
        <img src="../assets/img/profile/left_arr.svg" @click="back" />
      </template>
      <template #middle-bar>
        <h2>商品评价</h2>
      </template>
      <template #right-bar>
        <img src="../assets/img/gooddetail/more.svg" />
      </template>
    </nav-bar>
    <div class="seat"></div>

    <ul class="scroll-nav">
        <li v-for="(item,index) in navitem" 
        :key="item" 
        @click="activeNav(index)" 
        :class="{'active-nav':isactive == index}"
        ><div>{{item}}</div></li>
    </ul>

    <ul class="appraise-item">
        <li v-for="item in newappraiselist" :key="item.commentId">
            <div class="appraise_more">
            <img src="../assets/img/gooddetail/appraise_head.svg" /> 
            <div>
              <span>{{item.commentUser}}</span>
              <div class="appraise_time">{{item.commentTime}}</div>
            </div>
          </div>
          <van-rate v-model="item.commentLevel" readonly />
          <div class="appraise_content">{{item.commentInner}}</div>
        </li>
    </ul>

  </div>
</template>

<script>
import axios from "../network/request.js";
import NavBar from "../components/NavBar.vue";
export default {
  name: "GoodAppraise",
  components: {
    NavBar,
  },
  data(){
      return {
          appraiselist:[],
          newappraiselist:[],
          navitem:['全部','好评','中/差评'],
          isactive: 0,
          emptyimg: require("../assets/img/no-appraise.svg"),
      }
  },
  created(){
    //接口：根据商品Id查询商品信息
    axios
      .instance({
        url: "/cargo/getGoodlistById/",
        method: "get",
        params: {
          cargoId: this.$route.query.cargoId,
        },
      })
      .then((res) => {
        this.appraiselist = res.data.data.commentList
        this.newappraiselist = this.appraiselist
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
      back(){
          this.$router.go(-1)
      },
      //进行好评与差评的筛选
      activeNav(index){
            this.isactive = index
            //如果点击的是全部按钮
            if(index == 0){
              this.newappraiselist = this.appraiselist
            }else if(index == 1){
              this.newappraiselist = []
              for (let i = 0; i < this.appraiselist.length; i++) {
                if(this.appraiselist[i].commentLevel >=4){
                  this.newappraiselist.push(this.appraiselist[i])
                }
              }
            }else if(index == 2){
              this.newappraiselist = []
              for (let i = 0; i < this.appraiselist.length; i++) {
                if(this.appraiselist[i].commentLevel <= 3){
                  this.newappraiselist.push(this.appraiselist[i])
                }
              }
            }
        }
  }
};
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

/* 导航条 */
.scroll-nav{
    display: flex;
    align-items: center;
    overflow: scroll;
    width: 100vw;
}
.scroll-nav li{
    width: 33.4%;
    padding: 0;
    margin: 0;
}
.scroll-nav li div{
    height: 8vw;
    width: auto !important;
    line-height: 8vw;
    text-align: center;
}
.active-nav{
    background-color: #00cacc;
    color: #fff;
    font-weight: bold;
}

/* 评价列表 */
.appraise-item li{
    padding: 3vw;
}
.appraise_more{
  display: flex;
  padding-top:2vw;
}
.appraise_more span{
  font-weight: 900;
}
.appraise_more .appraise_time{
  color:rgb(130, 130, 130);
  font-size:2vw;
  padding-bottom: 1vw;
}
.appraise_more img{
  width: 7vw;
  height: 7vw;
}
#good-appraise /deep/ .van-rate__icon--full {
  color: #00cacc !important;
}
#good-appraise /deep/ .van-rate--readonly{
  transform: scale(0.7);
  transform-origin: 0 0;
  padding-left: 2vw;
}
.appraise_content{
  padding-left: 1vw;
}
</style>