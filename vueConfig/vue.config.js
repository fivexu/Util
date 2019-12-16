const path = require("path");

const __resolve = dir => {
  return path.join(__dirname, dir);
};

// 压缩图片
const minImage = config => {
  const imagesRule = config.module.rule("images");
  imagesRule
    .use("image-webpack-loader")
    .loader("image-webpack-loader")
    .options({
      bypassOnDebug: true
    })
    .end();
};

// 重定向路径
const redirect = config => {
  config.resolve.alias
    .set("api", __resolve("src/api"))
    .set("base", __resolve("src/base"))
    .set("utils", __resolve("src/utils"))
    .set("mixin", __resolve("src/mixin"))
    .set("assets", __resolve("src/assets"))
    .set("config", __resolve("src/config"))
    .set("common", __resolve("src/common"))
    .set("components", __resolve("src/components"));
};

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  lintOnSave: true,
  chainWebpack: config => {
    redirect(config);
    if (process.env.NODE_ENV === "production") minImage(config);
  },
  devServer: {
    open: true,
    port: 8040,
    https: false,
    hotOnly: false
  }
};
