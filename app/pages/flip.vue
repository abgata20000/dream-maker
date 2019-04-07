<template>
  <div id="flip-demo">
    <div class="item-area">
      <input v-model="newItem" :disabled="isRun" />
      <button :disabled="isRun" @click="addItem">add</button>
    </div>
    <div class="action-area">
      <button :disabled="isRun" @click="start">start</button>
      <button :disabled="isRun" @click="reset">reset</button>
    </div>
    <div class="boards-area">
      <div class="flip-boards">
        <transition-group name="flip-list" tag="ul">
          <li
            v-for="(item, idx) in items"
            :key="item"
            class="board left"
            :class="{ active: isSelected(idx) }"
            @click="selectItem(idx)"
          >
            <div class="front"></div>
            <div class="flipped">
              <h2>{{ item }}</h2>
              <button v-show="isAllOpen" @click="removeItem(idx)">削除</button>
            </div>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  components: {},
  data() {
    return {
      newItem: "",
      items: ["アイテム1", "アイテム2", "アイテム3", "アイテム4", "アイテム5"],
      selectedItemIndex: null,
      isAllOpen: true,
      isRun: false,
      cnt: 0,
      shuffleCount: 5
    };
  },
  methods: {
    start() {
      if (this.isRun) return false;
      this.reset();
      this.isAllOpen = false;
      this.isRun = true;
      this.shuffleCount = Math.floor(Math.random() * (10 + 1 - 3)) + 3;
      setTimeout(() => {
        this.shuffle();
      }, 1000);
    },
    shuffle() {
      this.items = _.shuffle(this.items);
      this.cnt++;
      setTimeout(() => {
        if (this.cnt < this.shuffleCount && this.isRun) {
          this.shuffle();
        } else {
          this.isRun = false;
        }
      }, 600);
    },
    reset() {
      this.isAllOpen = true;
      this.isRun = false;
      this.selectedItemIndex = null;
      this.cnt = 0;
    },
    isSelected(idx) {
      return this.isAllOpen || this.selectedItemIndex === idx;
    },
    selectItem(idx) {
      if (this.isRun) return false;
      if (this.selectedItemIndex !== null) return false;
      this.selectedItemIndex = idx;
    },
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
      this.isRun = true;
    },
    stop() {
      this.isRun = false;
    }
  }
};
</script>

<style lang="scss">
.flip-boards {
  position: relative;
}
.flip-boards .board {
  float: left;
  list-style: none;
  margin: 10px;
  position: relative;
  width: 200px;
  height: 200px;
  cursor: pointer;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
.flip-boards .board div {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px solid #ccc;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
}
.flip-boards .board .front {
  background: #7f828b;
}
.flip-boards .board .flipped {
}
.flip-boards .board h2 {
  margin-top: 80px;
  font-size: 1em;
}
.flip-boards .board.left.active {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.flip-boards .board.left .flipped {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.flip-list-move {
  transition: transform 0.5s;
}
</style>
