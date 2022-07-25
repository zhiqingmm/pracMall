<template>
  <div id="order" v-if="orderlist.length > 0">
    <div class="order-list" v-for="item in orderlist" :key="item.orderId">
      <van-card
        :title="item.orderItemName"
        :thumb="item.orderItemPic"
      >
        <template #tags>
          <div>
            <van-tag type="primary" size="medium">
              单价：￥{{
                (item.orderItemTotalPrice / item.orderItemNumber).toFixed(2)
              }}
            </van-tag>
            <van-tag type="primary" size="medium"
              >X{{ item.orderItemNumber }}</van-tag
            >
          </div>
        </template>
      </van-card>
      <div class="time">下单时间：{{ item.orderTime }}</div>
      <div class="order-price"><span>订单总价：</span>￥{{item.orderItemTotalPrice.toFixed(2)}}</div>
    </div>
  </div>
  <div v-else>
    <van-empty description="还没有相关订单哦" :image="emptyimg"> </van-empty>
  </div>
</template>

<script>
import axios from "../../../network/request.js";
export default {
  name: "WaitSend",
  data() {
    return {
      orderlist: [],
      emptyimg: require("../../../assets/img/order/no-order.svg"),
    };
  },
  created() {
    //接口：查询我的订单
    axios
      .instance({
        url: "/order/shoporder",
        method: "get",
        params: {
          username: JSON.parse(localStorage.getItem("user")).username,
        },
      })
      .then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          if(res.data.data[i].orderStatus == 1){
            this.orderlist.push(res.data.data[i])
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
  }
};
</script>

<style scoped>
@import url('../../../assets/css/order.css');
</style>
