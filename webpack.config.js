const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const developmentConfig = require("./webpack.dev.js");
const productionConfig = require("./webpack.prod.js");

module.exports = (env, argv) => {
  switch (argv.mode) {
    case "production":
      return merge(commonConfig(argv.mode), productionConfig);
    case "development":
      return merge(commonConfig(argv.mode), developmentConfig);
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};
