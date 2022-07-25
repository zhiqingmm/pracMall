<template>
  <div id="cart-item" v-if="list.length > 0">
    <div v-for="(item, index) in list" :key="item.id" class="cart-item">
      <van-checkbox v-model="item.checked" @change="checkedItem" checked-color="#00CACC">
        <van-card
          :price="item.cargoPrice.toFixed(2)"
          :title="item.cargoName"
          :thumb="item.cargoPic"
          @click.stop="togoodDetail(index)"
        >
          <!--标签部分-->
          <template #tags>
            <van-tag type="primary" size="medium"
              >--
              <img src="../../../assets/img/cart/bottom_arr.svg" />
            </van-tag>
          </template>
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
            <button class="delete-good" @click.stop="deleteGood(index)">
              删除
            </button>
          </template>
        </van-card>
      </van-checkbox>
    </div>
    <!-- 底部导航结算部分 -->
    <van-submit-bar button-text="结算" @submit="onSubmit">
      <van-checkbox v-model="isCheckedAll" checked-color="#00CACC"
        >全选</van-checkbox
      >
      <div class="van-submit-total">合计:￥{{ totalPrice }}</div>
      <button class="delete-more" @click="deleteAll">删除</button>
    </van-submit-bar>
  </div>
  <!-- 购物车为空 -->
  <div v-else>
    <van-empty
      description="还没有添加宝贝到购物车哦"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
    >
      <van-button round type="danger" class="bottom-button" @click="toPurchase"
        >现在去逛逛</van-button
      >
    </van-empty>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  data() {
    return {
      //渲染购物车中的每一条商品
      list: [],
    };
  },
  created() {
    //从本地缓存中取出商品相关信息到list中
    if (localStorage.getItem("addCart") != "[]") {
      let addCartItem = JSON.parse(localStorage.getItem("addCart")); 
      for (let i = 0; i < addCartItem.length; i++) {
        this.list.push(addCartItem[i]);
        for (let j = 0; j < this.list.length; j++) {
          this.$set(this.list[j], "checked", false);
        }
      }
      localStorage.setItem("addCart", JSON.stringify(this.list));
    }
  },
  methods: {
    //增加一件该商品
    plus(index) {
      this.list[index].cargoNum++;
    },
    //减少一件该商品
    minus(index) {
      this.list[index].cargoNum--;
    },
    //判断当前商品的选中状态
    checkedItem(){
      localStorage.setItem("addCart", JSON.stringify(this.list));
    },
    //将该商品从购物车中删除
    deleteGood(index) {
      this.list.splice(index, 1);
      localStorage.setItem("addCart", JSON.stringify(this.list));
    },
    //将所有选中的商品全部删除
    deleteAll() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked == true) {
          this.list.splice(i);
        }
      }
      localStorage.setItem("addCart", JSON.stringify(this.list));
    },
    //点击跳转到商品页面
    togoodDetail(index) {
      this.$router.push({
        path: "/gooddetail",
        query: { cargoId: this.list[index].cargoId },
      });
    },
   
    //点击逛逛去往首页浏览
    toPurchase() {
      this.$router.push("/purchase");
    },
    //结算购物车商品
    onSubmit() {
      localStorage.setItem('addCart',JSON.stringify(this.list))
      this.$router.push("/confirmorder");
    },
  },
  computed: {
    //计算合计总价格
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked == true) {
          total += parseFloat(this.list[i].cargoPrice) * this.list[i].cargoNum;
        }
      }
      return total.toFixed(2);
    },
    //全选按钮是否选中
    isCheckedAll: {
      get() {
        //当购物车全部商品均被选择时，将全选按钮设为选中
        return this.list.every((item) => item.checked);
      },
      set(val) {
        //相反，val为当前全选按钮的状态，set会在属性值发生变化时触发
        //当点击全选按钮时，将全选按钮的值赋给每一个购物车商品
        this.list.forEach((item) => (item.checked = val));
      },
    },
  },
};
 //改变list的数据形式
    // changeList() {
    //   if (this.list.length > 0) {
    //     let allcolor = skuData.content.s1;
    //     let allsize = skuData.content.s2;
    //     for (let i = 0; i < this.list.length; i++) {
    //       let newS1 = allcolor.filter((item) => {
    //         return this.list[i].color == item.id;
    //       })
    //       let newS2 = allsize.filter((item) => {
    //         return this.list[i].size == item.id;
    //       });
    //       this.list[i].color = newS1[0].name;
    //       this.list[i].size = newS2[0].name;
    //     }
    //   }
    // },
</script>

<style scoped>
#cart-item {
  margin-bottom: 15vh;
}

/* 每条购物车的商品 */
.cart-item {
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
  color: rgb(255, 0, 0);
}
.van-card__footer {
  display: flex;
  justify-content: flex-end;
}
.van-stepper {
  margin-right: 2vw;
}
.van-card__footer .delete-good {
  background-color: #00cacc;
  border: none;
  width: 15vw;
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

/* 空购物车 */
.bottom-button {
  background-color: #00cacc;
  border: none;
}

/* 结算 */
.van-submit-bar {
  bottom: 13vw;
}
.van-submit-bar__button--danger {
  background: #00cacc !important;
}
.van-button--round {
  border-radius: 0;
}
.van-submit-total {
  flex-grow: 1;
  font-size: 20px;
  text-align: right;
  color: red;
  font-weight: 900;
  padding-right: 1vw;
}
.van-submit-bar__button {
  width: 60px;
}
.delete-more {
  width: 60px;
  height: 40px;
  font-weight: 500;
  border: none;
  background-color: #00cacc;
  color: #fff;
}
</style>
