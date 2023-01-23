const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const developmentConfig = require("./webpack.dev.js");
const productionConfig = require("./webpack.prod.js");
const node_env = process.env.NODE_ENV;

module.exports = () => {
  switch (node_env) {
    case "production":
      return merge(commonConfig(node_env), productionConfig);
    case "development":
      return merge(commonConfig(node_env), developmentConfig);
    default:
      throw new Error(`Trying to use an unknown mode, ${node_env}`);
  }
};
