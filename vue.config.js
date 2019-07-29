module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tools/showcase/043/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: 'css/[name].css',
        chunkFilename: '[name].css'
      }])
    }
  },
  configureWebpack: {
    output: {
      filename: 'js/[name].js',
      chunkFilename: '[name].js'
    }
  }
}
