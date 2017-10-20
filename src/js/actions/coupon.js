import { CALL_API } from 'middlewares/api';
import cfr from 'musereum-fundraiser-lib';
import { addNotification as notify } from 'reapop';

import { fetchEthDonationETMRate, fetchEtcDonationETMRate } from 'actions';

export function callCouponRate(code, { coin, address }) {
  return {
    [CALL_API]: {
      types: [
        'CALL_COUPON_RATE',
        'CALL_COUPON_RATE_SUCCESS',
        'CALL_COUPON_RATE_ERROR',
      ],
      endpoint: '/coupons',
      data: {
        code,
        coin,
        address
      }
    },
    meta: { code },
  };
}

export function fetchCouponRate(code, data) {
  return (dispatch) => {
    return dispatch(callCouponRate(code, data)).then((res) => {
      const { success, message, result } = res.payload;
      if (!success) {
        console.log(message);
        dispatch(notify({
          title: 'Ethereum Error',
          message: 'Could not fetch coupon rate',
          status: 'error',
          dismissible: true,
          dismissAfter: 5000
        }));
        return;
      }

      console.log('got btc coupon rate:', result);

      if (result != cfr.bitcoin.ETM_PER_BTC) {
        dispatch(notify({
          title: 'Coupon accepted',
          message: `You have succesfully use coupon. The rate was changed.`,
          status: 'success',
          dismissible: true,
          dismissAfter: 10000
        }));
      } else {
        dispatch(notify({
          title: "Coupon doesn't exist",
          message: `This had no effect on the rate`,
          status: 'info',
          dismissible: true,
          dismissAfter: 10000
        }));
      }

      dispatch({
        type: 'SET_DONATION',
        payload: {
          btcRate: result,
        }
      });

      dispatch(fetchEthDonationETMRate());
      dispatch(fetchEtcDonationETMRate());
    });
  }
}