<template>
  <div id="collect" v-if="list.length > 0">
    <nav-bar>
      <template #left-bar>
        <img src="../../../assets/img/profile/left_arr.svg" @click="back" />
      </template>
      <template #middle-bar>
        <h2>我的收藏</h2>
      </template>
      <template #right-bar>
        <img src="../../../assets/img/purchase/search.svg" />
      </template>
    </nav-bar>
    <div class="seat"></div>

    <!-- 商品收藏列表 -->
    <div v-for="item in list" :key="item.likeCargoId" class="collect-item">
      <van-checkbox v-model="item.checked" checked-color="#00CACC">
        <van-card
          :price="item.cargoPrice"
          :title="item.cargoName"
          :thumb="item.cargoPic"
        >
        </van-card>
      </van-checkbox>

      <!-- 底部全选导航栏 -->
      <van-submit-bar button-text="删除" @submit="deleteChecked">
        <van-checkbox v-model="isCheckedAll" checked-color="#00CACC"
          >全选</van-checkbox
        >
        <div class="totalNum">共{{ totalChecked }}件</div>
      </van-submit-bar>
    </div>
  </div>
  <div v-else>
    <van-empty
      description="还没有收藏商品哦"
      :image="nocollect"
    >
      <van-button round type="danger" class="bottom-button" @click="toPurchase"
        >现在去逛逛</van-button
      >
    </van-empty>
  </div>
</template>

<script>
import axios from "../../../network/request.js";
import NavBar from "../../../components/NavBar.vue";
export default {
  name: "Collect",
  components: {
    NavBar,
  },
  data() {
    return {
      list: [],
      nocollect:require('../../../assets/img/no-collect.svg'),
    };
  },
  mounted(){
        axios
      .instance({
        url: "/like/getLike",
        method: "get",
        params: {
          likeUserId: JSON.parse(localStorage.getItem("user")).id,
        },
      })
      .then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          this.list.push(res.data.data[i]);
        }
        for (let i = 0; i < this.list.length; i++) {
          this.$set(this.list[i], "checked", false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    //删除选中商品
    deleteChecked() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked == true) {
          axios
            .instance({
              url: "/like/update",
              method: "get",
              params: {
                likeUserId: JSON.parse(localStorage.getItem("user")).id,
                likeCargoId: this.list[i].likeCargoId,
              },
            })
            .then(() => {
              this.list.splice(i,1)
              this.$router.push('/collect')
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
      this.$router.push('/collect')
    },
    //去首页逛逛
    toPurchase(){
      this.$router.push('/purchase')
    }
  },
  computed: {
    //被选中的总数量
    totalChecked() {
      let total = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked == true) {
          total++;
        }
      }
      return total;
    },
    //让全选按钮全选或者全不选
    isCheckedAll: {
      get() {
        return this.list.every((item) => item.checked);
      },
      set(val) {
        this.list.forEach((item) => (item.checked = val));
      },
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
/* 每条收藏的商品 */
.collect-item {
  border-top: 10px solid #f4f4f4;
}
.van-checkbox {
  background-color: #fff;
  padding: 3vw;
  align-items: flex-start;
}
.van-checkbox__icon {
  width: 3vw;
}
.van-card {
  width: 90vw;
  padding: 0;
  padding-right: 16px;
}
.van-card__title {
  font-weight: 900;
  font-size: 16px;
}
.van-tag {
  background-color: rgb(0, 202, 204, 0.3);
  color: hsl(0, 0%, 40%);
  margin-top: 1vw;
  border-radius: 5px;
}
.van-tag img {
  width: 3vw;
  height: 3vw;
}
.van-card__price {
  font-weight: 900;
  color: red;
}

/* 底部全选 */
.van-submit-bar {
  box-shadow: 0px -3px 5px rgba(130, 130, 130, 0.1);
}
.van-submit-bar__button--danger {
  background: #00cacc !important;
}
.van-button--round {
  border-radius: 0;
}
.van-submit-bar__button {
  width: 60px;
}
.van-submit-bar .totalNum {
  flex-grow: 1;
}
</style>
