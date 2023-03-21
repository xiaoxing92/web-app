module.exports = {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
      },
      'postcss-px-to-viewport': {
        viewportWidth: 375,
        unitPrecision: 3, 
        viewportUnit: 'vw',
        selectorBlackList: [], 
        minPixelValue: 1, 
        mediaQuery: false 
      }
    }
  }
