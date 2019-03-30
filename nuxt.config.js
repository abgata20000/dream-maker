import path from "path";
import pkg from "./package";

const rootPath = path.resolve(__dirname, "/app");

export default {
  mode: "spa",
  srcDir: "app",
  server: {
    port: 3333,
    host: "0.0.0.0"
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~assets/scss/application.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/consola.js"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  resolve: {
    extensions: [".js", ".json", ".vue", ".ts"],
    root: rootPath,
    alias: {
      "@": rootPath,
      "~": rootPath
    }
  }
};
