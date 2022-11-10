const webpack = require("webpack");
const path = require("path");
const ESlintPlugin = require("eslint-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
const envPath = `./.env.${isDevelopment ? "development" : "production"}`;

const config = {
  name: "React18-webpack-babel-setting",
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "inline-source-map" : "hidden-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  // alias: {
  //   "@hooks": path.resolve(__dirname, "hooks"),
  //   "@componenets": path.resolve(__dirname, "components"),
  //   "@pages": path.resolve(__dirname, "pages"),
  //   "@layouts": path.resolve(__dirname, "layouts"),
  // },
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 chrome versions"] },
                debug: isDevelopment,
              },
            ],
            "@babel/preset-react",
          ],
          // env: { // emotions 을 쓸 경우
          //   development: {
          //     plugins: [["@emotion/babel-plugin", { sourceMap: true }], require.resolve("react-refresh/babel")],
          //   },
          //   production: {
          //     plugins: ["@emotion/babel-plugin"],
          //   },
          // },
        },
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? "development" : "production" }),
    new CleanWebpackPlugin(),
    new Dotenv({ path: envPath }),
    new ESlintPlugin(),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist/",
  },
  devServer: {
    historyApiFallback: true,
    port: 3090, //3090 포트로 열기
    devMiddleware: { publicPath: "/dist/" },
    static: { directory: path.resolve(__dirname) },
    // proxy: {
    //   "/api/": {
    //     target: "http://localhost:3095",
    //     changeOrigin: true,
    //   },
    // },
  },
};
if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
}
if (!isDevelopment && config.plugins) {
}

module.exports = config;
