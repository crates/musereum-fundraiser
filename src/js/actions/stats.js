import config from 'config';
import { bitcoin, ethereum, ethereumclassic } from 'musereum-fundraiser-lib';
import { addNotification as notify } from 'reapop';

//
export function fetchStats() {
  return (dispatch) => {
    bitcoin.fetchFundraiserStats((err, stats) => {
      if (err) {
        console.error(err.stack);
        dispatch(notify({
          title: 'Error Fetching Contribution Stats',
          message: 'Could not fetch BTC сontribution stats.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        }));
        return;
      }
      const { amountDonated, amountClaimed, txCount } = stats;

      console.log('ETMS CLAIMED BTC', amountClaimed);

      return dispatch({
        type: 'SET_STATS_PROGRESS',
        payload: {
          btcRaised: amountDonated,
          etmClaimedBtc: amountClaimed,
          btcTxCount: txCount,
        }
      });
    })

    ethereum.fetchTotals(ethereum.FUNDRAISER_CONTRACT, (err, totals) => {
      if (err) {
        console.error(err.stack);
        dispatch(notify({
          title: 'Error Fetching Contribution Stats',
          message: 'Could not fetch ETH contribution stats.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        }));
        return;
      }
      const { ether, etm } = totals;

      console.log('ETMS CLAIMED ETH', etm)
      console.log(totals)

      return dispatch({
        type: 'SET_STATS_PROGRESS',
        payload: {
          ethRaised: ether,
          etmClaimedEth: etm,
        }
      });
    })

    ethereum.fetchNumDonations(ethereum.FUNDRAISER_CONTRACT, (err, txCount) => {
      if (err) {
        console.error(err.stack);
        dispatch(notify({
          title: 'Error Fetching Total Number of Contributions',
          message: 'Could not fetch ETH total num contributions.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        }));
        return;
      }
      console.log('ETH TXCOUNT', txCount);
      return dispatch({
        type: 'SET_STATS_PROGRESS',
        payload: {
          ethTxCount: txCount,
        }
      });
    })

    ethereumclassic.fetchTotals(ethereumclassic.FUNDRAISER_CONTRACT, (err, totals) => {
      if (err) {
        console.error(err.stack);
        dispatch(notify({
          title: 'Error Fetching Contribution Stats',
          message: 'Could not fetch ETC contribution stats.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        }));
        return;
      }
      const { etherclassic, etm } = totals;

      console.log('ETMS CLAIMED ETC', etm)
      console.log(totals)

      return dispatch({
        type: 'SET_STATS_PROGRESS',
        payload: {
          etcRaised: etherclassic,
          etmClaimedEtc: etm,
        }
      });
    })

    ethereumclassic.fetchNumDonations(ethereumclassic.FUNDRAISER_CONTRACT, (err, txCount) => {
      if (err) {
        console.error(err.stack);
        dispatch(notify({
          title: 'Error Fetching Total Number of Contributions',
          message: 'Could not fetch ETC total num contributions.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        }));
        return;
      }
      console.log('ETC TXCOUNT', txCount);
      return dispatch({
        type: 'SET_STATS_PROGRESS',
        payload: {
          etcTxCount: txCount,
        }
      });
    })
  }
}

export function startFetchInterval() {
  return (dispatch) => {
    setInterval(() => dispatch(fetchStats()), 60e3); // update once per minute
    return dispatch(fetchStats());
  };
}


//
export function checkStatus() {
  return (dispatch) => {
    ethereum.fetchIsActive('', (err, res) => {
      if (err) {
        console.error(err.stack);
        dispatch(notify({
          title: 'Error Fetching Fundraiser Status',
          message: 'The fundraiser may have ended, check with the Musereum Foundation for more information before contribution.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        }));
        return;
      }

      const isActive = res === 1;
      const startTime = new Date(config.START_DATETIME).getTime();
      const endTime = startTime + config.ENDS_AFTER * 24 * 60 * 60 * 1000;
      // can start up to 1 hour late
      const pastStart = Date.now() > (startTime + 60 * 60 * 1000);
      const pastEnd = Date.now() > (startTime + endTime);

      return dispatch({
        type: 'SET_STATS',
        payload: {
          started: isActive || pastStart,
          ended: (!isActive && pastStart) || pastEnd,
        }
      });
    })
    /*
    ethereumclassic.fetchIsActive('', (err, res) => {
      if (err) {
        console.error(err.stack);
        dispatch(notify({
          title: 'Error Fetching Fundraiser Status',
          message: 'The fundraiser may have ended, check with the Musereum Foundation for more information before contribution.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        }));
        return;
      }

      const isActive = res === 1;
      const startTime = new Date(config.START_DATETIME).getTime();
      const endTime = startTime + config.ENDS_AFTER * 24 * 60 * 60 * 1000;
      // can start up to 1 hour late
      const pastStart = Date.now() > (startTime + 60 * 60 * 1000);
      const pastEnd = Date.now() > (startTime + endTime);

      return dispatch({
        type: 'SET_STATS',
        payload: {
          started: isActive || pastStart,
          ended: (!isActive && pastStart) || pastEnd,
        }
      });
    })
    */
  };
}

export function startStatusInterval() {
  return (dispatch) => {
    setInterval(() => dispatch(checkStatus()), 10e3); // poll every 10s
    return dispatch(checkStatus());
  };
}
