import Vue from 'vue';
import loaddingTemp from './loadding.vue'

const loaddingTpl = Vue.extend(loaddingTemp);
const loaddingVM = new loaddingTpl();
loaddingVM.$mount('#loadding');

export default {
    show(){
        loaddingVM.showup();
    },
    close(){
        loaddingVM.close();
    }
}