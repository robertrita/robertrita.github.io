//TITLE ANIMATION

var titleAnimationDiv = document.getElementById("titleAnimation");

function positionTitleAnimation()
{
	titleAnimationDiv.style.left = (0.5 * (windowWidth - contentThumbnailWindowDiv.offsetWidth) + 17) + "px";
}

function initVariableAndFunctionInContentAnimationJs()
{
	positionTitleAnimation();
	positionContentThumbnailWindow();
}

function resizeContentAnimation() //called from contentFunction.js
{
	positionTitleAnimation();
	positionDesignContainer2();
	positionContentThumbnailWindow();
}












//CONTAINER ANIMATION

var swfWidth;
var swfHeight;
var frame2Thickness = 10;
var earlyWindowRightPositionX = -966;
var designContainer2Div = document.getElementById("designContainer2");

function loadAnimation(swfPath)
{
	if (isDesignContainer1Open == true)
	{
		closeDesignContainer1();
	}
	
	getSwfWidthAndHeight(swfPath);
	resizeDesignContainer2WidthHeight();
	createFrame2();
	resetInformationContainerVerticalPositionAfterDesignContainerAppear();
		
	var flashvars = {};
	var params = {};
	params.bgcolor = "ffffff";
	params.wmode = "transparent";
	var attributes = {};
		
	swfobject.embedSWF(swfPath, "designArea2", swfWidth, swfHeight, "9.0.0", "swfs/expressInstall.swf", flashvars, params, attributes);
	
	designContainer2Div.style.marginBottom = "40px";
	
	isDesignContainer2Open = true;
	
	shiftInformationContainer2X();
	
	//change gear position
	positionGearContainer();
	setStringGearMaskDiv();
	
	$.scrollTo(titleAnimationDiv, 0);
}

function closeDesignContainer2()
{
	swfobject.removeSWF("designArea2");
	designContainer2Div.innerHTML += '<div id="designArea2"></div>'; //add back the deleted designArea div
	designContainer2Div.style.width = "0px";
	designContainer2Div.style.height = "0px";
	designContainer2Div.style.marginBottom = "0px";
	isDesignContainer2Open = false;
	hideInformationContainer2Div();
}

function getSwfWidthAndHeight(fileToLoadSent)
{
	switch (fileToLoadSent)
	{
		case "swfs/anm2m2mm.swf":
			swfWidth = 600;
			swfHeight = 400;
			break;
		case "swfs/anmBullrun.swf":
			swfWidth = 728;
			swfHeight = 90;
			break;
		case "swfs/anmHaier.swf":
			swfWidth = 960;
			swfHeight = 326;
			break;
		case "swfs/anmIncognito.swf":
			swfWidth = 756;
			swfHeight = 313;
			break;
		case "swfs/anmNiptuck.swf":
			swfWidth = 980;
			swfHeight = 990;
			break;
		case "swfs/anmShield.swf":
			swfWidth = 300;
			swfHeight = 250;
			break;
		case "swfs/anmSoa.swf":
			swfWidth = 970;
			swfHeight = 418;
			break;
		case "swfs/anmSunny.swf":
			swfWidth = 960;
			swfHeight = 250;
			break;
		case "swfs/anmTestees.swf":
			swfWidth = 728;
			swfHeight = 90;
			break;
		case "swfs/anmWwe.swf":
			swfWidth = 600;
			swfHeight = 400;
			break;
		default:
  			swfWidth = 300;
			swfHeight = 250;
	}
}

function createFrame2()
{
	var frame2Div = document.getElementById("frame2");
	var frame2InsideDiv = document.getElementById("frame2Inside");
	
	frame2Div.style.width = ((2 * frame2Thickness) + swfWidth) + "px";
	frame2Div.style.height = ((2 * frame2Thickness) + swfHeight) + "px";
	
	frame2InsideDiv.style.left = frame2Thickness + "px";
	frame2InsideDiv.style.top = frame2Thickness + "px";
	frame2InsideDiv.style.width = swfWidth + "px";
	frame2InsideDiv.style.height = swfHeight + "px";
}

function resizeDesignContainer2WidthHeight()
{
	designContainer2Div.style.width = ((2 * frame2Thickness) + swfWidth) + "px";
	designContainer2Div.style.height = ((2 * frame2Thickness) + swfHeight) + "px";
	
	positionDesignContainer2();
}

function positionDesignContainer2()
{
	designContainer2Div.style.left = (0.5 * (windowWidth - designContainer2Div.offsetWidth)) + "px";
}














//WINDOW THUMBNAIL FUNCTION AND VARIABLE---------------------------------------------------------------------------------------------------------------------------------------------------------------------


var contentThumbnailWindowDiv = document.getElementById("contentThumbnailWindow");
var thumbnailWindowRowNumberMultiplyNumber; //the number related to stop gear rotation in window thumbnails
resetThumbnailWindowMultiplyNumber();

var windowLeftOpeningArray = new Array();
var windowRightOpeningArray = new Array();
var canCloseWindowArray = new Array();
storeDivs();
storeCanCloseWindowBoolean();
closeAllWindows();

function positionContentThumbnailWindow()
{
	contentThumbnailWindowDiv.style.left = (0.5 * (windowWidth - contentThumbnailWindowDiv.offsetWidth)) + "px";
}

function resetThumbnailWindowMultiplyNumber()
{
	thumbnailWindowRowNumberMultiplyNumber = 1;
}

function storeDivs()
{
	var divArray = document.getElementsByTagName("div");
	
    for (var i=0; i<divArray.length; i++)
	{
        if(divArray[i].getAttribute("class") == "windowLeftOpening")
		{
			windowLeftOpeningArray.push(divArray[i]);
        }
		if(divArray[i].getAttribute("class") == "windowRightOpening")
		{
			windowRightOpeningArray.push(divArray[i]);
		}
    }
}

function storeCanCloseWindowBoolean()
{
	for(var i=0; i<windowLeftOpeningArray.length; i++)
	{
		canCloseWindowArray.push(true); //give true value to each window so it can be opened
	}
}

function setCanCloseWindowArrayToTrue()
{
	for(var i=0; i<canCloseWindowArray.length; i++)
	{
		canCloseWindowArray[i] = true;
	}
}

function slideFrame()
{
	var slide_width = 161;
	var scrollGap = 70;
	var limitToStartOpenWindowFromBottom = 0.2 * windowHeight; //first window starts opening when its y-position is 20% from the bottom
	
	for (var i=0; i<windowLeftOpeningArray.length; i++)
	{
		if (verticalPosition == 0)
		{
			closeAllWindows();
			setCanCloseWindowArrayToTrue();
			
			if (isDesignContainer2Open == true)
			{
				closeDesignContainer2();
				
				setStringGearMaskDiv();
				positionGearContainer();
				
				shiftUpThumbnailCaptionNow();
				
				isDesignContainer2Open = false;
			}
		}
		
		else
		{
			//second condition bellow means the y limit when the window start opening
			if ((canCloseWindowArray[i] == true) && (verticalPosition + windowHeight - limitToStartOpenWindowFromBottom >= contentThumbnailWindowDiv.offsetTop))
			{
				//opening window image show slide 1
				if (verticalPosition + windowHeight - limitToStartOpenWindowFromBottom < (i + 1) * scrollGap + contentThumbnailWindowDiv.offsetTop)
				{
					closeOnePairOfWindows(i);
				}
		
				//opening window image show slide 2 - 6
				for (var j=1; j< 6; j++)
				{
					if ((verticalPosition + windowHeight - limitToStartOpenWindowFromBottom >= (i + j) * scrollGap + contentThumbnailWindowDiv.offsetTop) && (verticalPosition + windowHeight - limitToStartOpenWindowFromBottom < (i + j + 1) * scrollGap + contentThumbnailWindowDiv.offsetTop))
					{
							windowLeftOpeningArray[i].style.left = (-j * slide_width) + "px";
							windowRightOpeningArray[i].style.left = earlyWindowRightPositionX + (j * slide_width) + "px";
					}
				}
				
				//opening window image show slide 7
				if (verticalPosition + windowHeight - limitToStartOpenWindowFromBottom >= (i + 6) * scrollGap + contentThumbnailWindowDiv.offsetTop)
				{
					windowLeftOpeningArray[i].style.left = (-6 * slide_width) + "px";
					windowRightOpeningArray[i].style.left = earlyWindowRightPositionX + (6 * slide_width) + "px";
					
					canCloseWindowArray[i] = false; //to make the window open forever
					
					setCanRotateGearArray(i); //to make the gear stop rotating when the rightmost window fully opened
				}
			}
		}
	}
}

function setCanRotateGearArray(i)
{
	if (i == thumbnailWindowRowNumberMultiplyNumber * thumbnailWindowRowNumber - 1)
	{
		canRotateGearArray[thumbnailPaperContainerArray.length - 1 + thumbnailWindowRowNumberMultiplyNumber] = false;
		thumbnailWindowRowNumberMultiplyNumber = thumbnailWindowRowNumberMultiplyNumber + 1;
	}
	if (i == windowLeftOpeningArray.length  - 1)
	{
		canRotateGearArray[canRotateGearArray.length - 1] = false;
	}
}

function closeAllWindows()
{
	for (var i=0; i<windowLeftOpeningArray.length; i++)
	{
		closeOnePairOfWindows(i);
	}
}

function closeOnePairOfWindows(i)
{
	windowLeftOpeningArray[i].style.left = "0px";
	windowRightOpeningArray[i].style.left = earlyWindowRightPositionX + "px";
}

function shiftDownThumbnailWindowCaption(id)
{
	$("#"+id).find(".thumbnailWindowCaption").stop().animate({top: "0px"}, 300, function() {});
}

function shiftUpThumbnailWindowCaption(id)
{
	if (id != previousThumbnailId)
	{
		$("#"+id).find(".thumbnailWindowCaption").stop().animate({top: "-160px"}, 300, function() {});
	}
}