import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//在编程是导航中重复点击跳转会出现下面错误
//解决这个错误vue-router.esm.js?3423:2065 Uncaught (in promise) NavigationDuplicated:
//重写VueRouter中的push或replace方法
//1 先备份一下之前的push方法
let originPush = VueRouter.prototype.push
// console.log(originPush);
//2 重写VueRouter中的push或replace方法
//调用这个方法是 参数1 告诉原来push方法，你往哪里跳转 参数2 成功 参数3 失败
VueRouter.prototype.push = function (location, resolve, reject) {
  // console.log(this); 
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)

  } else {
    originPush.call(this, location, () => { }, () => { })
  }

}
const routes = [
  {
    path: "/home",
    name: 'home',
    component: () => import("@/views/home"),
    meta: {
      show: true
    }
  },
  //路由重定向
  {
    path: "/",
    redirect: "/home"

  },
  {
    path: "/login",

    component: () => import("@/views/login"),
    meta: {
      show: false
    }
  },
  {
    path: '/search/:keyword?',
    component: () => import("@/views/search"),

    meta: {
      show: true
    },
    // props(route) {
    //   return {
    //     keyWord: route.params.keyWord,
    //     k: route.query.msg
    //   }
    // },
    name: "search"
  },
  {
    path: "/register",
    component: () => import("@/views/register"),
    meta: {
      show: false
    }
  }

]
const router = new VueRouter({
  routes
})

export default router
