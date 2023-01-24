const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// We need Nodes fs module to read directory contents
const fs = require("fs");
const node_env = process.env.NODE_ENV;

const generateHtmlPlugins = (templateDir) => () => {
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
      ...getAweberConfigs(node_env),
    });
  });
};

// We will call the function like this:
const htmlPlugins = generateHtmlPlugins("../src");

module.exports = () => ({
  entry: "./src/index.js",
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/img", to: "img" },
        // dummy directory for CI
        { from: "./src/scss", to: "assets" },
      ],
    }),
  ].concat(htmlPlugins()),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "dist"),
  },
});

function getAweberConfigs(mode) {
  return Object.entries(aweberConfigs).reduce(
    (configs, [key, object]) => ({
      ...configs,
      [key]: object[mode],
    }),
    {}
  );
}

const aweberConfigs = {
  aweber_form_id: {
    production: "919304948",
    development: "1076426184",
  },
  aweber_list_id: {
    production: "6222882",
    development: "6152856",
  },
  aweber_form_name: {
    production: "Kits_Feed_Form_-_Prod",
    development: "Kits_Feed_Form_-_Staging",
  },
  aweber_redirect_url: {
    production: "https://feed.boomtap.io/almost-done.html",
    development: "https://feed.backstage.boomtap.io/almost-done.html",
  },
};
