function updateRequest(headers, name: string, value: string) {
  let found = false;
  for (var n in headers) {
    found = headers[n].name.toLowerCase() === name.toLowerCase();
    if (found) {
      headers[n].value = value;
      return;
    }
  }
  if (!found) {
    headers.push({ name, value });
  }
}

export function fixRequest() {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    details => {
      updateRequest(
        details.requestHeaders,
        'Referrer',
        'https://app.meckano.co.il/login.php'
      );
      updateRequest(
        details.requestHeaders,
        'Origin',
        'https://app.meckano.co.il'
      );
      return { requestHeaders: details.requestHeaders };
    },
    { urls: ['https://app.meckano.co.il/api/*'] },
    ['requestHeaders', 'blocking', 'extraHeaders']
  );
}
