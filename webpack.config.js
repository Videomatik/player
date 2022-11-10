const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'player.min.js' : 'player.js',
    library: {
      name: 'VideomatikPlayer',
      type: 'umd',
    },
  },
};
