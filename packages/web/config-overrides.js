const { override, addLessLoader, addPostcssPlugins } = require('customize-cra');

module.exports = override(
  addLessLoader({
    strictMath: false,
    noIeCompat: true,
    localIdentName: '[local]--[hash:base64:5]', // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    javascriptEnabled: true,
  }),
  addPostcssPlugins([]),
);
