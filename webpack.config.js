const Webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const path = require("path");

const join = (...paths) => path.join(__dirname, ...paths);

module.exports = (env, { mode }) => ({
  resolve: {
    extensions: [".js", ".css"],
    modules: ["assets", "node_modules"],
  },
  entry: {
    main: join("assets", "js", "menu.js"),
    languageSelector: join("assets", "js", "languageSelector.js"),
    prism: join("assets", "js", "prism.js"),
    style: join("assets", "css", "style.css"),
    red: join("assets", "css", "color", "red.css"),
    blue: join("assets", "css", "color", "blue.css"),
    green: join("assets", "css", "color", "green.css"),
    pink: join("assets", "css", "color", "pink.css"),
    light_blue: join("assets", "css", "color", "light_blue.css"),
    light_red: join("assets", "css", "color", "light_red.css"),
    light_green: join("assets", "css", "color", "light_green.css"),
    light_pink: join("assets", "css", "color", "light_pink.css"),
    light_orange: join("assets", "css", "color", "light_orange.css"),
  },
  output: {
    filename: "[name].js",
    path: join("static/assets"),
    publicPath: "",
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpg|woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
              import: true,
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "postcss.config.js",
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      minChunks: 2,
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [join("static/assets")],
      cleanAfterEveryBuildPatterns: [
        join("static/assets/style.js"),
        join("static/assets/blue.js"),
        join("static/assets/green.js"),
        join("static/assets/red.js"),
        join("static/assets/pink.js"),
        join("static/assets/light_blue.js"),
        join("static/assets/light_red.js"),
        join("static/assets/light_green.js"),
        join("static/assets/light_pink.js"),
        join("static/assets/light_orange.js"),
      ],
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
});
