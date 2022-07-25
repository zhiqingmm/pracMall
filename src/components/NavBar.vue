<template>
    <div id="nav-bar">
        <div class="left-bar">
            <slot name="left-bar"></slot>
        </div>
        <div class="middle-bar">
            <slot name="middle-bar"></slot>
        </div>
        <div class="right-bar">
            <slot name="right-bar"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'NavBar',
}
</script>

<style scoped>
    #nav-bar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 94vw;
        height: 8vw;
        padding: 3vw;
        background-color: #fff;
        z-index: 9999;
    }
</style>