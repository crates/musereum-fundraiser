import cfr from 'musereum-fundraiser-lib';
const { bitcoin, ethereum, ethereumclassic } = cfr;
import { addNotification as notify } from 'reapop';

import { donation } from 'selectors';

//
export function setDonationMnemonicAndWallet(mnemonic) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        const wallet = cfr.deriveWallet(mnemonic);

        resolve({
          type: 'SET_DONATION',
          payload: {
            mnemonic,
            wallet,
          }
        });
      } catch (err) {
        throw err;
        reject(err);
      }
    }).then(dispatch);
  }
}

export function generateDonationWallet() {
  return (dispatch) => {
    const mnemonic = cfr.generateMnemonic();
    return setDonationMnemonicAndWallet(mnemonic)(dispatch);
  }
}

//
export function fetchBtcDonationFeeRate() {
  return (dispatch) => {
    return bitcoin.fetchFeeRate((err, feeRate) => {
      if (err) {
        console.log(err);
        dispatch(notify({
          title: 'Bitcoin Error',
          message: 'Could not fetch recommended transaction fee rate from 21.co.',
          status: 'error',
          dismissible: true,
          dismissAfter: 5000
        }));
        return;
      }

      console.log('got fee rate:', feeRate);
      return dispatch({
        type: 'SET_DONATION',
        payload: {
          feeRate,
        }
      });
    });
  }
}

//
export function fetchBtcDonationETMRate() {
  return (dispatch) => {
    /*
    return ethereum.fetchBTCRate(ethereum.FUNDRAISER_CONTRACT, (err, weiPerBTC) => {
      if (err) {
        console.error(err);
        dispatch(notify({
          title: 'Ethereum Error',
          message: 'Could not fetch ETM/ETH exchange rate.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        }));
        return;
      }

      return dispatch({
        type: 'SET_DONATION',
        payload: {
          btcRate,
        }
      });
    })
    */
  }
}

//
export function fetchEthDonationETMRate() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      ethereum.fetchBTCRate(ethereum.FUNDRAISER_CONTRACT, (err, weiPerBTC) => {
        if (err) {
          console.log(err);
          reject(notify({
            title: 'Ethereum Error',
            message: 'Could not fetch ETM/ETH exchange rate.',
            status: 'error',
            dismissible: true,
            dismissAfter: 10000
          }));
          return;
        }

        const etmPerBTC = 5000;
        const btcPerEth = weiPerBTC/1e18;
        const ethRate = etmPerBTC*btcPerEth;

        //const ethRate = Math.pow(10, 18) / weiPerETM;
        resolve({
          type: 'SET_DONATION',
          payload: {
            ethRate,
          }
        });
      })
    }).then(dispatch);
  }
}

//
export function fetchEtcDonationETMRate() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      ethereumclassic.fetchBTCRate(ethereumclassic.FUNDRAISER_CONTRACT, (err, weiPerBTC) => {
        if (err) {
          console.log(err);
          reject(notify({
            title: 'Ethereum Classic Error',
            message: 'Could not fetch ETM/ETC exchange rate.',
            status: 'error',
            dismissible: true,
            dismissAfter: 10000
          }));
        }

        const etmPerBTC = 5000;
        const btcPerEtc = weiPerBTC/1e18;
        const etcRate = etmPerBTC*btcPerEtc;

        resolve({
          type: 'SET_DONATION',
          payload: {
            etcRate,
          }
        });
      });
    }).then(dispatch);
  }
}

//
export function finalizeBtcDonation(cb) {
  return (dispatch, getState) => {
    const { wallet, tx, feeRate } = donation(getState());
    console.log('tx', tx);
    const finalTx = bitcoin.createFinalTx(tx.utxos, feeRate);
    const signedTx = bitcoin.signFinalTx(wallet, finalTx.tx);

    return bitcoin.pushTx(signedTx.toHex(), (err) => {
      if (err) {
        console.log(err);
        dispatch(notify({
          title: 'Bitcoin Error',
          message: 'Could not broadcast contribution transaction.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        }));
        return cb(err);
      }

      const txid = signedTx.getId();
      console.log('sent final tx. txid=' + txid);
      dispatch(resetDonation());
      dispatch(notify({
        title: 'Donation Successful',
        message: `You have succesfully contributed ${finalTx.paidAmount / 1e8} BTC and will receive ${finalTx.etmAmount} ETM.`,
        status: 'success',
        dismissible: true,
        dismissAfter: 10000
      }));

      return cb();
    })
  }
}

/* Simple actions */

export function setDonationProgress(data) {
  return { type: 'SET_DONATION_PROGRESS', payload: data }
}
export function setDonationCurrency(data) {
  return { type: 'SET_DONATION_CURRENCY', payload: data }
}
export function setBtcDonationTx(data) {
  return { type: 'SET_DONATION_BTC_TX', payload: data }
}
export function resetDonation(data) {
  return { type: 'RESET_DONATION' }
}
