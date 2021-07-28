import Vue from "vue";
import VueI18n from "vue-i18n";
import enLocale from "./en";
import zhLocale from "./zh";

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: sessionStorage.lang || "CN",
  messages: {
    EN: {
      ...enLocale
    },
    CN: {
      ...zhLocale
    }
  }
});
export default i18n;