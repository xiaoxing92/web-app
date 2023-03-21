const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  publicPath: "/",
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240,
        deleteOriginalAssets: false,
        minRatio: 0.8,
      }),
    ],
    resolve: {
      alias: {
        "@": resolve("./src"),
        components: resolve("./src/components"),
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial",
        },
        vant: {
          name: "chunk-vant",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?vant(.*)/,
        },
        commons: {
          name: "chunk-commons",
          test: resolve("src/components"),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    });
    config.plugins.delete("prefetch");
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://itunes.apple.com/hk/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  pwa: {
    name: "web-app",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "/src/service-worker.js",
      // importWorkboxFrom: "disabled",
      // importScripts:
      //   "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js",
    },
  },
});
