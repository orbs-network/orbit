
let isOn = false;
let blinkingIntervalID = null;
export function blink() {
	if (blinkingIntervalID !== null) {
		return;
	}

	blinkingIntervalID = setInterval(() => {
		isOn = !isOn;
		if (isOn) {
			drawIcon("#FF5555");
		} else {
			drawIcon("#FFFFFF");
		}
	}, 250)
}

export function stopBlink() {
	if (blinkingIntervalID !== null) {
		clearInterval(blinkingIntervalID);
		drawIcon("#FF5555");
	}
	blinkingIntervalID = null;
}

function drawIcon(color) {
	var canvas: HTMLCanvasElement = document.createElement('canvas')
	var context = canvas.getContext('2d');

	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(0, 19);
	context.lineTo(19, 19);
	context.lineTo(19, 0);
	context.lineTo(0, 0);
	context.closePath();
	context.lineWidth = 1;
	context.fillStyle = color;
	context.fill();
	context.strokeStyle = "#aaaaaa";
	context.stroke();

	context.fillStyle = "black";

	var imageData = context.getImageData(0, 0, 19, 19);
	chrome.browserAction.setIcon({
		imageData: imageData
	});
}
