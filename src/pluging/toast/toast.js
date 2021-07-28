import toastTemp from "./toast.vue";
import $ from 'jquery'

export default {
  install: (Vue, options = {}) => {
    let defaultOpt = {
      position: "center-center", // 默认显示位置 x-y
      duration: 1500, // 持续时间
      icon: "",
      modal: false
    };

    defaultOpt = $.extend(true, defaultOpt, options);

    let toastTpl = Vue.extend(toastTemp);
    let toastVM = new toastTpl({
      propsData: {
        position: defaultOpt.position
      }
    });
    toastVM.$mount("#toast");

    Vue.prototype.$showToast = (opt = {}) => {
      let {
        text = "",
          modal = false,
          icon = "",
          duration = defaultOpt.duration,
          position = defaultOpt.position
      } = typeof opt == "string" ? {
        text: opt
      } : opt;
      toastVM.text = text;
      toastVM.position = position;
      toastVM.showup();

      window.setTimeout(function () {
        toastVM.close();
      }, duration);
    };

    Vue.prototype.$hideToast = () => {
      toastVM.close();
    };

    window.$showToast = Vue.prototype.$showToast;
    window.$hideToast = Vue.prototype.$hideToast;

  },

};
