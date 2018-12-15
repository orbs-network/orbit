const A_DAY_IN_MS = 24 * 60 * 60 * 1000;

export function repeatCallAtTime(hour: number, minute: number, cb: Function) {
    const targetTime = new Date();
    console.log(`current time is ${targetTime.getHours()}:${targetTime.getMinutes()}:${targetTime.getSeconds()}`);
    targetTime.setHours(hour, minute, 0, 0);
    console.log(`target time is ${targetTime.getHours()}:${targetTime.getMinutes()}:${targetTime.getSeconds()}`);
    let msTillTargetTime = targetTime.getTime() - Date.now();
    console.log(`${msTillTargetTime}ms. till target time`);
    const inThePast = msTillTargetTime < 100; // grace (to prevent double interval)
    if (inThePast) {
        console.log('next interval is in the past, setting for next day')
        msTillTargetTime = msTillTargetTime + A_DAY_IN_MS;
    } else {
        console.log('next interval is in the future, waiting for it')
    }
    setTimeout(() => {
        cb();
        repeatCallAtTime(hour, minute, cb);
    }, msTillTargetTime);
}