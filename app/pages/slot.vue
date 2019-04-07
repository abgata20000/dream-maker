<template lang="pug">
  .container
    .slot-area-wrapper
      .slot-area
        transition-group(:css="true" @before-enter="beforeEnter" @enter="enter" @leave="leave")
          .item(v-for="item in items" :key="item")
            | {{ item }}
    div.controlls
      button(v-show="!isRun" @click="start")
        | start
      button(v-show="isRun" @click="stop")
        | stop
</template>

<script>
import Anime from "animejs";
export default {
  components: {},
  data() {
    return {
      isShow: false,
      isRun: false,
      items: [0],
      nextNum: 1,
      num: 1
    };
  },
  methods: {
    start() {
      if (this.nextNum > 9) this.nextNum = 0;
      this.isRun = true;
      // this.items.pop();
      this.items.unshift(this.nextNum++);
    },
    stop() {
      this.isRun = false;
    },
    run() {},
    beforeEnter(el) {},
    enter(el) {
      const h = el.clientHeight;
      this.$consola.log("enter", el);
      const basicTimeline = Anime.timeline();
      const vm = this;
      basicTimeline.add({
        targets: el,
        translateX: [0, 0],
        translateY: [-h, 0],
        duration: 1000,
        easing: "easeInSine",
        complete() {
          vm.items.pop();
        }
      });
    },
    leave(el) {
      const h = el.clientHeight;
      this.$consola.log("leave", el);
      const basicTimeline = Anime.timeline();
      basicTimeline.add({
        targets: el,
        translateX: [0, 0],
        translateY: [0, h],
        duration: 1000,
        easing: "easeInSine"
      });
    }
  }
};
</script>

<style lang="scss">
.slot-area-wrapper {
  float: left;
}

.controlls {
  float: right;
}
</style>
