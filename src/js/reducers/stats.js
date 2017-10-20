import {} from 'constants';

const initialState = {
  started: false,
  ended: false,
  overlayMessage: 'Fundraiser hasn\'t started yet or has ended.',
  progress: {
    btcRaised: 0,
    ethRaised: 0,
    etcRaised: 0,

    btcTxCount: 0,
    ethTxCount: 0,
    etcTxCount: 0,

    etmClaimedBtc: 0,
    etmClaimedEth: 0,
    etmClaimedEtc: 0,

    etmContributedBtc: 0,
    etmContributedEth: 0,
    etmContributedEtc: 0,
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

    case 'FETCH_CONTRIBUTIONS_SUCCESS':
      const newState = {
        ...state,
        progress: {
          ...state.progress,
        }
      };
      payload.result.map((v, k) => {
        switch(v.coinType) {
          case 'BTC':
            newState.progress.etmContributedBtc = v.receivedEtm
            newState.progress.btcRaised = v.receivedAmount
            newState.progress.btcTxCount = v.count
            break;
          case 'ETH':
            newState.progress.etmContributedEth = v.receivedEtm
            newState.progress.ethRaised = v.receivedAmount
            newState.progress.ethTxCount = v.count
            break;
          case 'ETC':
            newState.progress.etmContributedEtc = v.receivedEtm
            newState.progress.etcRaised = v.receivedAmount
            newState.progress.etcTxCount = v.count
            break;
        }
      })
      return newState;

    default:
      return state;
  }
}
