<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>
 
<script>
import ListContainer from "@/views/home/listContainer";
import Recommend from "@/views/home/recommend";
import Rank from "@/views/home/rank";
import Like from "@/views/home/like";
import Floor from "@/views/home/floor";
import Brand from "@/views/home/brand";
import { mapState } from "vuex";
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState(["home/floorsList"]),
  },
  mounted() {
    this.$store.dispatch("getFloors");
  },
};
</script>

<style>
</style>