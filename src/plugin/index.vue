<!--
 * @Author: fcli
 * @Date: 2023-09-04 10:34:58
 * @LastEditors: fcli
 * @LastEditTime: 2023-09-04 16:16:33
 * @FilePath: /vue-auto-scroll/src/plugin/index.vue
 * @Description: 
-->
<template>
    <div class="custom-list" ref="scrollBody" @mouseenter="mouseenterFunc" @mouseleave="mouseleaveFunc"
        @mousewheel="mousewheelFunc">
        <div class="list-body" :class="{
            'list-body2': isHorizontal
        }" ref="listBody" :style="{ transform: getScrollDistance() }">
            <slot></slot>
        </div>
        <div class="list-body" :class="{
            'list-body2': isHorizontal
        }" ref="tBody" v-if="isCanScroll" :style="{ transform: getScrollDistance() }">
            <slot></slot>
        </div>
    </div>
</template>
<script lang='ts' setup>
import {computed, ref, nextTick, onMounted } from 'vue';
//滚动距离
const scrollDistance = ref(0);
//滚动容器高度
const bodyHeight = ref(0);
//滚动容器宽度
const bodyWidth = ref(0);
//列表高度
const listHeight = ref(0);
//列表宽度
const listWidth = ref(0);
const isStop = ref(false);
const animationFrame = ref();
const isCanScroll = ref(true);
const scrollBody = ref<any>(null);
const listBody = ref<any>(null);
const props = defineProps(
    {
        steep: {
            //滚动速度
            type: Number,
            default: 1
        },
        scrollDirection: {
            //滚动方向
            type: String,
            default: "top"
        },
        isRoller: {
            //是否可以滑轮滚动
            type: Boolean,
            default: true
        },
        rollerScrollDistance: {
            //滑轮滚动的距离
            type: Number,
            default: 20
        },
        data: Array
    }
)
const isHorizontal = computed(() => {
    return props.scrollDirection === "left" || props.scrollDirection === "right"
})

const start = () => {
    //判断是否可以滚动函数
    let isScrollFunc = (bodySize:number, listSize:number) => {
        if (bodySize > listSize) {
            scrollDistance.value = 0;
            isCanScroll.value = !1;
        }
    };

    isStop.value = !1;
    //判断是否可以滚动
    if (!isHorizontal.value) {
        isScrollFunc(bodyHeight.value, listHeight.value);
    } else {
        isScrollFunc(bodyWidth.value, listWidth.value);
    }
    if (isCanScroll.value) {
        run();
    }
}

const run = () => {
    //清空动画
    clearAnimation();

    animationFrame.value = window.requestAnimationFrame(() => {
        //滚动主逻辑函数
        let main = (listSize:number, bodySize:number) => {
            let tempScrollDistance = Math.abs(scrollDistance.value);
            if (scrollDistance.value < 0) {
                let cc = 2 * listSize - bodySize;
                if (tempScrollDistance > cc) {
                    scrollDistance.value = -(listSize - bodySize);
                }
            } else {
                scrollDistance.value = -listSize;
            }
        };

        //根据滚动方向判断使用高度或宽度控制效果
        if (!isHorizontal.value) {
            main(listHeight.value, bodyHeight.value);
        } else {
            main(listWidth.value, bodyWidth.value);
        }
        //判断滚动值
        if (!isStop.value) {
            if (
                props.scrollDirection === "top" ||
                props.scrollDirection === "left"
            ) {
                scrollDistance.value -= props.steep;
            } else if (
                props.scrollDirection === "bottom" ||
                props.scrollDirection === "right"
            ) {
                scrollDistance.value += props.steep;
            }
            run();
        }
    });
}

const stop = () => {
    isStop.value = !0;
    clearAnimation();
}

const initData = () => {
    nextTick(() => {
        scrollDistance.value = 0;
        isCanScroll.value = !0;
        bodyHeight.value = scrollBody.value?.clientHeight;
        bodyWidth.value = scrollBody.value?.clientWidth;
        listHeight.value = listBody.value?.clientHeight;
        listWidth.value = listBody.value?.clientWidth;

        if (
            (bodyHeight.value !== 0 &&
                listHeight.value !== 0 &&
                listHeight.value >= bodyHeight.value) ||
            (bodyWidth.value !== 0 &&
                listWidth.value !== 0 &&
                listWidth.value >= bodyWidth.value)
        ) {
            isCanScroll.value = true;
            start();
        } else {
            isCanScroll.value = false;
        }
    });
}

//     //获取滚动样式
const getScrollDistance = () => {
    let style;
    if (!isHorizontal.value) {
        style = "translate(0px, " + scrollDistance.value + "px)";
    } else {
        style = "translate(" + scrollDistance.value + "px,0px)";
    }
    return style;
}
const clearAnimation = () => {
    if (animationFrame.value) {
        cancelAnimationFrame(animationFrame.value);
        animationFrame.value = null;
    }
}

const mouseenterFunc = () => {
    stop();
}
const mouseleaveFunc = () => {
    start();
}
const mousewheelFunc = (e:any) => {
    if (!isCanScroll.value || !props.isRoller) {
        return false;
    }
    let dis = e.deltaY;
    if (dis > 0) {
        scrollDistance.value -= props.rollerScrollDistance;
    } else {
        scrollDistance.value += props.rollerScrollDistance;
    }
    run();
}



onMounted(() => {
    //初始化页面数据
    initData();
}
)
</script>

<style scoped>
.custom-list {
    white-space: nowrap;
    font-size: 14px;
    overflow: hidden;
    height: 100%;
}

.list-body {
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
}

.list-body2 {
    display: inline-block;
}
</style>

