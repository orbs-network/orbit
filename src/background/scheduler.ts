export function cron(hour: number, minute: number, cb: Function) {
  // tomorrow at request time
  const targetTime = new Date();
  targetTime.setHours(hour, minute, 0, 0);
  targetTime.setDate(targetTime.getDate() + 1);

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
      cb();
    }
  });

  return () => chrome.alarms.clear(name);
}
