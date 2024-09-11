import { EnvironmentPlugin } from 'webpack';

require('dotenv').config();

module.exports = {
  output: {
    crossOriginLoading: 'anonymous',
  },
  plugins: [new EnvironmentPlugin(['CURRENT_YEAR'])],
};
