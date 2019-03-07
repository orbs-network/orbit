import { blink, stopBlink } from './iconManager';
import * as meckano from './meckano';
import { fixRequest } from './requestFixer';
import { cron } from './scheduler';
import { getTodayStatus } from './todayStatus';

chrome.idle.onStateChanged.addListener((newState: string) => {
  if (newState == 'active') {
    console.log('Computer woke up from sleep (rescheduling)');
    initCron();
  }
});

chrome.runtime.onMessage.addListener(request => {
  if (request.messageType === 'login') {
    login(request.email, request.password);
  }

  if (request.messageType === 'reportToMeckano') {
    reportToMeckano(request.isWorkFromHome);
  }

  if (request.messageType === 'checkTodayStatus') {
    stopBlink();
    checkTodayStatus();
  }

  return false;
});

fixRequest();
initCron();
function initCron() {
  cron(7, 20, () => {
    const now = new Date();
    console.log(`Its time: ${now.toString()}, blink!`);
    blink();
  });
}

async function reportToMeckano(isWorkFromHome: boolean) {
  console.log('got request to report to meckano');
  try {
    chrome.runtime.sendMessage({ messageType: 'report_started' });
    const reportSuccess = await meckano.reportEnter(isWorkFromHome);
    if (reportSuccess) {
      chrome.runtime.sendMessage({ messageType: 'report_success' });
    } else {
      chrome.runtime.sendMessage({
        messageType: 'report_failed',
        data: { errorString: 'unable to report' }
      });
    }
  } catch (err) {
    chrome.runtime.sendMessage({
      messageType: 'report_failed',
      data: { errorString: err }
    });
  }
}

async function login(email: string, password: string) {
  console.log('got request to login with', email, password);
  try {
    chrome.runtime.sendMessage({ messageType: 'login_started' });
    const loginSuccess = await meckano.login(email, password);
    if (loginSuccess) {
      chrome.runtime.sendMessage({ messageType: 'login_success' });
    } else {
      chrome.runtime.sendMessage({
        messageType: 'login_failed',
        data: { errorString: 'unable to login' }
      });
    }
  } catch (err) {
    chrome.runtime.sendMessage({
      messageType: 'login_failed',
      data: { errorString: err }
    });
  }
}

async function checkTodayStatus() {
  console.log(`got request to do check today's status`);
  const { loginFailed, todayStatus } = await getTodayStatus();
  if (loginFailed) {
    chrome.runtime.sendMessage({
      messageType: 'login_failed',
      data: { errorString: '' }
    });
  } else {
    chrome.runtime.sendMessage({
      messageType: 'set_today_status',
      data: { todayStatus }
    });
  }
}
