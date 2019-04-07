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
      p よかったらダウンロードした画像を添付して「#私の夢」をつけてツイートしてね！
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
        value_1: "",
        value_2: "",
        value_3: "",
        value_4: "",
        value_5: "",
        value_6: "",
        value_7: "",
        value_8: "",
        value_9: "",
        value_10: ""
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
