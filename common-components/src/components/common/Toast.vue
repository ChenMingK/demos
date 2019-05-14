<template>
  <transition name="fade">
    <div class="toast-bg-wrapper" @click.prevent v-show="visible"><!--不处理任何的点击事件-->
      <div class="toast-bg">
        <div class="toast-wrapper">
          <div class="toast" v-html="showText"></div><!--内容按普通html插入-->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    // 要使用vue-create-api则需要加上name
    name: 'toast',
    props: {
      text: [String, Number], // 要传入消息框的内容
      timeout: {              // 可控的对话框显示时间
        type: Number,
        default: 1500
      }
    },
    data() {
      return {
        visible: false,
        showText: ''
      }
    },
    methods: {
      hide() {
        this.visible = false
      },
      // 提供显示对话框的方法
      show() {
        this.visible = true
        this.showText = this.text
        clearTimeout(this.task)
        this.task = null
        this.task = setTimeout(() => {
          this.visible = false
        }, this.timeout)
      },
      // 提供持续显示对话框的方法，比如显示下载进度，外部最后可通过调用hide()方法隐藏
      continueShow() {
        this.showText = this.text
        clearTimeout(this.task)
        this.task = null
        this.visible = true
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '@/assets/styles/mixin.scss';
  .toast-bg-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2000;
    width: 100%;
    height: 100%;
    background: transparent;
    .toast-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0 0 0 -50%;
      z-index: 2500;
      width: 100%;
      @include center;
      .toast-wrapper {
        width: 60%;
        line-height: 20px;
        padding: 10px 20px;
        box-sizing: border-box;
        background: #ccc;
        border-radius: 10px;
        font-size: 14px;
        color: white;
        .toast {
          text-align: center;
          word-break: break-all; // 允许在单词内换行
        }
      }
    }
  }
</style>
