import {} from 'constants';

const initialState = {
  started: false,
  ended: false,
  overlayMessage: 'Fundraiser hasn\'t started yet or has ended.',
  progress: {
    btcRaised: 0,
    btcTxCount: 0,
    ethRaised: 0,
    ethTxCount: 0,
    etcRaised: 0,
    etcTxCount: 0,
    etmClaimedBtc: 0,
    etmClaimedEth: 0,
    etmClaimedEtc: 0,
  }
};

export default function (state = initialState, action) {
  const { type, payload, errors } = action;

  switch (type) {

    case 'SET_STATS':
      return { ...state, ...payload };

    case 'SET_STATS_PROGRESS':
      return {
        ...state,
        progress: {
          ...state.progress,
          ...payload
        }
      };

    default:
      return state;
  }
}
