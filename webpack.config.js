const { merge } = require("webpack-merge");
const commonConfig = require("./bundler/webpack.common.js");
const developmentConfig = require("./bundler/webpack.dev.js");
const productionConfig = require("./bundler/webpack.prod.js");

module.exports = (_, argv) => {
  switch (argv.mode) {
    case "production":
      return merge(commonConfig(), productionConfig, {
        mode: argv.mode,
      });
    case "development":
      return merge(commonConfig(), developmentConfig, {
        mode: argv.mode,
      });
    default:
      throw new Error(`Trying to use an unknown mode, ${argv.mode}`);
  }
};
