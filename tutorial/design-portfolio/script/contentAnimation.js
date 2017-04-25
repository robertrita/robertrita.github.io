var contentThumbnailWindowDiv = document.getElementById("contentThumbnailWindow");
var earlyWindowRightPositionX = -966;

var windowLeftOpeningArray = new Array();
var windowRightOpeningArray = new Array();
storeDivs();
closeAllWindows();

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

function slideFrame()
{
	var slide_width = 161;
	var scrollGap = 70;
	var limitToStartOpenWindowFromBottom = 0.2 * windowHeight; //first window starts opening when its y-position is 20% from the bottom
	
	for (var i=0; i<windowLeftOpeningArray.length; i++)
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
			}
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