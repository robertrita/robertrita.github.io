//INFORMATION CONTAINER, PAPER THUMBNAIL, AND WINDOW THUMBNAIL - FUNCTION AND VARIABLE TOGETHER--------------------------------------------------------------------------------------------------------

var canAdjustOverflowHiddenDivForMobileDevice = true;

window.onscroll = function (e)
{
	adjustOverflowHiddenDivForSafariMobileDevice();
	
  	setVerticalPosition();
    
 	scrollThumbnailPaperContainer(); //for thumbnail paper
  
 	slideFrame(); //for thumbnail window
  
 	shiftInformationContainer1Y();
 	shiftInformationContainer2Y();
  
 	rotateGear();

 	//bellow is for background parallax effect
 	//shiftBackgroundPositionY();
  
 	setVerticalPositionBefore();
  
 	hideIconScrollDown(); //from header.js
  
 	checkSpeakBubbleMonkey();
}

function setVerticalPositionBefore()
{
	verticalPositionBefore = verticalPosition;
}

window.onresize = function (e)
{
	getWindowWidthHeight();
   	resizeHeader();
	resizeContentStatic();
	resizeContentAnimation();
	resizeContentInformation();
	positionGearContainer();
	positionButtonGoUp();
	setStringGearMaskDiv();
	positionStringGear();
	positionSpeakBubbleMonkey();
	positionFormAndMonkey();
}

function setVerticalPosition()
{
	if (browserName == "internet explorer")
	{
		verticalPosition = document.documentElement.scrollTop;
	}
	else
	{
		verticalPosition = pageYOffset;
	}
}

function getThumbnailFileName(id)
{
	var imageElement = document.getElementById(id).getElementsByTagName("img");
	for (var i=0; i<imageElement.length; i++)
	{
		var imageFileName = imageElement[i].src;
				
		for (var j=0; j<imageFileName.length; j++)
		{
			if((imageFileName.substr(j,9) == "thmGraJpg") || (imageFileName.substr(j,9) == "thmAnmSwf"))
			{
				var thumbnailFileName = imageFileName.substr(j,imageFileName.length - j);
				break;
			}
		}
	}
	return thumbnailFileName;
}

function loadStaticOrAnimation(id)
{
	if (id != previousThumbnailId)
	{
		thumbnailIdNow = id;
		
		translateToDesignFileName(getThumbnailFileName(id));
		
		shiftUpPreviousThumbnailCaption(previousThumbnailId);
		
		previousThumbnailId = id;
	}
}
		
function translateToDesignFileName(thumbnailFileName)
{
	var thumbFileString = thumbnailFileName;
	var dotPosition = thumbFileString.indexOf(".");
	var extension = (thumbFileString.substr(6,3)).toLowerCase();
	var firstStaticFileName = (thumbFileString.substr(3,3)).toLowerCase();
	var lastStaticFileName = thumbFileString.substr(9,dotPosition - 9);
	
	var folderName;
	var fileName;
			
	if ((extension == "jpg") || (extension == "png") || (extension == "gif"))
	{
		folderName = "images/";
		fileName = firstStaticFileName + lastStaticFileName + "." + extension;
		loadStatic(folderName + fileName);
		
		changeInformationText(thumbFileString, informationContainer1Div);
	}
	if (extension == "swf")
	{
		folderName = "swfs/";
		fileName = firstStaticFileName + lastStaticFileName + ".swf";
		loadAnimation(folderName + fileName);
		
		changeInformationText(thumbFileString, informationContainer2Div);
	}
}

function shiftUpPreviousThumbnailCaption(previousId)
{
	var previousIdString = String(previousId);
	
	if (previousIdString.substring(0,6) == "window")
	{
		$("#"+previousId).find(".thumbnailWindowCaption").stop().animate({top: "-160px"}, 0, function() {});
	}
	
	if (previousIdString.substring(0,6) == "thumbn")
	{
		$("#"+previousId).find(".thumbnailPaperCaption").stop().animate({top: "-160px"}, 0, function() {});
	}
}

function shiftUpThumbnailCaptionNow()
{
	var IdNowString = String(thumbnailIdNow);
	
	if (IdNowString.substring(0,6) == "window")
	{
		$("#"+thumbnailIdNow).find(".thumbnailWindowCaption").stop().animate({top: "-160px"}, 0, function() {});
	}
	
	if (IdNowString.substring(0,6) == "thumbn")
	{
		$("#"+thumbnailIdNow).find(".thumbnailPaperCaption").stop().animate({top: "-160px"}, 0, function() {});
	}
	
	previousThumbnailId = "";
}

function adjustOverflowHiddenDivForSafariMobileDevice()
{
	if ((navigator.userAgent.match(/iPad/i) != null) || (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null))
	{
		if (canAdjustOverflowHiddenDivForMobileDevice == true)
		{
			getWindowWidthHeight();
			headerDiv.style.width = windowWidth + "px";
			contentThumbnailPaperDiv.style.width = windowWidth + "px";
			contentInformationContainer1Div.style.width = windowWidth + "px";
			contentInformationContainer2Div.style.width = windowWidth + "px";
			footerDiv.style.width = windowWidth + "px";
			stringGearMaskDiv.style.width = windowWidth + "px";
			
			canAdjustOverflowHiddenDivForMobileDevice = false;
		}
	}
}