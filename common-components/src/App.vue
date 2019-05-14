<template>
  <div id="app">
    <div class="btn-wrapper">
      <button @click="showToast">Toast</button>
      <button @click="showDialog">Dialog</button>
      <button @click="showPopup">Popup</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      toastText: 'this is a toast',
      dialogText: 'this is a dialog',
      popupTitle: 'this is a popup',
      popupBtn: [
        {
          text: 'text1'
        },
        {
          text: 'text2'
        }
      ]
    }
  },
  methods: {
    showToast() {
      // vue-create-api不会简单地重复添加组件
      this.$createToast({
        $props: {
          text: 'this is a Toast'
        }
      }).show() // 调用这个组件的show方法
    },
    showDialog() {
      this.$createMyDialog({
        $props: {
          title: 'this is a Dialog'
        }
      }).show() // 调用这个组件的show方法
    },
    showPopup() {
      this.$createPopup({
        $props: {
          text: 'this is a Popup',
          btn: [
            {
              type: 'danger',
              text: 'btn1-text',
              click: function () {
                console.log('click btn1')
              }
            },
            {
              text: 'btn2-text',
              click: function () {
                console.log('click btn2')
              }
            }
          ]
        }
      }).show() // 调用这个组件的show方法
    }
  }

}
</script>

<style lang="scss" scoped>
  @import './assets/styles/mixin.scss';
  #app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include center;
    .btn-wrapper {
      display: flex;
      flex-direction: column;
      height: 300px;
      justify-content: space-around;
    }
  }
</style>
