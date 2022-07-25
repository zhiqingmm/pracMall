<template>
  <div id="address-edit">
    <nav-bar>
      <template #left-bar>
        <img src="../assets/img/profile/left_arr.svg" @click="back" />
      </template>
      <template #middle-bar>
        <h2>添加收货地址</h2>
      </template>
    </nav-bar>
    <div class="seat"></div>

    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { AddressEdit } from "vant";
export default {
  name: "AddressEdit",
  components: {
    NavBar,
    vanAddressEdit: AddressEdit,
  },
  data() {
    return {
      areaList: {},
      searchResult: [],
    };
  },
  methods: {
    //返回上一页
    back(){
        this.$router.go(-1)
    },
    //保存地址
    onSave() {
      console.log("保存");
    },
    onChangeDetail() {
      console.log("设为默认地址");
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
.seat {
  height: 14vw;
}

/* 改包 */
#address-edit /deep/ .van-button--round{
  border-radius:0;
}
#address-edit /deep/ .van-button--danger{
  background-color:#00cacc;
  border:1px solid #00cacc;
}
#address-edit /deep/ .van-switch--on{
  background-color:#00cacc;
}
</style>