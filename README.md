<!--
 * @Author: fcli
 * @Date: 2023-09-04 14:12:29
 * @LastEditors: fcli
 * @LastEditTime: 2023-09-04 17:31:14
 * @FilePath: /vue-auto-scroll/README.md
 * @Description: 
-->
# vue-auto-scroll


## VUE3 无缝滚动，循环滚动列表插件,支持鼠标滚动

```bash
npm install @fcli/vue-auto-scroll --save-dev 来安装


在项目中使用
import VueAutoScroll from '@fcli/vue-auto-scroll';
const app=createApp(App)
app.use(VueAutoScroll);
```

示例：

```html

<div class="content">
    <vue-auto-scroll :data="list" :steep="0.5" scrollDirection="top" :isRoller="true" :rollerScrollDistance="50">
      <div class="li" v-for="i in list" :key="i">
        {{ i }}
      </div>
    </vue-auto-scroll>
</div>

```

| 属性   | 属性名称 | 类型   | 可选值 |
| ------ | -------- | ------ | ------ |
| steep  | 滚动的速率   | number | 为正数即可 |
| scrollDirection | 滚动的方向   | string | top ,bottom,left,right |
| isRoller | 是否可以使用滚轮滚动   | boolean |true,false |
| rollerScrollDistance | 滚轮滚动的速率   | number |（isRoller 必须为 true）为正数即可  |
| data | 接收异步数据   | array |同步任务可不传 |


<font color=#ff0000>注： 当scrollDirection 为top或bottom时，一定要为 vue-auto-scroll 组件设置高度。 当scrollDirection 为left或right时，一定要为 vue-auto-scroll 组件设置宽度。并为嵌入vue-auto-scroll中的标签设置样式为display:inline-block; 示例样式名为list-item可以更改为其他类名。</font>

<font color=#ff0000>注：  当scrollDirection 为left或right时,是基于行内元素的“white-space: nowrap;” 来控制强制不换行的。有可能会影响其内部的文字排列。可以在list-item 层添加  white-space: normal; 来处理给问题。并为其添加固定宽度，以保证文字可以正常换行及插件的正确计算与显示。如果没有为其添加固定宽度，会造成插件获取父容器层的宽度值错误，导致显示混乱</font>
