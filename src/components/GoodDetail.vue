<template>
  <div id="good-detail">
    <!-- 顶部导航 -->
    <nav-bar>
      <template #left-bar>
        <img src="../assets/img/profile/left_arr.svg" @click="back" />
      </template>
      <template #middle-bar>
        <h2>商品详情</h2>
      </template>
      <template #right-bar>
        <img src="../assets/img/gooddetail/more.svg" />
      </template>
    </nav-bar>
    <div class="seat"></div>

    <!-- 商品图片 -->
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab title="商品">
        <van-swipe @change="onChange">
          <van-swipe-item>
            <img :src="gooddetail.cargoPic" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/4</div>
          </template>
        </van-swipe>

        <!-- 商品价格与标题 -->
        <div class="good-title">
          <span>￥</span
          ><span class="price">{{ gooddetail.cargoPrice | finalPrice }}</span>
          <p>{{ gooddetail.cargoName }}</p>
        </div>

        <!-- 商品参数与选择 -->
        <ul class="good-classify">
          <li @click.self="showClassify">
            <span @click="showClassify">商品分类</span>
            <img
              src="../assets/img/profile/right_arr.svg"
              @click="showClassify"
            />
            <van-sku
              v-model="isShowClassify"
              :sku="sku"
              :goods="goods"
              :goods-id="gooddetail.cargoId"
              :lazy-load="true"
              @buy-clicked="onBuyClicked"
              @add-cart="onAddCartClicked"
            />
          </li>
          <li @click.self="showParameter">
            <span @click="showParameter">品牌参数</span>
            <img
              src="../assets/img/profile/right_arr.svg"
              @click="showParameter"
            />
            <van-action-sheet v-model="isShowParameter" title="产品参数">
              <ul>
                <li>品牌</li>
                <li>颜色分类</li>
                <li>商品类型</li>
              </ul>
              <van-button type="primary" block @click="hideParameter"
                >完成</van-button
              >
            </van-action-sheet>
          </li>
        </ul>
      </van-tab>

      <!-- 评价 -->
      <van-tab title="评价">
        <div class="appraise" @click="togoodappraise">
          <div class="appraise_title">
            <span>商品评价</span>
            <img src="../assets/img/profile/right_arr.svg" />
          </div>
        </div>
      </van-tab>

      <!-- 宝贝详情 -->
      <div class="separator">————宝贝详情————</div>
      <van-tab title="详情">
        <div class="details">
          <div>
            <img :src="gooddetail.cargoPic" />
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 底部导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        :icon="collectImg"
        text="收藏"
        color="#00CACC"
        @click="isCollect"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="showClassify"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="showClassify"
      />
    </van-goods-action>
  </div>
</template>

<script>
import axios from "../network/request.js";
import { Toast } from "vant";
import NavBar from "../components/NavBar.vue";
export default {
  name: "GoodDetail",
  components: {
    NavBar,
  },
  data() {
    return {
      islogin: "",
      //存放该商品相关信息
      gooddetail: {},
      //滚动导航条的活跃导航
      active: 0,
      //收藏图标的切换
      collectImg: require("../assets/img/gooddetail/collect.svg"),
      //商品相关图片展示的当前位置
      current: 0,
      //商品分类面板的显示与隐藏
      isShowClassify: false,
      //商品品牌参数面板的显示与隐藏
      isShowParameter: false,
      //商品分类面板的分类数据
      sku: {
        tree: [
          {
            k: "图片",
            k_s: "s1",
            v: [
              {
                id: "1",
                name: "买它！",
                imgUrl: "https://img01.yzcdn.cn/vant/ipad.jpeg",
                previewImgUrl: "https://img01.yzcdn.cn/vant/ipad.jpeg",
              },
            ],
            largeImageMode: true, //  是否展示大图模式
          },
        ],
        list: [
          {
            id: 2259,
            s1: "1",
            price: 100,
            stock_num: 110,
          },
        ],
        price: 0,
        stock_num: 0, // 商品总库存
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img01.yzcdn.cn/vant/ipad.jpeg",
      },
    };
  },
  created() {
    if (localStorage.getItem("user")) {
      this.islogin = localStorage.getItem("user");
    }
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
        console.log(res);
        this.gooddetail = res.data.data;
        this.sku.price = res.data.data.cargoPrice.toFixed(2);
        this.sku.tree[0].v[0].imgUrl = res.data.data.cargoPic;
        this.sku.tree[0].v[0].previewImgUrl = res.data.data.cargoPic;
        this.sku.list[0].price = (res.data.data.cargoPrice * 100).toFixed(2);
        this.sku.list[0].stock_num = res.data.data.cargoRemain;
        this.sku.stock_num = res.data.data.cargoRemain;
        if (res.data.data.likeStatus == 1) {
          this.collectImg = require("../assets/img/gooddetail/collect_succ.svg");
        }
        console.log(this.gooddetail);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  filters: {
    finalPrice(value) {
      if (!value) {
        return "";
      }
      return value.toFixed(2);
    },
  },
  methods: {
    //返回上一页
    back() {
      this.$router.push("/");
    },
    //滑动浏览图片
    onChange(index) {
      this.current = index;
    },
    //点击进行颜色分类的选择
    showClassify() {
      this.isShowClassify = true;
    },
    //点击查看品牌参数
    showParameter() {
      this.isShowParameter = true;
    },
    //关闭品牌参数
    hideParameter() {
      this.isShowParameter = false;
    },
    //跳转到评价详情页
    togoodappraise() {
      this.$router.push({
        path: "/goodappraise",
        query: {
          cargoId: this.$route.query.cargoId,
        },
      });
    },
    //收藏
    isCollect() {
      if (this.islogin == "") {
        this.$router.push("/login");
      } else {
        if (
          this.collectImg == require("../assets/img/gooddetail/collect.svg")
        ) {
          //接口：收藏商品
          axios
            .instance({
              url: "/like/addLike",
              method: "get",
              params: {
                likeUserId: JSON.parse(localStorage.getItem("user")).id,
                likeCargoId: this.$route.query.cargoId,
              },
            })
            .then(() => {
              this.collectImg = require("../assets/img/gooddetail/collect_succ.svg");
              Toast("收藏成功");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          //接口：取消收藏
          axios
            .instance({
              url: "/like/update",
              method: "get",
              params: {
                likeUserId: JSON.parse(localStorage.getItem("user")).id,
                likeCargoId: this.$route.query.cargoId,
              },
            })
            .then(() => {
              this.collectImg = require("../assets/img/gooddetail/collect.svg");
              Toast("取消收藏成功");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    //添加到购物车
    onAddCartClicked(skuData) {
      //cartItem:点击事件触发时返回的数据，即选择的一个商品
      //addGood:存储到本地的数组
      let cartItem = {
        cargoId: this.gooddetail.cargoId,
        cargoName: this.gooddetail.cargoName,
        cargoPrice: this.gooddetail.cargoPrice,
        cargoNum: skuData.selectedNum,
        cargoPic: this.gooddetail.cargoPic,
      };
      if (this.islogin == "") {
        this.$router.push("/login");
      } else {
        let addGood = JSON.parse(localStorage.getItem("addCart"));
        if (addGood == null) {
          addGood = [];
          addGood.push(cartItem);
          localStorage.setItem("addCart", JSON.stringify(addGood));
          Toast("宝贝已成功添加到购物车");
        } else {
          for (let i = 0; i < addGood.length; i++) {
            if (addGood[i].cargoId == cartItem.cargoId) {
              addGood[i].cargoNum += cartItem.cargoNum;
              localStorage.setItem("addCart", JSON.stringify(addGood));
              Toast("为您加购" + addGood[i].cargoNum + "件该宝贝到购物车了哟");
              return;
            }
          }
          addGood.push(cartItem);
          localStorage.setItem("addCart", JSON.stringify(addGood));
          Toast("宝贝已成功添加到购物车");
        }
      }
    },
    //立即购买
    onBuyClicked(skuData) {
      if (this.islogin == "") {
        this.$router.push("/login");
      } else {
        this.$router.push({
          path: "/confirmorder",
          query: {
            cargoId: this.$route.query.cargoId,
            cargoNum: skuData.selectedNum,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
#good-detail {
  background-color: #f4f4f4;
  height: auto;
}
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
/* 分享面板 */
.van-popup--bottom.van-popup--round {
  border-radius: 0;
}

/* 商品图片 */
.van-swipe-item {
  width: 100vw;
  height: 100vw;
}
.van-swipe-item img {
  width: 100vw;
  height: auto;
  overflow: hidden;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: #fff;
}

/* 商品标题与价格 */
.good-title,
.good-classify {
  background-color: #fff;
  margin: 2vw;
  padding: 2vw;
  border-radius: 10px;
}
.good-title span {
  font-weight: bold;
}
.good-title .price {
  font-size: 6vw;
}
.good-title p {
  font-size: 4vw;
}

/* 商品分类与参数 */
.good-classify li {
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vw;
}
.good-classify li img {
  width: 4vw;
  height: 4vw;
}

/* 商品规格选择 */
.van-action-sheet__header {
  font-size: 3vw;
  font-weight: 900;
}
.van-action-sheet li {
  margin: 0 3vw;
  padding: 2vw 0;
  font-size: 3vw;
  border-bottom: 1px solid rgba(192, 192, 192, 0.2);
}
.van-button[data-v-8ebe12c4]:last-child {
  width: 94vw;
  margin: 3vw;
}

/* 评价 */
.appraise {
  background-color: #fff;
  margin: 2vw;
  padding: 3vw;
  margin-bottom: 0;
  border-radius: 10px;
}
.appraise_title {
  display: flex;
  justify-content: space-between;
}
.appraise img {
  width: 4vw;
  height: 4vw;
}
/* 分割线 */
.separator {
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #969696;
  margin: auto;
}

/* 商品详情 */
.details {
  margin-bottom: 8vh;
}
.details img {
  width: 100vw;
  height: auto;
}

/* 底部商品操作栏 */
.van-goods-action {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 8vh;
  box-shadow: 0px -3px 5px rgba(192, 192, 192, 0.2);
}
.van-button {
  height: 6vh;
  background: #fffae7;

  color: #323233;
  border-radius: 0;
}
.van-button:last-child {
  background: #00cacc;
  border: none;
  color: white;
  flex-grow: 2;
  margin-left: 3vw;
}
/* 改包 */
#good-detail /deep/ .van-sticky--fixed {
  top: 14vw !important;
}
#good-detail /deep/ .van-tabs__nav--line {
  width: 100% !important;
}
#good-detail /deep/ .van-sku-actions .van-button:first-of-type {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
#good-detail /deep/ .van-sku-actions .van-button:last-of-type {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
#good-detail /deep/ .van-sku-actions .van-button--warning {
  background: #fffae7;
  color: #323233;
}
#good-detail /deep/ .van-sku-actions .van-button--danger {
  background: #00cacc;
}
#good-detail /deep/ .van-sku-row__image-item {
  border-radius: 0;
}
#good-detail /deep/ .van-sku-row__item {
  border-radius: 0;
}
#good-detail /deep/ .van-sku-row__image-item--active {
  border: 2px solid #323233;
}
#good-detail /deep/ .van-sku-row__image-item::before {
  background: #fff;
}
#good-detail /deep/ .van-sku-row__item::before {
  background: #fff;
}
#good-detail /deep/ .van-sku-row__image-item--active {
  color: #323233;
}
#good-detail /deep/ .van-sku-row__item--active {
  color: #323233;
}
#good-detail /deep/ .van-sku-row__image-item--active {
  background: rgba(0, 202, 204, 0.3);
}
#good-detail /deep/ .van-sku-row__item--active {
  background: rgba(0, 202, 204, 0.3);
  border: 2px solid #323233;
}
</style>
