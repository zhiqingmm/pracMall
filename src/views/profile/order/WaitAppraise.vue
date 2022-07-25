<template>
  <div id="order" v-if="orderlist.length > 0">
    <div class="order-list" v-for="(item,index) in orderlist" :key="item.orderId">
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
      <div class="order-price">
        <span>{{item.orderTime}}</span>
        <span>订单总价：</span>￥{{item.orderItemTotalPrice.toFixed(2)}}
      </div>
      <div class="get-button">
        <button @click="toDrawbackEdit(index)">申请退款</button>
        <button @click="toAppraise(index)">发表评价</button>
        </div>
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
        console.log(res);
        for (let i = 0; i < res.data.data.length; i++) {
          if(res.data.data[i].orderStatus == 3 && res.data.data[i].commentTimeRemain != 0){
            this.orderlist.push(res.data.data[i])
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
    //去发表评价
    toAppraise(index){
      this.$router.push({
        path: "/appraise",
        query: {
          cargoId: this.orderlist[index].orderItemId,
          commentPermissionId: this.orderlist[index].commentPermissionId,
        },
      });
    },
    //去退款
    toDrawbackEdit(index){
      this.$router.push({
        path: "/drawbackedit",
        query: {
          cargoId: this.orderlist[index].orderItemId,
          cargoNum:this.orderlist[index].orderItemNumber
        },
      });
    }
  }
};
</script>

<style scoped>
@import url('../../../assets/css/order.css');
#order .order-price{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#order .order-price span:first-child{
  color:rgb(130, 130, 130);
  font-weight: normal;
  flex-grow: 1;
  text-align: left;
}
.get-button{
  display: flex;
  justify-content: flex-end;
  margin-right: 3vw;
  padding-bottom: 3vw;
}
.get-button button{
  background-color: #00cacc;
  border:none;
  height: 28px;
  width: 20vw;
  color:#fff;
  margin-left:1vw;
}
</style>
