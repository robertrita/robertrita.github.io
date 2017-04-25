var bodyObject = document.getElementsByTagName("BODY")[0];
var ornamentContainerDiv = document.getElementById("ornament-container");

hideOrnamentContainer(); //hide ornament container while loading so there won't be any flicker, need to be before disablePageScroll(), otherwise this function won't be called
disablePageScroll(); //to stop page scroll until everything is loaded

function hideOrnamentContainer()
{
	ornamentContainerDiv.className = "display-none";
}

function disablePageScroll()
{
	bodyObject.className = "stop-scroll";
	window.ontouchmove = preventDefault; // mobile
}