const A_DAY_IN_MS = 24 * 60 * 60 * 1000;

function msToTime(duration: number) {
  var milliseconds = Math.floor((duration % 1000) / 100);
  var seconds = Math.floor((duration / 1000) % 60);
  var minutes = Math.floor((duration / (1000 * 60)) % 60);
  var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  var hoursStr = hours < 10 ? '0' + hours : hours;
  var minutesStr = minutes < 10 ? '0' + minutes : minutes;
  var secondsStr = seconds < 10 ? '0' + seconds : seconds;

  return (
    hoursStr +
    ':' +
    minutesStr +
    ':' +
    secondsStr +
    '.' +
    milliseconds.toString()
  );
}

export function cron(hour: number, minute: number, cb: Function) {
  // tomorrow at request time
  const targetTime = new Date();
  targetTime.setHours(hour, minute, 0, 0);
  targetTime.setDate(targetTime.getDate() + 1);
  const name = `daily_alarm_${targetTime.getTime()}`;

  console.log(`setting a daily alarm to ${targetTime.toString()}`);

  chrome.alarms.create(name, {
    when: targetTime.getTime(),
    periodInMinutes: 60 * 24
  });

  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === name) {
      cb();
    }
  });

  return () => chrome.alarms.clear(name);
}

export function repeatCallAtTime(hour: number, minute: number, cb: Function) {
  const targetTime = new Date();
  console.log(
    `current time is ${targetTime.getHours()}:${targetTime.getMinutes()}:${targetTime.getSeconds()}`
  );
  targetTime.setHours(hour, minute, 0, 0);
  console.log(
    `target time is ${targetTime.getHours()}:${targetTime.getMinutes()}:${targetTime.getSeconds()}`
  );
  let msTillTargetTime = targetTime.getTime() - Date.now();

  const inThePast = msTillTargetTime < 100; // grace (to prevent double interval)
  if (inThePast) {
    console.log('next interval is in the past, setting for next day');
    msTillTargetTime = msTillTargetTime + A_DAY_IN_MS;
  } else {
    console.log('next interval is in the future, waiting for it');
  }
  console.log(msToTime(msTillTargetTime) + ` till target time`);
  setTimeout(() => {
    cb();
    repeatCallAtTime(hour, minute, cb);
  }, msTillTargetTime);
}
