<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar v-if="this.$route.meta.show">

        <tab-bar-item path="/purchase">
            <template v-slot:item-img-active>
            <img src="./assets/img/tabbar/purchase-active.svg" alt="">
            </template>
            <template v-slot:item-img>
            <img src="./assets/img/tabbar/purchase.svg" alt="">
            </template>
            <template v-slot:item-text>
            <div>购买</div>
            </template>
        </tab-bar-item>

        <tab-bar-item path="/cart">
            <template v-slot:item-img-active>
            <img src="./assets/img/tabbar/recommend-active.svg" alt="">
            </template>
            <template v-slot:item-img>
            <img src="./assets/img/tabbar/recommend.svg" alt="">
            </template>
            <template v-slot:item-text>
            <div>购物车</div>
            </template>
        </tab-bar-item>

        <tab-bar-item path="/profile">
            <template v-slot:item-img-active>
            <img src="./assets/img/tabbar/profile-active.svg" alt="">
            </template>
            <template v-slot:item-img>
            <img src="./assets/img/tabbar/profile.svg" alt="">
            </template>
            <template v-slot:item-text>
            <div>我</div>
            </template>
        </tab-bar-item>

    </tab-bar>
  </div>
</template>

<script>
  import TabBar from './components/tabbar/TabBar.vue'
  import TabBarItem from './components/tabbar/TabBarItem.vue'
  export default{
    name:'App',
    components:{
      TabBar,
      TabBarItem,
    }
  }
</script>

<style>
  @import url('./assets/css/tabbar_base.css');
  img{
    width: 7vw;
    height: 7vw;
    vertical-align: middle;
  }
</style>
