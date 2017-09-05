import merge from 'lodash/merge';
import cfr from 'musereum-fundraiser-lib';

// if process.env.NODE_ENV is set, always use `production` flag, but pass the NODE_ENV, too.
const environment = process.env.NODE_ENV ;
const production = environment !== 'development'; // if this is truthy (i.e. set, then we're good)
const envConfig = production ? require('./production.js') : require('./development.js');

const baseConfig = {
  ENDS_AFTER: 14,
  FUNDRAISER_URL: 'https://fundraiser.musereum.org',
  SELF_URL: 'https://musereum.org/',
  TIMEZONE: 'America/Los_Angeles',
  ANNOUNCE_DATETIME: '2017-03-15 07:10:00',
  CAP_START: 6,         // cap enforced X hours after START_DATETIME
  CAP_AMOUNT: 100000000, // cap in ETM ($0.10 USD)
  ETM: {
  },
  COINS: {
    BTC: {
      MIN_CONTRIBUTION: cfr.bitcoin.MINIMUM_AMOUNT / 100000000,
      MAX_CONTRIBUTION: 1000,
      NAME: 'Bitcoin',
      UNIT: 'BTC'
    },
    ETH: {
      MIN_CONTRIBUTION: cfr.ethereum.MIN_CONTRIBUTION,
      MAX_CONTRIBUTION: 20000,
      NAME: 'Ethereum',
      UNIT: 'ETH'
    },
    ETC: {
      MIN_CONTRIBUTION: cfr.ethereumclassic.MIN_CONTRIBUTION,
      MAX_CONTRIBUTION: 20000,
      NAME: 'Ethereum Classic',
      UNIT: 'ETC'
    }
  }
};

const config = merge(baseConfig, envConfig);

export default config;