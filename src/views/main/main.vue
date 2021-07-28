<template>
  <div class="main"
       v-bind:class="{'footerNo':showfooter}">
    <div class="content">
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <!-- <keep-alive> -->
        <router-view style="height: 100%; width: 100%;"></router-view>
        <!-- </keep-alive> -->
      </transition>
    </div>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="/">
        <img v-show="selected=='/'"
             slot="icon"
             src="../../assets/imgs/main/home_page1.png">
        <img v-show="selected!='/'"
             slot="icon"
             src="../../assets/imgs/main/home_page2.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="Mine">
        <img v-show="selected=='Mine'"
             slot="icon"
             src="../../assets/imgs/main/account1.png">
        <img v-show="selected!='Mine'"
             slot="icon"
             src="../../assets/imgs/main/account2.png">
        账户
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import "../../assets/common/theme.scss";
import "./main.scss";
import { Tabbar, TabItem } from "mint-ui";
import { mapState } from "vuex";
export default {
  data () {
    return {
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      selected: this.$router.currentRoute.name != "Home" ? this.$router.currentRoute.name : '/'
    };
  },
  watch: {
    selected: function (val) {
      this.$router.push({
        path: val
      });
    }
  },
  mounted () {
    let that = this;
    window.onresize = () => {
      return (() => {
        that.showHeight = document.body.clientHeight;
      })()
    }
  },
  computed: {
    ...mapState({
      direction: state => state.app.direction
    }),
    showfooter () {
      if (this.docmHeight > this.showHeight) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    Tabbar, TabItem
  }
};
</script>
