<template>
  <div>
    <Header></Header>
    <!-- 路由挂载点 -->
    <router-view></router-view>

    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("getBaseCategoryList");
  },
};
</script>

<style>
</style>