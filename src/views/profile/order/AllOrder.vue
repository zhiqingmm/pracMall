<template>
  <div id="order" v-if="orderlist.length > 0">
    <div class="order-list" v-for="item in orderlist" :key="item.orderItemId">
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
        //根据下单时间排序
        // let newres = res.data.data.sort(function (a, b) {
        //   return a.orderTime > b.orderTime ? -1 : 1;
        // });
        // //newres:根据下单时间排序后的数组
        // console.log(newres);

        // let tempres = [];
        // let newresitem = [];
        // for (let i = 0; i < newres.length; i++) {
        //   if (i < newres.length - 1) {
        //     if (newres[i]["orderTime"] == newres[i + 1]["orderTime"]) {
        //       tempres.push(newres[i]);
        //       if (i + 1 == newres.length - 1) {
        //         tempres.push(newres[i + 1]);
        //       }
        //     } else {
        //       tempres.push(newres[i]);
        //       newresitem.push(tempres.slice(0));
        //       if (i + 1 == newres.length - 1) {
        //         newresitem.push([newres[i + 1]]);
        //       }
        //       tempres = [];
        //     }
        //   }
        // }
        // console.log(newresitem);

        // this.orderlist = newresitem;
        // console.log(this.orderlist);
        console.log(res);
        this.orderlist = res.data.data
        localStorage.setItem("ordernum", JSON.stringify(res.data.data.length));
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
