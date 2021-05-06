module.exports = {
  css: {
    loaderOptions: {
      scss: {
        // @代表src目录
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  }
}