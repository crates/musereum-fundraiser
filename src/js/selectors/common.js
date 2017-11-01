import isEqual from 'lodash/isEqual';
import selectn from 'selectn';
import { createSelectorCreator, defaultMemoize } from 'reselect';

// Create a "selector creator" that uses lodash.isEqual instead of '==='
// More info you can find in: https://github.com/faassen/reselect#api
export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

export const routerSelector = state => state.router;

export const appIsReady = state => state.status.ready;

export const statusSelector = type => state => state.status[type];

// Router selectors
export const nextPathnameSelector = createDeepEqualSelector(
  [routerSelector],
  router => selectn('location.state.nextPathname', router) || '/'
);

export const donation = state => state.donation
export const notifications = state => state.notifications

export const fundraiserActive = state => state.stats.started && !state.stats.ended
export const started = state => state.stats.started
export const ended = state => state.stats.ended
export const overlayMessage = state => state.stats.overlayMessage

export const progress = state => state.stats.progress
export const txCount = createDeepEqualSelector(
  [progress],
  (progress) => (progress.btcTxCount + progress.ethTxCount + progress.etcTxCount)
);
export const etmClaimed = createDeepEqualSelector(
  [progress],
  (progress) => (progress.etmClaimedBtc + progress.etmClaimedEth + progress.etmClaimedEtc)
);
export const etmContributed = createDeepEqualSelector(
  [progress, donation],
  (progress, donation) => (progress.etmContributedBtc + progress.etmContributedEth + progress.etmContributedEtc)
);
export const btcContributed = createDeepEqualSelector(
  [progress, donation],
  (progress, donation) => {
    let sumBtc = progress.btcRaised;
    if (donation.ethWeiPerBtc)
      sumBtc += (progress.ethRaised * 1e18) / donation.ethWeiPerBtc;
    if (donation.etcWeiPerBtc)
      sumBtc += (progress.etcRaised * 1e18) / donation.etcWeiPerBtc;
    return sumBtc;
  }
);

export const invitedAppSelector = createDeepEqualSelector(
  [statusSelector('invite')],
  (invite) => ({
    ...invite,
  })
);

export const dashboardSelector = createDeepEqualSelector(
  [progress, txCount, /*etmClaimed,*/ etmContributed, btcContributed, started, fundraiserActive, overlayMessage, donation],
  (progress, txCount, /*etmClaimed,*/ etmContributed, btcContributed, started, fundraiserActive, overlayMessage, donation) => ({
    progress,
    txCount,
    //etmClaimed,
    etmContributed,
    btcContributed,

    started,
    fundraiserActive,
    overlayMessage,

    donation,
  })
);

export const donateSelector = createDeepEqualSelector(
  [fundraiserActive, donation, progress, overlayMessage],
  (fundraiserActive, donation, progress, overlayMessage) => ({
    fundraiserActive,
    donation,
    progress,
    overlayMessage,
  })
);

export const needInviteSelector = createDeepEqualSelector(
  [statusSelector('invite')],
  (invite) => ({
    ...invite,
  })
);

