var backgroundSpeedY = 0.2;

function shiftBackgroundPositionY()
{
	var backgroundDiv = document.getElementById("background");
	backgroundDiv.style.backgroundPosition = "0px " + (-1 * backgroundSpeedY * verticalPosition) + "px";
}