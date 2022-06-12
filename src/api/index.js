import request from "@/utlis/request"
import mockRequest from "@/utlis/mockRequest"
//获取三级联动
export function getBaseCategoryListApi() {
    return request({
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}
//获取轮播图
export function getBannerApi() {
    return mockRequest({
        url: "/banners",
        method: "get"
    })
}

//获取floor数据
export function getFloorsApi() {
    return mockRequest({
        url: "/floors",
        method: "get"
    })
}
export function getFloorsApi1() {
    return mockRequest({
        url: "/floors",
        method: "get"
    })
}

// git remote add origin git@github.com:QwYk-gl/app.git