const path = require("path");

const __resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("api", __resolve("src/api"))
      .set("base", __resolve("src/base"))
      .set("utils", __resolve("src/utils"))
      .set("mixin", __resolve("src/mixin"))
      .set("assets", __resolve("src/assets"))
      .set("config", __resolve("src/config"))
      .set("common", __resolve("src/common"))
      .set("components", __resolve("src/components"));
  },
  devServer: {
    open: true,
    port: 8598,
    https: false,
    hotOnly: false
  }
};
