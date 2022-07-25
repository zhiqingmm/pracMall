<template>
    <div id="tab-bar-item" @click="itemClick">
        <div v-if="isActive"><slot name="item-img-active"></slot></div>
        <div v-else><slot name="item-img"></slot></div>
        <div :class="{active:isActive}"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name:'TabBarItem',
        props:{
            path:String,
        },
        methods:{
            itemClick(){
                //点击时跳转路径，跳转去的路径通过值来选择
                this.$router.push(this.path)
            }
        },
        computed:{
            isActive(){
                //当当前活跃路由中的路径和url路径相等的时候，改变样式
                return this.$route.path == this.path
            }
        }
    }
</script>

<style scoped>
    #tab-bar-item{
        flex-grow: 1;
        text-align: center;
        font-size: 3vw;
    }
    .active{
        color: #00cacc;
    }
</style>