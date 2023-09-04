/*
 * @Author: fcli
 * @Date: 2023-09-04 10:34:52
 * @LastEditors: fcli
 * @LastEditTime: 2023-09-04 17:05:09
 * @FilePath: /vue-auto-scroll/src/plugin/index.ts
 * @Description: 
 */
import vueAutoScroll from './index.vue';

const VueAutoScroll = {
    install(app:any){
        app.component('VueAutoScroll',vueAutoScroll);
    }
}
export default VueAutoScroll;
