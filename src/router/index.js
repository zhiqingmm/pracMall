import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/purchase',
}, {
    path: "/register",
    name: "注册",
    component: () =>
        import ("../components/Register.vue"),
}, {
    path: "/login",
    name: "登录",
    component: () =>
        import ("../components/Login.vue"),
}, {
    path: "/purchase",
    name: "购物",
    meta: {
        show: true,
    },
    component: () =>
        import ("../views/purchase/Purchase.vue"),
}, {
    path: "/cart",
    name: "购物车",
    meta: {
        auth: true,
        show: true,
    },
    component: () =>
        import ("../views/cart/Cart.vue"),
}, {
    path: "/profile",
    name: "我的",
    meta: {
        show: true,
        auth: true,
    },
    component: () =>
        import ("../views/profile/Profile.vue"),
    children: [{
        path: "setting",
        name: "设置",
        meta: {
            showprofile: true,
        },
        component: () =>
            import ("../views/profile/toelse/Setting.vue"),
    }],
}, {
    path: "/order",
    name: "我的订单",
    component: () =>
        import ("../views/profile/order/Order.vue"),
    redirect: '/order/allorder',
    children: [{
        path: 'allorder',
        name: '全部订单',
        component: () =>
            import ("../views/profile/order/AllOrder.vue")
    }, {
        path: 'waitpay',
        name: '待支付订单',
        component: () =>
            import ("../views/profile/order/WaitPay")
    }, {
        path: 'waitsend',
        name: '待发货订单',
        component: () =>
            import ("../views/profile/order/WaitSend.vue")
    }, {
        path: 'waitget',
        name: '待收货订单',
        component: () =>
            import ("../views/profile/order/WaitGet.vue")
    }, {
        path: 'waitappraise',
        name: '待评价订单',
        component: () =>
            import ("../views/profile/order/WaitAppraise")
    }, {
        path: 'drawback',
        name: '退款订单',
        component: () =>
            import ("../views/profile/order/Drawback.vue")
    }],
}, {
    path: "/gooddetail",
    name: "商品详情",
    component: () =>
        import ("../components/GoodDetail.vue"),
}, {
    path: "/goodappraise",
    name: "商品评价",
    component: () =>
        import ("../components/GoodAppraise.vue"),
}, {
    path: "/confirmorder",
    name: "确认订单",
    component: () =>
        import ("../components/ConfirmOrder.vue"),
}, {
    path: "/appraise",
    name: "发表评价",
    component: () =>
        import ("../components/Appraise.vue"),
}, {
    path: "/drawbackedit",
    name: "申请退款",
    component: () =>
        import ("../components/DrawbackEdit.vue"),
}, {
    path: "/pay",
    name: "支付",
    component: () =>
        import ("../components/Pay.vue"),
}, {
    path: "/collect",
    name: "商品收藏",
    component: () =>
        import ("../views/profile/toelse/Collect.vue"),
}, {
    path: "/address",
    name: "地址管理",
    component: () =>
        import ("../components/Address.vue"),
}, {
    path: "/addressedit",
    name: "地址编辑",
    component: () =>
        import ("../components/AddressEdit.vue"),
}];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//解决首次登录导航守卫跳转报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to, from, next) => {
    //判断跳转的页面是否需要做鉴权
    if (to.meta.auth) {
        //判断vuex中是否有token
        if (store.state['token'] == '' || store.state['token'] == null) {
            //没有则判断本地缓存中是否有token
            if (localStorage.getItem('user') != null && Object.keys(JSON.parse(localStorage.getItem('user'))).indexOf('token') > 0 && JSON.parse(localStorage.getItem('user')).token != '') {
                //本地缓存中有,vuex中没有，则将本地缓存的token给vuex
                next(
                    store.state.token = JSON.parse(localStorage.getItem('user'))
                )
            } else {
                next('/login')
            }
        } else {
            next()
        }
    }

    // 修改页面标题
    document.title = to.name;
    next();
});



export default router