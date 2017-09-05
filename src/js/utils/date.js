import config from 'config';
import moment from 'moment';

function capped() {
  let utcStart = moment.utc(config.START_DATETIME);
  let localStart = moment(utcStart).local();
  let endHiddenCap = (localStart).add(config.CAP_START, 'hours').unix();
  let now = moment().unix();
  return endHiddenCap < now;
}

function endHiddenDatetime(started) {
  const utcStart = moment.utc(config.START_DATETIME);
  const localStart = moment(utcStart).local();
  if (started) {
    return localStart.add(config.CAP_START, 'hours')._d;
  } else {
    return localStart;
  }
}

function endDatetime(started) {
  const utcStart = moment.utc(config.START_DATETIME);
  const localStart = moment(utcStart).local();
  if (started) {
    return localStart.add(config.ENDS_AFTER, 'days')._d;
  } else {
    return localStart;
  }
}

export default {
  capped,
  endHiddenDatetime,
  endDatetime,
}