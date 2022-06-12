<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveShow">
      <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-show="isShow">
        <div class="all-sort-list2" @click="goSearch">
          <div
            class="item"
            v-for="(obj, index) in categoryList"
            :key="obj.categoryId"
          >
            <h3
              :class="{ bg: cruntIndex === index }"
              @mouseenter="changeIndex(index)"
            >
              <a
                :data-aName="obj.categoryName"
                :data-a1Id="obj.categoryId"
                style="cursor: pointer"
                >{{ obj.categoryName }}</a
              >
              <!-- <router-link to="/search">{{ obj.categoryName }}</router-link> -->
            </h3>
            <div
              class="item-list clearfix"
              v-for="obj2 in obj.categoryChild"
              :key="obj2.categoryId"
            >
              <div class="subitem">
                <dl class="fore">
                  <dt>
                    <a
                      :data-aName="obj2.categoryName"
                      :data-a2Id="obj2.categoryId"
                      style="cursor: pointer"
                      >{{ obj2.categoryName }}</a
                    >
                    <!-- <router-link to="/search">{{
                      obj2.categoryName
                    }}</router-link> -->
                  </dt>
                  <dd>
                    <em
                      v-for="obj3 in obj2.categoryChild"
                      :key="obj3.categoryId"
                    >
                      <a
                        :data-aName="obj3.categoryName"
                        :data-a3Id="obj3.categoryId"
                        style="cursor: pointer"
                        >{{ obj3.categoryName }}</a
                      >
                      <!-- <router-link to="/search">{{
                        obj3.categoryName
                      }}</router-link> -->
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      cruntIndex: -1,
      isShow: true, //控制挂载完后商品分类是否显示
    };
  },
  computed: {
    ...mapGetters(["home/categoryList"]),
    // ...mapState({
    //   categoryList: (state) => state.home.categoryList,
    // }),
  },
  mounted() {
    // this.$store.dispatch("getBaseCategoryList");
    if (this.$route.path != "/home") {
      this.show = false;
    }
    console.log(this.$route.name, "*****");
    console.log(mapState(), "pppp");
  },
  methods: {
    //我们要给这个函数添加节流
    // changeIndex(index) {
    //   this.cruntIndex = index;
    //   //   console.log(index, "ooo");
    // },
    changeIndex: throttle(function (index) {
      //   console.log(this, "lllll");
      this.cruntIndex = index;
    }, 50),
    goSearch(event) {
      //问题1 我委托了事件  点击内部子元素都会出发  如何知道我点击的是a标签呢
      //   console.log(event);
      const { target } = event;
      //   console.log(target);
      console.log(target.dataset);
      const { aname, a1id, a2id, a3id } = target.dataset;
      //   console.log(aname);
      if (aname) {
        //问题2 我怎么知道我点击的是1级 还是2级 还是3级呢
        //处理参数
        const location = { name: "search" };
        const query = { categoryName: aname };
        if (a1id) {
          //点击的是1级
          query.category1Id = a1id;
        } else if (a2id) {
          //点击的是2级
          query.category2Id = a2id;
        } else {
          //点击的是3级
          query.category3Id = a3id;
        }

        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }

        // console.log(location);
        // this.$router.push(location);
      }
    },
    enterShow() {
      this.isShow = true;
    },
    leaveShow() {
      if (this.$route.name === "search") {
        this.cruntIndex = -1;
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          .bg {
            background-color: pink;
          }
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>