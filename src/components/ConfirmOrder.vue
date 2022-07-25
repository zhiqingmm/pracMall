<template>
  <div id="confirm-order">
    <div class="title">
      <img src="../assets/img/profile/left_arr.svg" @click="back" />
      <div>确认订单</div>
    </div>
    <div class="seat"></div>

    <!-- 收货信息 -->
    <div class="delivery-address" @click="toAddress">
      <img src="../assets/img/confirmorder/address.svg" />
      <ul>
        <li>姓名：{{ name }}</li>
        <li>电话：{{ tel }}</li>
        <li>地址：{{ address }}</li>
      </ul>
      <img src="../assets/img/profile/right_arr.svg" />
    </div>

    <!-- 商品信息 -->
    <div
      class="order-good"
      v-for="(item, index) in ordergood"
      :key="item.cargoId"
    >
      <van-card
        :price="item.cargoPrice.toFixed(2)"
        :title="item.cargoName"
        :thumb="item.cargoPic"
      >
        <!--按钮加减与删除-->
        <template #footer>
          <button
            class="minus"
            @click.stop="minus(index)"
            :disabled="item.cargoNum == 1"
          >
            -
          </button>
          <input type="text" v-model="item.cargoNum" />
          <button class="plus" @click.stop="plus(index)">+</button>
        </template>
      </van-card>
    </div>

    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "../network/request.js";
export default {
  name: "ConfirmOrder",
  data() {
    return {
      tel: "13000000000",
      name: "张三",
      address: "山西省朔州市朔城区朗驰科技",
      post: "036002",
      ordergood: [],
      parentId: "",
    };
  },
  created() {
    let allcart = JSON.parse(localStorage.getItem("addCart"));
    //从商品页跳转到商品详情页
    if (this.$route.query.cargoId) {
      this.ordergood = []
      //如果路径中有商品id，则使用接口获取商品相关数据
      axios
        .instance({
          url: "/cargo/getGoodlistById/",
          method: "get",
          params: {
            cargoId: this.$route.query.cargoId,
          },
        })
        .then((res) => {
          this.ordergood.push(res.data.data);
          for (let i = 0; i < this.ordergood.length; i++) {
            this.$set(
              this.ordergood[i],
              "cargoNum",
              this.$route.query.cargoNum
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //从购物车跳转到商品详情页
    } else {
      this.ordergood = []
      for (let i = 0; i < allcart.length; i++) {
        if (allcart[i].checked == true) {
          this.ordergood.push(allcart[i]);
        }
      }
    }
  },
  methods: {
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    //跳转到收货信息页
    toAddress() {
      this.$router.push("/address");
    },
    //添加一件该商品
    plus(index) {
      this.ordergood[index].cargoNum++;
    },
    //减少一件该商品
    minus(index) {
      this.ordergood[index].cargoNum--;
    },
    //提交订单
    onSubmit() {
      console.log(this.ordergood);
      //接口：添加订单
      for (let i = 0; i < this.ordergood.length; i++) {
        let formData = new FormData();
        let totalPrice = (
          this.ordergood[i].cargoNum * this.ordergood[i].cargoPrice
        ).toFixed(2);
        formData.append("orderItemId", this.ordergood[i].cargoId);
        formData.append("orderItemName", this.ordergood[i].cargoName);
        formData.append("orderItemNumber", this.ordergood[i].cargoNum);
        formData.append("orderItemPic", this.ordergood[i].cargoPic);
        formData.append("orderItemTotalPrice", totalPrice);
        formData.append(
          "orderItemUsername",
          JSON.parse(localStorage.getItem("user")).username
        );
        axios
          .instance({
            url: "/order/ordercommit",
            method: "post",
            data: formData,
          })
          .then((res1) => {
            console.log(res1);
            if (res1.data.msg == "提交成功") {
              Toast("订单提交成功");
              //接口：添加地址
              axios
                .instance({
                  url: "/order/addresscommit",
                  method: "get",
                  params: {
                    parentId: res1.data.parentId,
                    addressName: this.address,
                    addressReceiver: this.name,
                    addressPost: this.post,
                  },
                })
                .then((res2) => {
                  console.log(res2);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      let allcart1 = JSON.parse(localStorage.getItem("addCart"));
      for (let i = 0; i < allcart1.length; i++) {
        if(allcart1[i].checked == true){
          allcart1.splice(i,1)
        }
      }
      localStorage.setItem("addCart", JSON.stringify(allcart1));
      this.$router.push("/order/allorder");
    },
  },
  computed: {
    //计算总价
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.ordergood.length; i++) {
        total +=
          this.ordergood[i].cargoPrice * this.ordergood[i].cargoNum * 100;
      }
      return total;
    },
  },
};
</script>

<style scoped>
/* 标题 */
.title {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #fff;
  width: 94vw;
  height: 8vh;
  padding: 0 3vw;
}
.title img {
  width: 5vw;
  height: 5vw;
}
.title div {
  font-size: 5vw;
}
.seat {
  height: 8vh;
}

/* 收货地址 */
.delivery-address {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3vw;
}
.delivery-address img {
  width: 5vw;
  height: 5vw;
}

/* 商品信息 */
.order-good {
  border-top: 10px solid #f4f4f4;
}
.van-card {
  width: 90vw;
  padding: 0;
  padding: 3vw 0;
  margin: 0 auto;
  background-color: #fff;
}
.van-card__title {
  font-weight: 900;
  font-size: 16px;
}
.van-card__price {
  font-weight: 900;
  color: #000;
}
.van-card__footer {
  display: flex;
  justify-content: flex-end;
}
.van-stepper {
  margin-right: 2vw;
}
.minus,
.plus {
  width: 28px;
  height: 28px;
  margin: 0 2px;
  font-size: 25px;
  background-color: #f2f3f5;
  border: none;
  border-radius: 4px;
}
.minus:disabled {
  background-color: #f7f8fa;
  color: silver;
}
.van-card__footer input {
  width: 28px;
  text-align: center;
  font-size: 16px;
  background-color: #f2f3f5;
  border: none;
}

/* 改包 */
#confirm-order /deep/ .van-submit-bar__button--danger {
  background: #00cacc;
}
#confirm-order /deep/ .van-button--danger {
  background-color: #00cacc;
  border: 1px solid #00cacc;
}
#confirm-order /deep/ .van-button--round {
  border-radius: 0;
}
</style>
