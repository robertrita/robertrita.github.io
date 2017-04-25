var mouseScrollDiv = document.getElementById("mouse-scroll");
var projectsDiv = document.getElementById("projects");
var projectsBottomDiv = document.getElementById("projects-bottom");
var ornamentTitleScreenDiv = document.getElementById("ornament-title-screen");
var ornamentContactScreenDiv = document.getElementById("ornament-contact-screen");
var iconsContainerDiv = document.getElementById("icons-container");
var distance = 1000; //vertical distance, to show ornament center earlier so it will hide flicker effect

var imgArray;
var loadedImage = 0;
var loadedImagePercentage;
var loadedImagePercentageTextDiv = document.getElementById("loaded-image-percentage-text");
var loadedImagePercentageBoxDiv = document.getElementById("loaded-image-percentage-box");
var loadedImagePercentageBarDiv = document.getElementById("loaded-image-percentage-bar");
var animationLength = 1000; //match miliseconds with the animation length from reveal class in css file

var canRunFunctionSet1 = true;
var canRunFunctionSet2 = true;
var canRunFunctionSet3 = true;
var canRunFunctionSet4 = true;

var marginHeight = 30; //projectsDiv margin top and bottom on sub page mode

var canAnimateOrnaments;

addLoadFunctionToImg(); //put onload function on every img tag
enableAnimateOrnaments();

window.onload = function(e)
{
	setLoadedImagePercentageTo100();
	animateOrnamentContainer();
	hideOrnamentContactScreen();
	setProjectsBottomDivPosition();
	addMouseScrollEvent();
	hideMouseScrollButton();
	setTimeout(function(){showMouseScrollButton(); enablePageScroll();}, animationLength);

	setAsSubPage(); //if url contains 'subpage=true', this web page will become a sub page, to hold special/independent project, which has different layout from homepage
}

window.onresize = function(e)
{
	setProjectsBottomDivPosition();
	shiftIconsContainer();

	if (isSubPage())
	{
		reduceProjectsDivMarginTopAndBottom();
	}
}

function addMouseScrollEvent()
{
	// IE9, Chrome, Safari, Opera
	document.addEventListener("mousewheel", mouseWheelHandler, false);
	// Firefox
	document.addEventListener("DOMMouseScroll", mouseWheelHandler, false);
}

function mouseWheelHandler(e)
{
	rotateClockArrow();
	rotateSharpenerHandle();
	printPaper();

	if (returnContainerContentVerticalPosition() > ornamentContainerDiv.offsetTop - distance)
	{
		if (canRunFunctionSet1 == true)
		{
			canRunFunctionSet1 = false;
			canRunFunctionSet2 = true;
			canRunFunctionSet3 = true;
			canRunFunctionSet4 = true;

			//FUNCTION SET 1
			showOrnamentTitleScreen();
			hideOrnamentContactScreen();
		}
	}
	else if (returnContainerContentVerticalPosition() + projectsDiv.offsetHeight < ornamentContainerDiv.offsetTop + ornamentContainerDiv.offsetHeight + distance)
	{
		if (returnContainerContentVerticalPosition() + projectsDiv.offsetHeight <= ornamentContainerDiv.offsetTop + ornamentContainerDiv.offsetHeight)
		{
			shiftIconsContainer();

			if (canRunFunctionSet2 == true)
			{
				canRunFunctionSet1 = true;
				canRunFunctionSet2 = false;
				canRunFunctionSet3 = true;
				canRunFunctionSet4 = true;

				//FUNCTION SET 2
			}
		}
		else
		{
			if (canRunFunctionSet3 == true)
			{
				canRunFunctionSet1 = true;
				canRunFunctionSet2 = true;
				canRunFunctionSet3 = false;
				canRunFunctionSet4 = true;

				//FUNCTION SET 3
				hideOrnamentTitleScreen();
				showOrnamentContactScreen();

				hideIconsContainer(); //need this function for a very fast scroll so icons container will still be hidden
			}
		}
	}
	else
	{
		if (canRunFunctionSet4 == true)
		{
			canRunFunctionSet1 = true;
			canRunFunctionSet2 = true;
			canRunFunctionSet3 = true;
			canRunFunctionSet4 = false;

			//FUNCTION SET 4
			hideOrnamentTitleScreen();
			hideOrnamentContactScreen();
			hideMouseScrollButton();

			hideIconsContainer(); //need this function for a very fast scroll so icons container will still be hidden
		}
	}
}

function showOrnamentTitleScreen()
{
	ornamentTitleScreenDiv.className = "";
	ornamentTitleScreenDiv.removeAttribute("class");
}

function hideOrnamentTitleScreen()
{
	ornamentTitleScreenDiv.className = "display-none";
}

function showOrnamentContactScreen()
{
	ornamentContactScreenDiv.className = "";
	ornamentContactScreenDiv.removeAttribute("class");
}

function hideOrnamentContactScreen()
{
	ornamentContactScreenDiv.className = "display-none";
}

function hideIconsContainer()
{
	if (canAnimateOrnaments == true)
	{
		iconsContainerDiv.style.left = "150%"; //hide it on the right side of screen
	}
}

function showMouseScrollButton()
{
	if (canAnimateOrnaments == true)
	{
		mouseScrollDiv.className = "";
		mouseScrollDiv.removeAttribute("class");
	}
}

function hideMouseScrollButton()
{
	mouseScrollDiv.className = "display-none";
}

function animateOrnamentContainer()
{
	if (canAnimateOrnaments == true)
	{
		var ornamentComputerDiv = document.getElementById("ornament-computer");
		var ornamentTableDiv = document.getElementById("ornament-table");
		var ornamentBookDiv = document.getElementById("ornament-book");
		var ornamentPhotoDiv = document.getElementById("ornament-photo");
		var ornamentClockDiv = document.getElementById("ornament-clock");
		var ornamentCupDiv = document.getElementById("ornament-cup");
		var ornamentEraserDiv = document.getElementById("ornament-eraser");
		var ornamentPrinterDiv = document.getElementById("ornament-printer");
		var ornamentSpeaker1Div = document.getElementById("ornament-speaker-1");
		var ornamentSpeaker2Div = document.getElementById("ornament-speaker-2");
		var ornamentOrangeDiv = document.getElementById("ornament-orange");
		var ornamentPlaneDiv = document.getElementById("ornament-plane");
		var ornamentLightbulb1Div = document.getElementById("ornament-lightbulb-1");
		var ornamentLightbulb2Div = document.getElementById("ornament-lightbulb-2");
		var ornamentSharpener1Div = document.getElementById("ornament-sharpener-1");
		var ornamentSharpener2Div = document.getElementById("ornament-sharpener-2");
		var ornamentToolDiv = document.getElementById("ornament-tool");
		var ornamentPaperContainerDiv = document.getElementById("ornament-paper-container");

		ornamentComputerDiv.className = "ornament-shift-up";
		ornamentTableDiv.className = "ornament-shift-up";
		ornamentBookDiv.className = "ornament-shift-left";
		ornamentPhotoDiv.className = "ornament-shift-right";
		ornamentClockDiv.className = "ornament-shift-down";
		ornamentCupDiv.className = "ornament-shift-left";
		ornamentEraserDiv.className = "ornament-shift-left";
		ornamentPrinterDiv.className = "ornament-shift-right";
		ornamentSpeaker1Div.className = "ornament-shift-down";
		ornamentSpeaker2Div.className = "ornament-shift-down";
		ornamentOrangeDiv.className = "ornament-shift-left";
		ornamentPlaneDiv.className = "ornament-shift-left";
		ornamentLightbulb1Div.className = "ornament-shift-down";
		ornamentLightbulb2Div.className = "ornament-shift-down";
		ornamentSharpener1Div.className = "ornament-shift-down";
		ornamentSharpener2Div.className = "ornament-shift-left";
		ornamentToolDiv.className = "ornament-shift-down";
		ornamentPaperContainerDiv.className = "ornament-shift-right";

		hideIconsContainer();
	}

	showOrnamentContainer(); //show after css animate change position so it won't flicker
}

function showOrnamentContainer()
{
	ornamentContainerDiv.className = "";
	ornamentContainerDiv.removeAttribute("class");
}

function enablePageScroll() //remove stop-scroll class from body object
{
	bodyObject.className = "";
	bodyObject.removeAttribute("class");

	window.ontouchmove = null; //mobile
}

function returnContainerContentVerticalPosition()
{
	return ornamentContainerDiv.offsetHeight - pageYOffset;
}

function setProjectsBottomDivPosition()
{
	projectsBottomDiv.style.top = projectsDiv.offsetTop + projectsDiv.offsetHeight + "px";
}

function addLoadedImageNumber()
{
	loadedImage = loadedImage + 1;

	loadedImagePercentage = Math.floor(loadedImage / imgArray.length * 100);
	if (loadedImagePercentage > 99)
	{
		loadedImagePercentage = 99;
	}

	setLoadedImagePercentageTextAndBar();
}

function setLoadedImagePercentageTo100()
{
	loadedImagePercentage = 100;
	setLoadedImagePercentageTextAndBar();
}

function setLoadedImagePercentageTextAndBar()
{
	loadedImagePercentageTextDiv.innerHTML = "LOADING " + loadedImagePercentage + "%";
	loadedImagePercentageBarDiv.style.width = loadedImagePercentage / 100 * loadedImagePercentageBoxDiv.offsetWidth + "px";
}

function addLoadFunctionToImg()
{
	imgArray = document.getElementsByTagName("img");

	for (var i=0; i<imgArray.length; i++)
	{
		imgArray[i].onload = function(){addLoadedImageNumber()};
	}
}

function rotateClockArrow()
{
	if (canAnimateOrnaments == true)
	{
		var ornamentClockMinuteDiv = document.getElementById("ornament-clock-minute");
		var ornamentClockHourDiv = document.getElementById("ornament-clock-hour");
		var clockAngleSpeed = 0.15;
		var hourAngle = (pageYOffset * clockAngleSpeed /12) % 360;
		var minuteAngle = pageYOffset * clockAngleSpeed % 360;

		ornamentClockHourDiv.style.webkitTransform = 'rotate('+hourAngle+'deg)'; 
	    ornamentClockHourDiv.style.mozTransform    = 'rotate('+hourAngle+'deg)'; 
	    ornamentClockHourDiv.style.msTransform     = 'rotate('+hourAngle+'deg)'; 
	    ornamentClockHourDiv.style.oTransform      = 'rotate('+hourAngle+'deg)'; 
	    ornamentClockHourDiv.style.transform       = 'rotate('+hourAngle+'deg)';

	    ornamentClockMinuteDiv.style.webkitTransform = 'rotate('+minuteAngle+'deg)'; 
	    ornamentClockMinuteDiv.style.mozTransform    = 'rotate('+minuteAngle+'deg)'; 
	    ornamentClockMinuteDiv.style.msTransform     = 'rotate('+minuteAngle+'deg)'; 
	    ornamentClockMinuteDiv.style.oTransform      = 'rotate('+minuteAngle+'deg)'; 
	    ornamentClockMinuteDiv.style.transform       = 'rotate('+minuteAngle+'deg)';
	}
}

function rotateSharpenerHandle()
{
	if (canAnimateOrnaments == true)
	{
		var ornamentSharpener1HandleDiv = document.getElementById("ornament-sharpener-1-handle");
		var ornamentSharpener1HandleShadowDiv = document.getElementById("ornament-sharpener-1-handle-shadow");
		var sharpenerHandleSpeed = -0.15;
		var handleAngle = pageYOffset * sharpenerHandleSpeed % 360;

		ornamentSharpener1HandleDiv.style.webkitTransform = 'rotate('+handleAngle+'deg)'; 
	    ornamentSharpener1HandleDiv.style.mozTransform    = 'rotate('+handleAngle+'deg)'; 
	    ornamentSharpener1HandleDiv.style.msTransform     = 'rotate('+handleAngle+'deg)'; 
	    ornamentSharpener1HandleDiv.style.oTransform      = 'rotate('+handleAngle+'deg)'; 
	    ornamentSharpener1HandleDiv.style.transform       = 'rotate('+handleAngle+'deg)';

	    ornamentSharpener1HandleShadowDiv.style.webkitTransform = 'rotate('+handleAngle+'deg)'; 
	    ornamentSharpener1HandleShadowDiv.style.mozTransform    = 'rotate('+handleAngle+'deg)'; 
	    ornamentSharpener1HandleShadowDiv.style.msTransform     = 'rotate('+handleAngle+'deg)'; 
	    ornamentSharpener1HandleShadowDiv.style.oTransform      = 'rotate('+handleAngle+'deg)'; 
	    ornamentSharpener1HandleShadowDiv.style.transform       = 'rotate('+handleAngle+'deg)';
	}
}

function printPaper()
{
	if (canAnimateOrnaments == true)
	{
		var ornamentPaperDiv = document.getElementById("ornament-paper");
		ornamentPaperDiv.style.top = (-1 * ornamentContainerDiv.offsetHeight) + (pageYOffset % ornamentContainerDiv.offsetHeight) + "px";
	}
}

function shiftIconsContainer()
{
	if (canAnimateOrnaments == true)
	{
		iconsContainerDiv.style.left = (returnContainerContentVerticalPosition() + projectsDiv.offsetHeight) / (ornamentContainerDiv.offsetTop + ornamentContainerDiv.offsetHeight) * 100 + 50 + "%"; //multiply 100 so it become percent, add 50 since it is the original left position (50%)
	}
}

function enableAnimateOrnaments()
{
	canAnimateOrnaments = true;
}

function disableAnimateOrnaments()
{
	canAnimateOrnaments = false;
}

function setAsSubPage()
{
	if (isSubPage())
	{
		disableAnimateOrnaments();
		
		reduceProjectsDivMarginTopAndBottom();
		setProjectsBottomDivPosition();
		
		shiftUpProjectsDiv();
	}
}

function isSubPage()
{
	if (document.URL.match("subpage")) //if url contains 'subpage', this web page will become a subpage, to hold special/independent project, which has different layout from homepage
	{
		return true;
	}
	else
	{
		return false;
	}
}

function reduceProjectsDivMarginTopAndBottom()
{
	if (isProjectsDivHeightBiggerThanScreenHeight())
	{
		projectsDiv.style.top = marginHeight + "px";
		projectsBottomDiv.style.height = marginHeight + "px";
	}
	else
	{
		projectsDiv.style.top = 0.5 * (ornamentContainerDiv.offsetHeight - projectsDiv.offsetHeight) + "px";
		projectsBottomDiv.style.height = "0px";
	}
}
function shiftUpProjectsDiv()
{
	if (isProjectsDivHeightBiggerThanScreenHeight())
	{
		projectsDiv.className = "projects-shift-up";
	}
	else
	{
		projectsDiv.className = "projects-shift-left";
	}
}

function isProjectsDivHeightBiggerThanScreenHeight()
{
	if (projectsDiv.offsetHeight >= ornamentContainerDiv.offsetHeight - 2 * marginHeight)
	{
		return true;
	}
	else
	{
		return false;
	}
}