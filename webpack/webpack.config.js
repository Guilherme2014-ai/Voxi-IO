import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import miniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = {
  entry: resolve(__dirname, "..", "src", "main", "main.tsx"),
  mode: "production",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    fallback: {
      path: "path-browserify",
    },
  },

  plugins: [
    new miniCssExtractPlugin({
      filename: resolve(__dirname, "..", "index.html"),
    }),
    new HtmlWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx|js)$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },

  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "..", "dist"),
  },
};