<template lang="pug">
  .container
    .drawing-area(ref="drawingArea")
      p(v-for="key in Object.keys(values)" :key="`p-${key}`")
        | {{ key }} :
        | {{ values[key] }}
    .input-forms
      div(v-for="key in Object.keys(values)" :key="`input-${key}`")
        | {{ key }} :
        input(type="text" v-model="values[key]" maxlength="15")
    br
    .buttons
      .btn
        a(@click="downloadImage")
          | 画像を保存
      br
      .btn
        a(@click="showImage")
          | 画像を表示
      br
      .btn
        a(:href="tweetLink" rel="nofollow" target="_blank")
          | Twitterに投稿
      br
    modal(v-show="isShowModal" @close="closeModal")
      p 画像が作成されました。
      p 画像をタップして長押しで保存してください。
      div
        img(ref="image")
      p よかったらダウンロードした画像を添付して「#MY相関図」をつけてツイートしてね！
      .btn
        a(:href="tweetLink" rel="nofollow" target="_blank")
          | Twitterに投稿

</template>

<script>
import html2canvas from "html2canvas";
import Modal from "~/components/Modal";
export default {
  components: { Modal },
  data() {
    return {
      isShowModal: false,
      values: {
        神: "",
        父親: "",
        母親: "",
        兄: "",
        姉: "",
        妹: "",
        弟: "",
        ペット: "",
        おさななじみ: "",
        スーパーの人: ""
      }
    };
  },
  computed: {
    tweetLink() {
      return "https://twitter.com/share?text=画像を添付してツイートしてね！&url=https://abgata.jp";
    }
  },
  methods: {
    openModal() {
      this.isShowModal = true;
    },
    closeModal() {
      this.isShowModal = false;
    },
    downloadImage() {
      const target = this.$refs.drawingArea;
      html2canvas(target).then(canvas => {
        const dataUrl = canvas.toDataURL();
        const downloadLink = document.createElement("a");
        downloadLink.href = dataUrl;
        downloadLink.download = "dream-image.png";
        downloadLink.click();
      });
    },
    showImage() {
      const target = this.$refs.drawingArea;
      html2canvas(target).then(canvas => {
        const dataUrl = canvas.toDataURL();
        const img = this.$refs.image;
        img.src = dataUrl;
        this.openModal();
      });
    }
  }
};
</script>
<style lang="scss">
body {
  font-family: "MyYuGothicM", YuGothic, sans-serif;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}
.drawing-area {
  background-color: aquamarine;
  padding: 20px;
  border-radius: 10px;
}
.input-forms {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
input {
  border: 1px solid #eee;
  padding: 5px;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
