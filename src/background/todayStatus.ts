import * as meckano from './meckano';
import { ITodayStatus } from './ITodayStatus';

export interface IGetTodayStatusResult {
  loginFailed: boolean;
  todayStatus?: ITodayStatus;
}

export async function getTodayStatus(): Promise<IGetTodayStatusResult> {
  const { resultData, unauthorized } = await meckano.getStatus();

  if (unauthorized) {
    return { loginFailed: true };
  }

  // find today's data
  const now = new Date();
  const today = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
  const resultForToday = resultData.find(d => d.dateStr === today);

  return {
    loginFailed: false,
    todayStatus: {
      date: today,
      reported: resultForToday !== undefined
    }
  };
}
