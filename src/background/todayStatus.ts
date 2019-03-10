import * as meckano from './meckano';

export interface IGetTodayStatusResult {
  loginFailed: boolean;
  todayReported?: boolean;
}

export async function getTodayStatus(): Promise<IGetTodayStatusResult> {
  const { resultData, unauthorized } = await meckano.getStatus();

  if (unauthorized) {
    return { loginFailed: true };
  }

  // do we have today's data?
  if (Array.isArray(resultData) && resultData.length > 0) {
    const { checkin, absenceId } = resultData[0];
    return {
      loginFailed: false,
      todayReported: checkin !== null || absenceId !== null
    };
  }

  return {
    loginFailed: true
  };
}
