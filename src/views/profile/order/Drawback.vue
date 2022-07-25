<template>
  <div id="order" v-if="orderlist.length > 0">
    <div class="order-list" v-for="item in orderlist" :key="item.orderId">
      <van-card
        :title="item.cargoName"
        :thumb="item.cargoPic"
      >
        <template #tags>
          <div>
            <van-tag type="primary" size="medium"
              >X{{ item.returnNumber }}</van-tag
            >
          </div>
        </template>
      </van-card>
      <div class="order-price">
        <span>退款原因：{{item.returnDescription}}</span>
        <span>应退款：￥</span>{{item.cargoPrice * item.returnNumber}}
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
    //接口：查询我的退款订单
    axios
      .instance({
        url: "/returnCargo/queryByUser",
        method: "get",
        params: {
          returnUser: JSON.parse(localStorage.getItem("user")).username,
        },
      })
      .then((res) => {
        console.log(res);
        this.orderlist = res.data.data
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
#order .order-price{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#order .order-price span:first-child{
  color:rgb(130, 130, 130);
  font-weight: normal;
  flex-grow: 1;
  overflow: hidden;
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
