<template>
  <div id="order">
    <nav-bar>
      <template #left-bar>
        <img src="../../../assets/img/profile/left_arr.svg" @click="back" />
      </template>
      <template #middle-bar>
        <h2>我的购买</h2>
      </template>
    </nav-bar>
    <div class="seat"></div>

    <!-- 导航栏 -->
    <ul class="scroll-nav">
      <li
        v-for="(item, index) in navitem"
        :key="item.nav"
        @click="activeNav(index)"
        :class="{ 'active-nav': isactive == index || isactive == item.id}"
      >
        <div>{{ item.nav }}</div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "../../../components/NavBar.vue";
export default {
  name: "Order",
  components: {
    NavBar,
  },
  data() {
    return {
      navitem: [
        { id: 0,nav: "全部", path: "/order/allorder" },
        { id: 1,nav: "待支付", path: "/order/waitpay" },
        { id: 2,nav: "待发货", path: "/order/waitsend" },
        { id: 3,nav: "待收货", path: "/order/waitget" },
        { id: 4,nav: "待评价", path: "/order/waitappraise" },
        { id: 5,nav: "退款/售后", path: "/order/drawback" }
      ],
      isactive: 0,
    };
  },
  created(){
    //跳转路由时让其对应的导航高亮
    for (let i = 0; i < this.navitem.length; i++) {
      if(this.$route.path == this.navitem[i].path){
        this.isactive = this.navitem[i].id
      }
    }
  },
  methods: {
    //返回到我的页面
    back() {
      this.$router.push('/profile');
    },
    //导航条中当前活跃的导航
    activeNav(index) {
      this.isactive = index;
      this.$router.push(this.navitem[index].path);
    },
  },
};
</script>

<style scoped>
#order{
  min-height: 100vh;
  background-color: #f4f4f4;
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
  height: 22vw;
}

/* 导航条 */
.scroll-nav {
  display: flex;
  background-color: #fff;
  align-items: center;
  width: 100%;
  overflow: scroll;
  position: fixed;
  top:14vw;
  left:0;
  z-index:1000;
}
.scroll-nav li{
  width: 16.7%;
}
.scroll-nav li div {
  width: 100%;
  height: 8vw;
  line-height: 8vw;
  text-align: center;
}
.active-nav {
  background-color: #00cacc;
  color: #fff;
  font-weight: bold;
}
</style>