const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// We need Nodes fs module to read directory contents
const fs = require("fs");

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
      favicon: "./src/favicon.ico",
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      aweber_formId:
        process.env.NODE_ENV === "production" ? "919304948" : "1076426184",
      aweber_listId:
        process.env.NODE_ENV === "production" ? "6222882" : "6152856",
      aweber_formName:
        process.env.NODE_ENV === "production"
          ? "Kits_Feed_Form_-_Prod"
          : "Kits_Feed_Form_-_Staging",
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
      // dummy directory for CI
      patterns: [{ from: "./src/scss", to: "assets" }],
    }),
  ].concat(htmlPlugins),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
