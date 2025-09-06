// webpack.config.js
const path = require('path');

module.exports = (config, options) => {
  // @ alias
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
  };

  // .d.ts ve .js.map dosyalarını ignore et
  config.module.rules.push({
    test: /\.(d\.ts|js\.map)$/,
    loader: 'ignore-loader',
  });

  return config;
};
