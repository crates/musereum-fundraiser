const initialState = {
  invitedIn: false,
  isCheckInviteLoading: false,
  checkInviteError: '',
  checkInviteErrorCode: 0,
  checkInviteData: {},
};

export default function(state = initialState, action) {

  const { type, payload, error } = action;

  switch (type) {

  case 'CHECK_INVITE':
    return {
      ...state,
      isCheckInviteLoading: true,
    };

  case 'CHECK_INVITE_SUCCESS':
    return {
      ...initialState,
      invitedIn: true,
    };

  case 'CHECK_INVITE_ERROR':
    return {
      ...initialState,
      checkInviteError: error,
      checkInviteErrorCode: payload.code,
      checkInviteData: payload.data,
    };

  default:
    return state;
  }
}
