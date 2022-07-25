<template>
  <div id="address">
    <nav-bar>
      <template #left-bar>
        <img src="../assets/img/profile/left_arr.svg" @click="back" />
      </template>
      <template #middle-bar>
        <h2>我的收货地址</h2>
      </template>
      <template #right-bar>
        <h2>管理</h2>
      </template>
    </nav-bar>
    <div class="seat"></div>

    <!-- 收货地址列表 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { AddressList } from "vant";
export default {
  name: "Address",
  components: {
    NavBar,
    vanAddressList: AddressList,
  },
  data() {
    return {
      //当前选中的地址
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
    };
  },
  methods: {
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    //新增收货地址
    onAdd() {
      this.$router.push("/addressedit");
    },
    //编辑收货地址
    onEdit() {
      this.$router.push("/addressedit");
    },
  },
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
.right-bar h2 {
  font-size: 4vw;
  color: #00cacc;
}
.seat {
  height: 14vw;
}
#address /deep/ .van-button--round {
  border-radius: 0 !important;
}
#address /deep/ .van-button--danger {
  background-color: #00cacc;
  border: 1px solid #00cacc;
}
#address /deep/ .van-tag--danger {
  background-color: #00cacc;
}
#address /deep/ .van-address-item .van-radio__icon--checked .van-icon {
  background-color: #00cacc;
  border-color: #00cacc;
}
</style>