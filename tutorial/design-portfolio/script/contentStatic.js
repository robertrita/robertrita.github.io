var divArray = document.getElementsByTagName("div");

var contentThumbnailPaperDiv = document.getElementById("contentThumbnailPaper");

var thumbnailPaperContainerArray = new Array();
storeThumbnailPaperContainerArray();

var thumbnailPaperContainerLeftEarlyPositionX; //position thumbnail container when it is still hidden on the left side
var thumbnailPaperContainerRightEarlyPositionX; //position thumbnail container when it is still hidden on the left side
updateThumbnailPaperContainerEarlyPositionX();

positionThumbnailPaperContainer();

setAndPositionString();

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
    for (var i=0; i<divArray.length; i++)
	{
        if(divArray[i].getAttribute("class") == "thumbnailPaperContainer")
		{
			thumbnailPaperContainerArray.push(divArray[i]);
        } 
    }
}

function scrollThumbnailPaperContainer()
{
	var thumbnailPaperContainerShiftSpeed = 2;
		
	for (var i=0; i<thumbnailPaperContainerArray.length; i++)
	{
		//bellow means the second condition will be true if thumbnail container start appear at the bottom most of the window
		if (verticalPosition + windowHeight >= contentThumbnailPaperDiv.offsetTop + thumbnailPaperContainerArray[i].offsetTop)
		{
			//bellow is thumbnail shift amount from the original x position
			var thumbnailPaperContainerShiftAmount = (verticalPosition + windowHeight - contentThumbnailPaperDiv.offsetTop - thumbnailPaperContainerArray[i].offsetTop) * thumbnailPaperContainerShiftSpeed;
				
			if (i % 2 == 0) //thumbnail number one, three, five, etc
			{
				if (thumbnailPaperContainerLeftEarlyPositionX + thumbnailPaperContainerShiftAmount > 0.5 * (windowWidth - thumbnailPaperContainerArray[0].offsetWidth)) //if thumbnail container already at or more than x center of window
				{
					thumbnailPaperContainerArray[i].style.left = 0.5 * (windowWidth - thumbnailPaperContainerArray[i].offsetWidth) + "px"; //make thumbnail container at x center of window
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
				}
				else
				{
					thumbnailPaperContainerArray[i].style.left = thumbnailPaperContainerRightEarlyPositionX - thumbnailPaperContainerShiftAmount + "px"; //shift thumbnail container to left
				}
			}
		}
	}	
}

function setAndPositionString()
{
	var stringArray = new Array();
	
	for (var i=0; i<divArray.length; i++)
	{
		if (divArray[i].getAttribute("class") == "stringGear")
		{
			stringArray.push(divArray[i]);
		}
	}
		
	for (var i=0; i<stringArray.length; i++)
	{
		stringArray[i].style.left = "0px";
		stringArray[i].style.top = thumbnailPaperContainerArray[i].offsetTop + 4 + "px";
		stringArray[i].style.width = windowWidth + "px";	
	}
}