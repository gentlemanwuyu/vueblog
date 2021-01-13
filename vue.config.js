const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    https: false,
    port: 10086,
    open: true,
    proxy: {
      '/api': {
        timeout: 1920000,
        maxConnections: 1000,
        target: 'http://www.blogapi.com',
        changeOrigin: true,
        pathRewrite: {'^/api': '/api'},
        secure: false,
        cookieDomainRewrite: {
          '.eminxing.com': 'localhost'
        },
        headers: {
          Connection: 'keep-alive',
          'keep-alive': 15
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/style/variable.scss";`
      },
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title= '吴宇博客'
      return args
    })
    // 开启gzip压缩
    config.plugin('compressionPlugin').use(new CompressionPlugin({
      test: /\.(js|css|ico|svg)$/i,
      threshold: 10240,
      deleteOriginalAssets: false
    }));
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'development') {
      // 保持类名不被压缩
      config.optimization.minimizer[0].options.terserOptions.keep_fnames = true;
    }
    // config.externals = {
    //   vue: 'Vue',
    //   'vuetify': 'Vuetify',
    //   'vue-router': 'VueRouter',
    //   axios: 'axios',
    // };
  },
}