<!--
 * @Author: fcli
 * @Date: 2023-09-04 10:32:44
 * @LastEditors: fcli
 * @LastEditTime: 2023-09-04 15:44:33
 * @FilePath: /vue-auto-scroll/src/App.vue
 * @Description: 
-->
<script setup lang="ts">
import vueAutoScroll from './plugin/index.vue';
import { ref, onMounted } from 'vue';
component: {
  vueAutoScroll
}

const list = ref<any>([])
onMounted(() => {
  for (let i = 0; i < 100; i++) {
    list.value.push(i + "这是滚动列表的数据！！！")
  }
})
</script>

<template>
  <div class="content">
    <vue-auto-scroll :data="list" :steep="0.5" scrollDirection="top" :isRoller="true" :rollerScrollDistance="50">
      <div class="li" v-for="i in list" :key="i">
        {{ i }}
      </div>
    </vue-auto-scroll>
  </div>
</template>

<style scoped>
.content {
  height: 300px;
  width: 500px;
  background: #fff;
  overflow: hidden;

  .li {
    height: 32px;
    line-height: 32px;
    color: #000;
    font-size: 14px;
  }
}
</style>
