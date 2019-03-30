// nuxt.config.jsだとintellijが読み込めなくてエラーになってしまい、エイリアス設定効かなくなってしまうのでエイリアス専用でファイルをおいておく
const path = require("path");
const rootPath = path.resolve(__dirname) + "/app";

module.exports = {
  srcDir: "app",
  resolve: {
    extensions: [".js", ".json", ".vue", ".ts"],
    root: rootPath,
    alias: {
      "@": rootPath,
      "~": rootPath
    }
  }
};
