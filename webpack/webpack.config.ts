import { resolve } from "path";
import miniCssExtractPlugin from "mini-css-extract-plugin";
import htmlWebpackPlugin from "html-webpack-plugin";

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
    new miniCssExtractPlugin(),
    new htmlWebpackPlugin({
      template: resolve(__dirname, "..", "index.html"),
    }),
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
        exclude: /node_modules/,
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
