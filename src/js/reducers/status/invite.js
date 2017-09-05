const initialState = {
  invitedIn: false,
  isCheckInviteLoading: false,
  checkInviteError: '',
};

export default function(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

  case 'CHECK_INVITE':
    return {
      ...state,
      isCheckInviteLoading: true
    };

  case 'CHECK_INVITE_SUCCESS':
    return {
      ...initialState,
      invitedIn: true
    };

  case 'CHECK_INVITE_ERROR':
    return {
      ...initialState,
      checkInviteError: payload
    };

  default:
    return state;
  }
}
