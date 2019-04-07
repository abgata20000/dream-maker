<template lang="pug">
  .container
    .slot-area-wrapper
      .slot-area(ref="slotArea")
        .item
          | あああ
        .item
          | いいい
        .item
          | ううう
    div.controlls
      button(v-show="!isRun" @click="start")
        | start
      button(v-show="isRun" @click="stop")
        | stop
</template>

<script>
// import Anime from "animejs";
export default {
  components: {},
  data() {
    return {
      isShow: false,
      isRun: false,
      num: 1
    };
  },
  methods: {
    start() {
      this.isRun = true;
      this.run();
    },
    stop() {
      this.isRun = false;
    },
    run() {
      if (!this.isRun) return;
      const el = this.$refs.slotArea;
      const height = el.clientHeight;
      if (this.num >= height) {
        this.num = 0;
      } else {
        this.num += 1;
      }
      el.style.top = `${this.num}px`;
      setTimeout(() => {
        this.run();
      }, 50);
    }
  }
};
</script>

<style lang="scss">
.container {
  padding: 50px;
  clear: both;
  width: 300px;
  background: #fff;
}
.slot-area-wrapper {
  float: left;
  border: solid #47494e 1px;
  height: 25px;
  width: 100px;
}
.slot-area {
  /* margin-top: -50px; */
  position: absolute;
  top: 30px;
}
.controlls {
  float: right;
}
</style>
