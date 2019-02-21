import * as meckano from './meckano';
import { fixRequest } from './requestFixer';
import { getIsLoggedIn } from './loginStatus';
import { cron } from './scheduler';
import { blink, stopBlink } from './iconManager';

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
    reportToMeckano();
  }
  if (request.messageType === 'checkLoginStatus') {
    checkLoginStatus();
  }

  return false;
});

fixRequest();
initCron();

function initCron() {
  cron(7, 0, () => {
    const now = new Date();
    console.log(`Its time: ${now.toString()}, blink!`);
    blink();
  });
}

async function reportToMeckano() {
  console.log('got request to report to meckano');
  try {
    chrome.runtime.sendMessage({ messageType: 'report_started' });
    const reportSuccess = await meckano.reportEnter();
    if (reportSuccess) {
      chrome.runtime.sendMessage({ messageType: 'report_success' });
      stopBlink();
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

async function checkLoginStatus() {
  console.log('got request to do check login status');
  try {
    const isLoggedIn = await getIsLoggedIn();
    if (isLoggedIn === false) {
      chrome.runtime.sendMessage({
        messageType: 'login_failed',
        data: { errorString: '' }
      });
    }
  } catch (err) {
    chrome.runtime.sendMessage({
      messageType: 'login_failed',
      data: { errorString: err }
    });
  }
}
