import { CALL_API } from 'middlewares/api';

export function checkInvite(invite) {
  return {
    [CALL_API]: {
      types: [
        'CHECK_INVITE',
        'CHECK_INVITE_SUCCESS',
        'CHECK_INVITE_ERROR',
      ],
      endpoint: `/lead/${invite}`,
    },
    meta: { invite },
  };
}