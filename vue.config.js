const path = require("path");

module.exports = {
  css: { extract: false },
  configureWebpack:
    process.env.NODE_ENV === "production"
      ? {
          entry: "./index.js",
          output: {
            filename: "build.js",
            library: "vcc",
            libraryTarget: "umd",
            umdNamedDefine: true,
          },
        }
      : {
        entry: "./main.js"
      },

  lintOnSave: true,

  chainWebpack: (config) => {
    const vueRule = config.module.rule("vue");

    vueRule
      .use("iview-loader")
      .loader("iview-loader")
      .tap((options) => {
        // 修改它的选项...
        return {
          prefix: false,
        };
      });

    config.resolve.alias.set("vue$", "vue/dist/vue.esm.js");
  },

  publicPath: process.env.PUBLIC_PATH,
  productionSourceMap: false,

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  transpileDependencies: ["quasar"],
};
