const initialState = false;

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case 'FETCH_INITIAL_DATA':
      console.log('FETCH_INITIAL_DATA');
      return false;

    case 'FETCH_INITIAL_DATA_SUCCESS':
      console.log('FETCH_INITIAL_DATA_SUCCESS');
      return true;

    case 'FETCH_INITIAL_DATA_ERROR':
      return false;

    default:
      return state;
  }
}
