<template>
  <div class="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { MessageBox } from 'mint-ui';

export default {
  data () {
    return {
    };
  },
  methods: {
    ...mapMutations({
      goBack: 'header/GO_BACK',
    })
  },
  computed: {
    ...mapState({
      direction: state => state.app.direction
    })
  },
  async mounted () {
    //初始化数据库
    // await this.$db.initDB();
    //语言设置
    // this.$i18n.locale = "CN";
  }
};
</script>
<style lang="scss">
@import './assets/common/theme.scss';
</style>
