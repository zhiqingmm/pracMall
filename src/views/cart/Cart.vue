<template>
  <div id="phone">
    <nav-bar>
      <template #middle-bar>
        <h2>购物车</h2>
      </template>
    </nav-bar>
    <div class="seat"></div>

    <cart-item></cart-item>

  </div>
</template>

<script>
import CartItem from './cartitem/CartItem'
import NavBar from '../../components/NavBar.vue'
export default {
  name: "Phone",
  components:{
    CartItem,
    NavBar,
  },
  data() {
    return {
      checked: false,
      show: false,
    };
  },
  methods: {
  },
};
</script>

<style scoped>
#phone {
  height: 100vh;
}

/* 标题 */
.middle-bar h2 {
  font-size: 5vw;
}
.seat{
  height: 14vw;
}
</style>