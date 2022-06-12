import { getBaseCategoryListApi, getBannerApi, getFloorsApi } from "@/api"
const state = {
    categoryList: [], //三级联动数据
    bannerList: [],//轮播图数据
    floorsList: []
}
const mutations = {
    CATEGORYLIST(state, newVal) {
        state.categoryList = newVal
    },
    BANNERLIST(state, newVal) {
        state.bannerList = newVal

    },
    FLOORSLIST(state, newVal) {
        state.floorsList = newVal

    }

}
const actions = {
    async getBaseCategoryList(context) {
        const result = await getBaseCategoryListApi()
        context.commit("CATEGORYLIST", result)
    },
    async getBanner(context) {
        const res = await getBannerApi()
        console.log(res);
        context.commit("BANNERLIST", res)
    },
    async getFloors(context) {
        const res = await getFloorsApi()
        context.commit("FLOORSLIST", res)
    }

}
const getters = {
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
