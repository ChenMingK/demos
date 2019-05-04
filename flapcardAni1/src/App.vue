<template>
  <div id="app">
    <flap-card :flapCardVisible="flapCardVisible" @close="closeFlapCard"></flap-card>
    <div class="startFlapCardAnimation-btn">
      <span class="icon-shake" @click="showFlapCard"></span>
    </div>
  </div>
</template>

<script>
import FlapCard from '@/components/FlapCard.vue'
export default {
  name: 'app',
  data() {
    return {
      flapCardVisible: false
    }
  },
  components: {
    FlapCard
  },
  methods: {
    showFlapCard() {
      this.flapCardVisible = !this.flapCardVisible
    },
    closeFlapCard() {
      this.flapCardVisible = false
    }
  }

}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #ccc;
}
.icon-shake {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 25px;
}
</style>
