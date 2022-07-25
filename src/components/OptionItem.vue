<template>
    <div id="option-item" @click="itemClick">
        <slot name="number"></slot>
        <slot name="title"></slot>
    </div>
</template>

<script>
export default {
    name:'OptionItem',
    methods:{
        itemClick(){
            this.$emit('itemClick')
        }
    }
}
</script>

<style scoped>
    #option-item{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>