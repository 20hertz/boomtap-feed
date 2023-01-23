const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const developmentConfig = require("./webpack.dev.js");
const productionConfig = require("./webpack.prod.js");
const node_env = process.env.NODE_ENV;

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
