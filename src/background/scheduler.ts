let lastBlinkTime = new Date(0);

export function cron(fromHour: number, toHour: number, cb: Function) {
  let targetTime;

  const fromTime = new Date();
  fromTime.setHours(fromHour, 0, 0, 0);

  const toTime = new Date();
  toTime.setHours(toHour, 0, 0, 0);

  const now = new Date();

  // are we before the fromHour?
  if (now.getTime() < fromTime.getTime()) {
    targetTime = fromTime;
    console.log(
      `Our target time has not arrived, wait for it. (${targetTime})`
    );
  } else {
    if (now.getTime() < toTime.getTime()) {
      console.log(`We still in the work hours, blink?`);

      // did we already blink today?
      if (
        lastBlinkTime.getFullYear() !== now.getFullYear() ||
        lastBlinkTime.getMonth() !== now.getMonth() ||
        lastBlinkTime.getDate() !== now.getDate()
      ) {
        console.log(`Yes, first time today!`);
        // blink
        lastBlinkTime = now;
        cb();
      } else {
        console.log(`No, we already blinked today`);
      }
    } else {
      console.log(`After hours, don't blink today`);
    }

    targetTime = fromTime;
    targetTime.setDate(targetTime.getDate() + 1);
    console.log(`set timeout for tomorrow (${targetTime})`);
  }

  // ignore weekend
  while (targetTime.getDay() >= 5) {
    targetTime.setDate(targetTime.getDate() + 1);
    console.log(`Jumping to the next day, it's weekend!`);
  }
  console.log(`setting a daily alarm to ${targetTime.toString()}`);

  const name = `daily_alarm_${targetTime.getTime()}`;
  chrome.alarms.clearAll();
  chrome.alarms.create(name, {
    when: targetTime.getTime(),
    periodInMinutes: 60 * 24
  });

  chrome.alarms.onAlarm.addListener(alarm => {
    console.log('alarm!', alarm);
    if (alarm.name === name) {
      lastBlinkTime = new Date();
      cb();
    }
  });

  return () => chrome.alarms.clear(name);
}
