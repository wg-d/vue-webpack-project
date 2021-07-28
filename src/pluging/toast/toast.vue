<template>
    <transition enter-active-class="animated  faster fadeIn" leave-to-class="animated faster fadeOut">
        <div class="toast-content" :class="position"  v-if="show">
            <span>{{text}}</span>
        </div>
    </transition>
</template>

<script>
import "./toast.scss";

export default {
  data() {
    return {
      text: "",
      position: "",
      show: false
    };
  },
  methods: {
    showup() {
      // this.$mui.toast(this.text);
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
};
</script>
