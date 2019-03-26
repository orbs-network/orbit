chrome.runtime.onMessage.addListener(request => {
  if (request.messageType === 'msg1') {
  }

  if (request.messageType === 'msg2') {
  }

  if (request.messageType === 'msg3') {
  }

  return false;
});
