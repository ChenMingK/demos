<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex: item.zIndex}">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left"
               :style="semiCircleStyle(item, 'left')"
               ref="left"><!--左半圆, 动态绑定样式-->
          </div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right"
               :style="semiCircleStyle(item, 'right')"
               ref="right"><!--右半圆-->
          </div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
  
</template>

<script>
  import { flapCardList } from '@/utils/flapcardData.js'
  export default {
    props: {
      flapCardVisible: Boolean
    },
    data() {
      return {
        flapCardList, // 简写 flapCardList: flapCardList
        intervalTime: 25, // 每帧间隔
        front: 0, // 位于上面的卡片的下标
        back: 1   // 位于下面的卡片的下标, 2张卡片为一个组合
      }
    },
    watch: {
      flapCardVisible(v) {
        if (v) {
          this.startFlapCardAnimation()
        }
      }
    },
    methods: {
      // item为传入的一张图(又分为左右)的数据，dir为方向
      semiCircleStyle(item, dir) {
        return {
          backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
          backgroundSize: item.backgroundSize,
          backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
        }
      },
      // index：卡片下标-第几个圆  type：front back 正面/背面 正面转的是右半圆 背面转的是左半圆
      rotate(index, type) {
        const item = this.flapCardList[index]
        let dom
        // Dom取到第index卡片的左/右半圆
        if (type === 'front') {
          dom = this.$refs.right[index]
        } else {
          dom = this.$refs.left[index]
        }
        dom.style.transform = `rotateY(${item.rotateDegree}deg)`
        dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})` // 注意g用于还原,颜色改变修改_g值
      },
      flapCardRotate() {
        const frontFlapCard = this.flapCardList[this.front] // 正面的卡片
        const backFlapCard = this.flapCardList[this.back]   // 背面的卡片
        frontFlapCard.rotateDegree += 10 // 每次旋转10度
        frontFlapCard._g -= 5            // 颜色加深 g增加是颜色变浅,g减小是变深
        backFlapCard.rotateDegree -= 10
        // 看不到的时候颜色不做变化
        if (backFlapCard.rotateDegree < 90) {
          backFlapCard._g += 5
        }
        if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
          backFlapCard.zIndex += 2
        }
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
          this.next() // 切换到下一组卡片
        }
      },
      // 让背面元素的左半圆和右半圆先重叠
      prepare() {
        const backFlapCard = this.flapCardList[this.back] // 浅复制?改变backFlapCard会改变this.flapCardList[this.back]
        backFlapCard.rotateDegree = 180
        backFlapCard._g = backFlapCard.g - 5 * 9 // 预先减少颜色值(加深)，90度-9次，这样转动时抵消预先减少的部分到达90度时颜色一致
        this.rotate(this.back, 'back')
      },
      // 切换到下一组卡片
      next() {
        const frontFlapCard = this.flapCardList[this.front] // 获取正面的卡片
        const backFlapCard = this.flapCardList[this.back]   // 获取背面的卡片
        // 归位以及颜色的还原
        frontFlapCard.rotateDegree = 0 
        backFlapCard.rotateDegree = 0
        frontFlapCard._g = frontFlapCard.g
        backFlapCard._g = backFlapCard.g
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        // 切换指针到下一组, 并判断是否越界
        this.front++
        this.back++
        const len = this.flapCardList.length
        if (this.front >= len) {
          this.front = 0
        }
        if (this.back >= len) {
          this.back = 0
        }
        // 改动z-index才能看见
        // 动态设置zIndex, 实现下列目标
        // 100 -> 96
        // 99 -> 100
        // 98 -> 99
        // 97 -> 98
        // 96 -> 97
        // (0 - 1 + 5) % 5 = 4 -> 100 - 4 = 96
        // (1 - 1 + 5) % 5 = 0 -> 100 - 0 = 100 
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - ((index - this.front + len) % len)
        })
        // 注意prepare()
        this.prepare()
      },
      // 开始卡片转动动画的方法
      startFlapCardAnimation() {
        this.prepare()
        this.task = setInterval(() => {
          this.flapCardRotate()
        }, this.intervalTime)
      },
      // 提供关闭动画的方法, 1.需要关闭定时任务 2.需要将卡片全部重置
      stopFlapCardAnimation() {
        if (this.task) {
          clearInterval(this.task)
        }
        this.reset()
      },
      reset() {
        this.front = 0
        this.back = 1
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - index
          item._g = item.g
          item.rotateDegree = 0
          this.rotate(index, 'front')
          this.rotate(index, 'back')
        })
      },
      close() {
        this.stopFlapCardAnimation()
        this.$emit('close')
      }
     },
    mounted() {
      // this.startFlapCardAnimation()
    }
  }
</script>

<style lang='scss' scoped>
  @mixin center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @mixin abscenter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto; // 绝对定位居中
  }
  .flap-card-wrapper {
    width: 100%;
    height: 100%;
    z-index: 1000;
    @include center;
    @include abscenter;
    .flap-card-bg {
      width: 60px;
      height: 60px;
      background: white;
      border-radius: 5px;
      @include abscenter;
      .flap-card {
        width: 48px;
        height: 48px;
        // background: yellow;
        @include abscenter;
        .flap-card-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          @include center;
          // background: blue;
          .flap-card-semi-circle {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            backface-visibility: hidden;   // 隐藏被旋转的div元素的背面
          }
          .flap-card-semi-circle-left {
            border-radius: 24px 0 0 24px; // 左上 右上 右下 左下 弧形-高度的一半
            background-position: center right;
            transform-origin: right; // 设定转动轴 默认是center 左侧转动轴沿着右侧
          }
          .flap-card-semi-circle-right {
            border-radius: 0 24px 24px 0;
            background-position: center left; // 水平位置  垂直位置  
            transform-origin: left;           // 右侧转动轴沿着左侧
          }
        }
      }
    }
    .close-btn-wrapper {
      position: absolute;
      bottom: 40px;
      width: 45px;
      height: 45px;
      background: rgba(0, 0, 0, .3);
      border-radius: 50%;
      @include center;
      .icon-close {
        font-size: 25px;
      }
    }
  }
</style>
