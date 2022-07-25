<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'TabBar',
}
</script>

<style scoped>
    #tab-bar{
        height: 13vw;
        display: flex;
        align-items: center;
        background-color: #fff;

        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0px -3px 5px rgba(192, 192, 192,.2);
  }
</style>