import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
//黑色半透明提示标签
import { Toast } from 'vant';
//导航栏滚动效果
import { Tab, Tabs } from 'vant';
//轮播图
import { Swipe, SwipeItem } from 'vant';
//宫格
import { Grid, GridItem } from 'vant';
//购物车结算
import { SubmitBar } from 'vant';
//购物车商品列表
import { Card } from 'vant';
import { Stepper } from 'vant';
//商品选择导航
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
//复选框
import { Checkbox, CheckboxGroup } from 'vant';
//商品选项
import { Sku } from 'vant';
import { ActionSheet } from 'vant';
//分享面板
import { ShareSheet } from 'vant';
//图片懒加载
import { Lazyload } from 'vant';
//空购物车
import { Empty } from 'vant';
//联系人卡片
import { ContactCard } from 'vant';
import { Rate } from 'vant';


Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(SubmitBar);
Vue.use(Stepper);
Vue.use(Card);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Sku);
Vue.use(ActionSheet);
Vue.use(ShareSheet);
Vue.use(Lazyload);
Vue.use(Empty);
Vue.use(ContactCard);
Vue.use(Rate)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')