<template>
  <div id="purchase" v-if="isactive == 0">
    <!-- 顶部导航栏 -->
    <nav-bar>
      <template #left-bar>
        <div>
          <h2>先鉴别后发货 保障全新正品</h2>
          <img src="../../assets/img/purchase/right_arr.svg" alt="" />
        </div>
        <div>
          <span>多重鉴别</span>
          <span>逐件查验</span>
          <span>正品保障</span>
        </div>
      </template>
      <template #right-bar>
        <img src="../../assets/img/purchase/classify.svg" alt="" />
        <h5>分类</h5>
      </template>
    </nav-bar>
    <div class="seat"></div>

    <!-- 搜索框 -->
    <div id="search">
      <div class="search-here"></div>
      <img src="../../assets/img/purchase/search.svg" class="search" />
      <img src="../../assets/img/purchase/camera.svg" class="camera" />
    </div>

    <!-- 滚动导航栏 -->
    <ul class="scroll-nav">
      <li
        v-for="(item, index) in navitem"
        :key="item.categoryId"
        @click="activeNav(index)"
        :class="{ 'active-nav': isactive == index }"
      >
        <div>{{ item.categoryNameLevel1 }}</div>
      </li>
    </ul>

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        ><img src="../../assets/img/purchase/nav/banner/banner1.png"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../../assets/img/purchase/nav/banner/banner2.png"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../../assets/img/purchase/nav/banner/banner3.png"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../../assets/img/purchase/nav/banner/banner4.png"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../../assets/img/purchase/nav/banner/banner5.png"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../../assets/img/purchase/nav/banner/banner6.png"
      /></van-swipe-item>
    </van-swipe>
    <van-swipe class="my-swipe1" indicator-color="blue">
      <van-swipe-item>
        <van-grid square>
          <van-grid-item
            v-for="item1 in classify1"
            :key="item1.title"
            :icon="item1.src"
            :text="item1.text"
          />
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid square>
          <van-grid-item
            v-for="item2 in classify2"
            :key="item2.title"
            :icon="item2.src"
            :text="item2.text"
          />
        </van-grid>
      </van-swipe-item>
    </van-swipe>

    <!-- 商品列表 -->
    <div
      class="good_item"
      @click="forMore(index)"
      v-for="(item, index) in newgoodlist"
      :key="item.cargoId"
    >
      <div><img :src="item.cargoPic" /></div>
      <p class="good_title">{{ item.cargoName }}</p>
      <p class="good_price">￥{{ item.cargoPrice.toFixed(2) }}</p>
    </div>
  </div>
  <div v-else>
      <!-- 顶部导航栏 -->
    <nav-bar>
      <template #left-bar>
        <div>
          <h2>先鉴别后发货 保障全新正品</h2>
          <img src="../../assets/img/purchase/right_arr.svg" alt="" />
        </div>
        <div>
          <span>多重鉴别</span>
          <span>逐件查验</span>
          <span>正品保障</span>
        </div>
      </template>
      <template #right-bar>
        <img src="../../assets/img/purchase/classify.svg" alt="" />
        <h5>分类</h5>
      </template>
    </nav-bar>
    <div class="seat"></div>

    <!-- 搜索框 -->
    <div id="search">
      <div class="search-here"></div>
      <img src="../../assets/img/purchase/search.svg" class="search" />
      <img src="../../assets/img/purchase/camera.svg" class="camera" />
    </div>

    <!-- 滚动导航栏 -->
    <ul class="scroll-nav">
      <li
        v-for="(item, index) in navitem"
        :key="item.categoryId"
        @click="activeNav(index)"
        :class="{ 'active-nav': isactive == index }"
      >
        <div>{{ item.categoryNameLevel1 }}</div>
      </li>
    </ul>

    <!-- 商品列表 -->
    <div
      class="good_item"
      @click="forMore(index)"
      v-for="(item, index) in newgoodlist"
      :key="item.cargoId"
    >
      <div><img :src="item.cargoPic" /></div>
      <p class="good_title">{{ item.cargoName }}</p>
      <p class="good_price">￥{{ item.cargoPrice.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import axios from "../../network/request.js";
import NavBar from "../../components/NavBar.vue";
var b;
var o={};
Object.defineProperty(o,'b',{
  get:function(){
    console.log("getter正在监听获取");
    return b;
  },
  set:function(newb){
    console.log("setter正在监听设置");
    b = newb;
  }
})
o.b = 22;
console.log(o.b);
export default {
  name: "Purchase",
  components: {
    NavBar,
  },
  data() {
    return {
      navitem: [
        { categoryId: "0", categoryLevel: "0", categoryNameLevel1: "推荐" },
      ],
      isactive: 0,
      //原始接口中获取的数据
      goodlist: [],
      //根据分类筛选后的数据
      newgoodlist: [],
       classify1:[
                {src:require('F:/code/app/src/assets/img/purchase/table/t2.jpg'),text:'新品发售'},
                {src:require('F:/code/app/src/assets/img/purchase/table/t13.jpg'),text:'品牌专区'},
                {src:require('F:/code/app/src/assets/img/purchase/table/t14.jpg'),text:'热卖羽绒服'},
                {src:require('F:/code/app/src/assets/img/purchase/table/t14.jpg'),text:'李宁板鞋'},
                {src:require('F:/code/app/src/assets/img/purchase/table/t15.jpg'),text:'新品发售'},],
            classify2:[                
                {src:require('F:/code/app/src/assets/img/purchase/table/t16.jpg'),text:'国货之光'},
                {src:require('F:/code/app/src/assets/img/purchase/table/t3.jpg'),text:'限时补贴'},
                {src:require('F:/code/app/src/assets/img/purchase/table/t4.jpg'),text:'长款羽绒服'},
                {src:require('F:/code/app/src/assets/img/purchase/table/t6.jpg'),text:'通勤必备'},
                {src:require('F:/code/app/src/assets/img/purchase/table/t1.jpg'),text:'李宁新鞋'},]
    };
  },
  mounted() {
    //获取所有分类
    axios
      .instance({
        url: "/category/queryAll",
        method: "get",
      })
      .then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          this.navitem.push(res.data.data[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //获取所有商品
    axios
      .instance({
        url: "/cargo/queryAllCargo",
        method: "get",
      })
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          this.goodlist.push(res.data[i]);
        }
        this.newgoodlist = this.goodlist;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    //滚动导航中当前活跃的导航
    activeNav(index) {
      this.isactive = index;
      if (index == 0) {
        this.newgoodlist = this.goodlist;
      } else {
        this.newgoodlist = [];
        for (let i = 0; i < this.goodlist.length; i++) {
          if (
            this.goodlist[i].categoryNameLevel1 ==
            this.navitem[index].categoryNameLevel1
          ) {
            this.newgoodlist.push(this.goodlist[i]);
          }
        }
      }
    },
    //点击查看具体商品
    forMore(index) {
      this.$router.push({
        path: "/gooddetail",
        query: { cargoId: this.newgoodlist[index].cargoId },
      });
    },
  },
};
</script>

<style>
#purchase {
  overflow: scroll;
  margin-bottom: 8vh;
}

/* 顶部导航 */
.left-bar div:first-child {
  display: flex;
  align-items: center;
}
.left-bar div:first-child h2 {
  font-size: 5vw;
  letter-spacing: 0;
}
.left-bar div:first-child img {
  width: 5vw;
  height: 5vw;
}
.left-bar div:last-child {
  display: flex;
  justify-content: space-around;
  margin-top: 1vw;
}
.left-bar div:last-child span {
  color: rgb(130, 130, 130);
  flex-grow: 1;
  padding-left: 4vw;
  border-left: 1px solid rgb(130, 130, 130);
}
.left-bar div:last-child span:last-child {
  border-right: 1px solid rgb(130, 130, 130);
}
.seat {
  height: 14vw;
}

/* 搜索框 */
#search {
  position: relative;
  margin: 3vw 0;
}
.search-here {
  width: 94vw;
  margin-left: 3vw;
  border: none;
  background-color: #f4f4f4;
  height: 11vw;
  border-radius: 5px;
}
#search .search {
  width: 6vw;
  position: absolute;
  top: 2vw;
  left: 5vw;
}
#search .camera {
  width: 6vw;
  position: absolute;
  top: 2vw;
  right: 5vw;
}

/* 导航条 */
.scroll-nav {
  display: flex;
  align-items: center;
  overflow: scroll;
}
.scroll-nav li div {
  width: 25vw;
  height: 8vw;
  line-height: 8vw;
  text-align: center;
}
.active-nav {
  background-color: #00cacc;
  color: #fff;
  font-weight: bold;
}

/* 轮播图 */
.my-swipe {
  padding: 3vw 0;
}
.my-swipe .van-swipe-item {
  color: #fff;
  text-align: center;
}
.my-swipe .van-swipe-item img {
  width: 94vw;
  height: auto;
  border-radius: 5px;
}
.my-swipe .van-swipe__indicators {
  bottom: 20px;
}
/* 宫格设置 */
.van-grid-item {
  flex-basis: 20% !important;
}
.van-icon__image {
  width: 100% !important;
  height: 100% !important;
}
/* 单个商品 */
.good_item {
  width: 45vw;
  padding: 2vw;
  display: inline-block;
  border-bottom: 1px solid #f4f4f4;
  border-left: 1px solid #f4f4f4;
}
.good_item img {
  width: 46vw;
  height: 46vw;
  object-fit: cover;
}
.good_title {
  width: 46vw;
  height: 8vw;
  letter-spacing: 3px;
  font-size: 3vw;
  overflow: hidden;
  padding-top: 1vw;
}
.good_price {
  font-weight: bold;
  font-size: 4vw;
}
#tab-bar {
  position: relative;
}
</style>