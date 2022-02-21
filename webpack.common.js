const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// We need Nodes fs module to read directory contents
const fs = require("fs");
const Dotenv = require("dotenv-webpack");

function generateHtmlPlugins(templateDir) {
  const dirents = fs.readdirSync(path.resolve(__dirname, templateDir), {
    withFileTypes: true,
  });
  const EXTENSION = ".html";

  const filesNames = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name)
    .filter((dirent) => path.extname(dirent).toLowerCase() === EXTENSION);

  return filesNames.map((item) => {
    // Split names and extension
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    });
  });
}

// We will call the function like this:
const htmlPlugins = generateHtmlPlugins("./src");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/img", to: "img" }],
    }),
    new Dotenv(),
  ].concat(htmlPlugins),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
