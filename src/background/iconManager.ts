let isIconVisible = false;
let blinkingIntervalID = null;
export function blink() {
  if (blinkingIntervalID !== null) {
    return;
  }

  blinkingIntervalID = setInterval(() => {
    isIconVisible = !isIconVisible;
    drawIcon(isIconVisible);
  }, 500);
}

export function stopBlink() {
  if (blinkingIntervalID !== null) {
    clearInterval(blinkingIntervalID);
    drawIcon(true);
  }
  blinkingIntervalID = null;
}

function drawIcon(isIconVisible) {
  if (isIconVisible) {
    chrome.browserAction.setIcon({ path: '/icons/icon16.png' });
  } else {
    var canvas: HTMLCanvasElement = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.fillStyle = '#FFFFFF';
    context.fill();

    var imageData = context.getImageData(0, 0, 19, 19);
    chrome.browserAction.setIcon({
      imageData: imageData
    });
  }
}
