<template>
  <transition name="fade">
    <div class="dialog" v-show="visible">
      <div class="dialog-wrapper">
        <div class="dialog-title-wrapper">
          <span class="dialog-title-text">{{title}}</span>
        </div>
        <slot>
        </slot><!--插槽-->
        <div class="dialog-btn-wrapper">
          <slot name="btn"><!--带默认样式的插槽，不填写按钮的话默认两个按钮-->
            <div class="dialog-btn" @click="hide">取消</div>
            <div class="dialog-btn">确认</div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'my-dialog',
    props: {
      title: String
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '@/assets/styles/mixin.scss';
  .dialog {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
    font-size: 16px;
    color: #333;
    @include center;
    .dialog-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 60%;
      max-height: 80%;
      background: white;
      border-radius: 10px;
      .dialog-title-wrapper {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        padding: 30px 0 20px 0;
      }
      .dialog-btn-wrapper {
        display: flex;
        width: 100%;
        background: #019fde;
        font-size: 14px;
        font-weight: bold;
        color: white;
        text-align: center;
        padding: 15px 0;
        border-radius: 0 0 10px 10px;
        .dialog-btn {
          flex: 1;
          &.is-empty {
            color: rgba(255, 255, 255, .5); // ???
          }
          &:active { // ???
            color: rgba(255, 255, 255, .5);
          }
        }
      }
    }
  }
</style>
