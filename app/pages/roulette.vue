<template>
  <div id="list-demo">
    <div class="item-area">
      <input v-model="newItem" :disabled="isRun" />
      <button :disabled="isRun" @click="addItem">add</button>
      <ul>
        <li v-for="(item, idx) in items" :key="`item-${idx}`">
          {{ item
          }}<span v-show="!isRun"
            >[<span @click="removeItem(idx)">x</span>]</span
          >
        </li>
      </ul>
    </div>
    <div v-show="items.length > 1" class="roulette-area">
      <button v-show="!isRun" @click="run">run</button>
      <button v-show="isRun" @click="stop">stop</button>
      <div class="wrapper">
        <div class="item-box">
          <transition-group name="list" tag="p">
            <span v-for="item in showItems" :key="item" class="list-item">
              {{ item }}
            </span>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      newItem: "",
      items: ["アイテム1", "アイテム2"],
      showItems: [],
      showItemIndex: 0,
      nextNum: 1,
      isRun: false
    };
  },
  methods: {
    addItem() {
      const item = this.newItem.trim();
      if (item === "") return false;
      if (this.items.includes(item)) return false;
      this.items.push(item);
      this.newItem = "";
    },
    removeItem(idx) {
      this.items.splice(idx, 1);
    },
    run() {
      if (this.showItemIndex > this.items.length - 1) this.showItemIndex = 0;
      this.isRun = true;
      this.showItems.pop();
      this.showItems.push(this.items[this.showItemIndex++]);
      setTimeout(() => {
        if (this.isRun) {
          this.run();
        }
      }, 100);
    },
    stop() {
      this.isRun = false;
    }
  }
};
</script>

<style lang="scss">
/* TODO: スロット部分の上下を色を重ねて無理やり枠外見えないようにしているので重ね順とかで調整できるようにしたい */
.list-demo {
  background: yellow;
}
.wrapper {
  padding: 20px;
  background: #000;
}

.item-box {
  border: solid 1px #47494e;
  position: relative;
  padding: 3px;
  background: #fff;
}
.list-item {
  position: absolute;
  top: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.1s linear;
}
.list-enter {
  transform: translateY(-20px);
  transition-delay: 0s;
}
.list-leave-to {
  transform: translateY(20px);
  transition-delay: 0s;
}
</style>
