const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./js/bundle.js",
      path: path.join(__dirname, "wwwroot/")
    },
    mode: "development",
    watch: true
  }
  
  module.exports = config;