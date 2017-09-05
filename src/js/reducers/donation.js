import {} from 'constants';
import cfr from 'musereum-fundraiser-lib';

const initialState = {
  progress: 0,
  wallet: null,
  mnemonic: '',
  tx: null,
  currency: '',
  feeRate: 220,
  btcRate: cfr.bitcoin.ETM_PER_BTC,
  ethRate: 0,
  etcRate: 0,
}

export default function (state = initialState, action) {
  const { type, payload, errors } = action;

  switch (type) {

    case 'SET_DONATION':
      return { ...state, ...payload };

    case 'SET_DONATION_PROGRESS':
      return { ...state, progress: payload };

    case 'SET_DONATION_CURRENCY':
      return { ...state, currency: payload };

    case 'SET_DONATION_BTC_TX':
      return { ...state, tx: payload };

    case 'RESET_DONATION':
      return { ...state, progress: 3, tx: null };

    default:
      return state;
  }
}
