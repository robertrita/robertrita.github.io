//TITLE STATIC

var titleStaticDiv = document.getElementById("titleStatic");

function positionTitleStatic()
{
	titleStaticDiv.style.left = (0.5 * (windowWidth - thumbnailPaperContainerArray[0].offsetWidth) + 2) + "px";
}











//CONTAINER STATIC

var imagePathGlobal;
var frame1Thickness = 10;
var designContainer1Div = document.getElementById("designContainer1");
var designArea1Div = document.getElementById("designArea1");
var blockDesignArea1Div = document.getElementById("blockDesignArea1"); //to make user difficult to do save image as
	
function getImageWidthAndHeight()
{
	createFrame1(this.width,this.height);
	resizeDesignContainer1WidthHeight(this.width,this.height);
	showImage(this.width,this.height);
	resetInformationContainerVerticalPositionAfterDesignContainerAppear();
	
	//change gear position
	positionGearContainer();
	setStringGearMaskDiv();
}

function loadStatic(imagePath)
{
	if (isDesignContainer2Open == true)
	{
		closeDesignContainer2();
	}
	
	var myImage = new Image();
	myImage.name = imagePath;
	myImage.onload = getImageWidthAndHeight;
	myImage.src = imagePath;
	
	imagePathGlobal = imagePath;
}

function closeDesignContainer1()
{
	designArea1Div.innerHTML = "";
	designContainer1Div.style.width = "0px";
	designContainer1Div.style.height = "0px";
	designContainer1Div.style.marginBottom = "0px";
	isDesignContainer1Open = false;
	hideInformationContainer1Div();
}

function createFrame1(imageWidthSent,imageHeightSent)
{
	var imageWidthReceived = imageWidthSent;
	var imageHeightReceived = imageHeightSent;
	var frame1Div = document.getElementById("frame1"); 
	
	frame1Div.style.width = 2 * frame1Thickness + imageWidthReceived + "px";
	frame1Div.style.height = 2 * frame1Thickness + imageHeightReceived + "px";
}

function resizeDesignContainer1WidthHeight(widthSent,heightSent)
{
	designContainer1Div.style.width = (2 * frame1Thickness + widthSent) + "px";
	designContainer1Div.style.height = (2 * frame1Thickness + heightSent) + "px";
	
	positionDesignContainer1();
}

function showImage(imageWidthSent,imageHeightSent)
{
	var imageWidthReceived = imageWidthSent;
	var imageHeightReceived = imageHeightSent;
	
	var newHTML1 = '<img src=\"' +imagePathGlobal +'\" height=\"' +imageHeightReceived +'\" width=\"' +imageWidthReceived + '\" />';
	designArea1Div.innerHTML = newHTML1;
	
	var newHTML2 = '<img src=\"images/image.png\" height=\"' +imageHeightReceived +'\" width=\"' +imageWidthReceived + '\" />';
	blockDesignArea1Div.innerHTML = newHTML2;
	
	designContainer1Div.style.marginBottom = "40px";
	
	isDesignContainer1Open = true;
	shiftInformationContainer1X();
	
	$.scrollTo(titleStaticDiv, 0);
}

function positionDesignContainer1()
{
	designContainer1Div.style.left = (0.5 * (windowWidth - designContainer1Div.offsetWidth)) + "px";
}












//PAPER THUMBNAIL


var contentThumbnailPaperDiv = document.getElementById("contentThumbnailPaper");

var thumbnailPaperContainerLeftEarlyPositionX; //position thumbnail container when it is still hidden on the left side
var thumbnailPaperContainerRightEarlyPositionX; //position thumbnail container when it is still hidden on the left side

var thumbnailPaperContainerArray = new Array();
var canScrollThumbnailPaperContainerArray = new Array(); //array contains true and false, true means the thumbnails still can be shifted, false means the thumbnails is already locked in center position 
storeThumbnailPaperContainerArray();
storeCanScrollThumbnailPaperContainerArray();

function initVariableAndFunctionInContentStaticJs() //called from header.js
{
	positionThumbnailPaperContainer();
	positionTitleStatic();
}

function positionThumbnailPaperContainer() //position thumbnails container on the left and right side, outside the viewable window area
{
	for (var i=0; i<thumbnailPaperContainerArray.length; i++)
	{
		if (i % 2 == 0)
		{
			thumbnailPaperContainerLeftEarlyPositionX = -1 * thumbnailPaperContainerArray[i].offsetWidth;
			thumbnailPaperContainerArray[i].style.left = thumbnailPaperContainerLeftEarlyPositionX + "px";
		}
		else
		{
			thumbnailPaperContainerRightEarlyPositionX = windowWidth;
			thumbnailPaperContainerArray[i].style.left = thumbnailPaperContainerRightEarlyPositionX + "px";
		}
	}
}

function updateThumbnailPaperContainerEarlyPositionX()
{
	thumbnailPaperContainerLeftEarlyPositionX = -1 * thumbnailPaperContainerArray[0].offsetWidth;
	thumbnailPaperContainerRightEarlyPositionX = windowWidth;
}

function storeThumbnailPaperContainerArray()
{
	var divArray = document.getElementsByTagName("div");
	
    for (var i=0; i<divArray.length; i++)
	{
        if(divArray[i].getAttribute("class") == "thumbnailPaperContainer")
		{
			thumbnailPaperContainerArray.push(divArray[i]);
        } 
    }
}

function storeCanScrollThumbnailPaperContainerArray()
{
	for (var i=0; i<thumbnailPaperContainerArray.length; i++)
	{
		canScrollThumbnailPaperContainerArray.push(true); //give all true value first, so thumbnail container can be shifted at beginning
	}
}

function scrollThumbnailPaperContainer()
{
	if (verticalPosition == 0)
	{
		positionThumbnailPaperContainer();
		setCanScrollThumbnailPaperContainerArrayToTrue();
		
		if (isDesignContainer1Open == true)
		{
			closeDesignContainer1();
			
			setStringGearMaskDiv();
			positionGearContainer();
			
			shiftUpThumbnailCaptionNow();
			
			isDesignContainer1Open = false;
		}
	}
	else
	{
	
		var distanceThumbnailToStopShiftingX = 0.5 * (windowWidth - thumbnailPaperContainerArray[0].offsetWidth) + thumbnailPaperContainerArray[0].offsetWidth; //when thumbnails at the middle of window (x-position), the thumbnails stop shifted
		var distanceThumbnailToStopShiftingY = 0.7 * windowHeight; //when thumbnails at the middle of window (y-position), the thumbnails stop shifted
		//bellow means each 1px mouse scroll, there will be 'thumbnailPaperContainerShiftSpeed' pixel shift to left or right
		var thumbnailPaperContainerShiftSpeed = Math.ceil(distanceThumbnailToStopShiftingX / distanceThumbnailToStopShiftingY);
		
		for (var i=0; i<thumbnailPaperContainerArray.length; i++)
		{
			//bellow means the second condition will be true if thumbnail container start appear at the bottom most of the window
			if ((canScrollThumbnailPaperContainerArray[i] == true) && (verticalPosition + windowHeight >= contentThumbnailPaperDiv.offsetTop + thumbnailPaperContainerArray[i].offsetTop))
			{
				//bellow is thumbnail shift amount from the original x position
				var thumbnailPaperContainerShiftAmount = (verticalPosition + windowHeight - contentThumbnailPaperDiv.offsetTop - thumbnailPaperContainerArray[i].offsetTop) * thumbnailPaperContainerShiftSpeed;
				
				if (i % 2 == 0) //thumbnail number one, three, five, etc
				{
					if (thumbnailPaperContainerLeftEarlyPositionX + thumbnailPaperContainerShiftAmount > 0.5 * (windowWidth - thumbnailPaperContainerArray[0].offsetWidth)) //if thumbnail container already at or more than x center of window
					{
						thumbnailPaperContainerArray[i].style.left = 0.5 * (windowWidth - thumbnailPaperContainerArray[i].offsetWidth) + "px"; //make thumbnail container at x center of window
						canScrollThumbnailPaperContainerArray[i] = false; //locked thumbnail container , so it can't be shifted anymore
						canRotateGearArray[i] = false; //lock gear so it won't rotate
					}
					else
					{
						thumbnailPaperContainerArray[i].style.left = thumbnailPaperContainerLeftEarlyPositionX + thumbnailPaperContainerShiftAmount + "px"; //shift thumbnail container to right
					}
				}
				else //thumbnail number two, four, sixth, etc
				{
					if (thumbnailPaperContainerRightEarlyPositionX - thumbnailPaperContainerShiftAmount < 0.5 * (windowWidth - thumbnailPaperContainerArray[0].offsetWidth)) //if thumbnail container already at or less than x center of window
					{
						thumbnailPaperContainerArray[i].style.left = 0.5 * (windowWidth - thumbnailPaperContainerArray[i].offsetWidth) + "px";
						canScrollThumbnailPaperContainerArray[i] = false; //locked thumbnail container , so it can't be shifted anymore
						canRotateGearArray[i] = false; //lock gear so it won't rotate
					}
					else
					{
						thumbnailPaperContainerArray[i].style.left = thumbnailPaperContainerRightEarlyPositionX - thumbnailPaperContainerShiftAmount + "px"; //shift thumbnail container to left
					}
				}
			}
		}
	
	} //from else
	
}

function setCanScrollThumbnailPaperContainerArrayToTrue()
{
	for (var i=0; i<canScrollThumbnailPaperContainerArray.length; i++)
	{
		canScrollThumbnailPaperContainerArray[i] = true;
	}
}

function resizeContentStatic()
{
	updateThumbnailPaperContainerEarlyPositionX();
	setCanScrollThumbnailPaperContainerArrayToTrue(); //so the locked thumbnail can be shifted when the window is resizing
	scrollThumbnailPaperContainer(verticalPosition);
	positionTitleStatic();
	positionDesignContainer1();
}

function shiftDownThumbnailPaperCaption(id)
{
	$("#"+id).find(".thumbnailPaperCaption").stop().animate({top: "0px"}, 300, function() {});
}

function shiftUpThumbnailPaperCaption(id)
{
	if (id != previousThumbnailId)
	{
		$("#"+id).find(".thumbnailPaperCaption").stop().animate({top: "-160px"}, 300, function() {});
	}
}