var gearMaskArray = new Array();
var gearContainerArray = new Array();
var gearArray = new Array();
var handAndArmArray = new Array();
var thumbnailWindowArray = new Array();
var canRotateGearArray = new Array();
var handOpenArray = new Array();
var handCloseArray = new Array;
var stringGearArray = new Array;
var thumbnailPaperContainerNumber;
var stringGearMaskDiv;
var thumbnailWindowRowNumber;
var gearRadius;
var gearRotationSpeed;

countThumbnailPaperContainerNumber(); 
storeGearRelatedDiv(); 
initCanRotateGearArray(); 
setAllHandToClose();

function initVariableAndFunctionInGearJs() //called from header.js, after window.onload
{
	setStringGearMaskDiv(); 
	
	thumbnailWindowRowNumber = Math.floor(contentThumbnailWindowDiv.offsetWidth / thumbnailWindowArray[0].offsetWidth); //ok
	
	positionGearContainer(); 
	positionGear(); 
	positionHandEarly(); 
	positionStringGear();
	
	gearRadius = 0.5 * gearArray[0].offsetWidth;
	gearRotationSpeed = 1;
}

function storeGearRelatedDiv()
{
	var divArray = document.getElementsByTagName("div");
	
    for (var i=0; i<divArray.length; i++)
	{
        if (divArray[i].getAttribute("class") == "gearMask")
		{
			gearMaskArray.push(divArray[i]);
        }
		if (divArray[i].getAttribute("class") == "thumbnailWindow")
		{
			thumbnailWindowArray.push(divArray[i]);
        }
		if (divArray[i].getAttribute("class") == "gearContainer")
		{
			gearContainerArray.push(divArray[i]);
        }
		if (divArray[i].getAttribute("class") == "gear")
		{
			gearArray.push(divArray[i]);
        }
		if ((divArray[i].getAttribute("class") == "handAndArmRight") || (divArray[i].getAttribute("class") == "handAndArmLeft"))
		{
			handAndArmArray.push(divArray[i]);
        }
		
		if ((divArray[i].getAttribute("class") == "handOpenRight") || (divArray[i].getAttribute("class") == "handOpenLeft"))
		{
			handOpenArray.push(divArray[i]);
		}
		
		if ((divArray[i].getAttribute("class") == "handCloseRight") || (divArray[i].getAttribute("class") == "handCloseLeft"))
		{
			handCloseArray.push(divArray[i]);
		}
		if (divArray[i].getAttribute("class") == "stringGear")
		{
			stringGearArray.push(divArray[i]);
		}
		if (divArray[i].getAttribute("class") == "stringGearMask")
		{
			stringGearMaskDiv = divArray[i];
		}
    }
}

function initCanRotateGearArray()
{
	for (var i=0; i<gearContainerArray.length; i++)
	{
		canRotateGearArray[i] = true;
	}
}

function countThumbnailPaperContainerNumber()
{
	thumbnailPaperContainerNumber = 0;
	
	var divArray = document.getElementsByTagName("div");
	
    for (var i=0; i<divArray.length; i++)
	{
        if (divArray[i].getAttribute("class") == "thumbnailPaperContainer")
		{
			thumbnailPaperContainerNumber = thumbnailPaperContainerNumber + 1;
        } 
    }
}

function rotateGear()
{
	var handDegree;
	var handVerticalPositionFromGearCenter;
	var gearDegree;
	var handLength = handAndArmArray[0].offsetWidth;
	
	if (verticalPosition == 0)
	{
		initCanRotateGearArray();
		setAllHandToClose();
		resetThumbnailWindowMultiplyNumber();
	}

	for (var i=0; i<gearContainerArray.length; i++)
	{
		if (canRotateGearArray[i] == true)
		{
			//below to make the angle of each gear rotate differently
			//gearDegree = (gearRotationSpeed * (verticalPosition + windowHeight - gearContainerArray[i].offsetTop)) % 360;
			
			gearDegree = (gearRotationSpeed * verticalPosition) % 360;
			var gearDegreeModulus90InRadian = degreesToRadians((gearDegree % 90)); //related to position gear in ie
		
			handVerticalPositionFromGearCenter = Math.cos(degreesToRadians(gearDegree)) * gearRadius;
		
			if(i % 2 == 0) //first, third, fifth, etc (right gear)
			{	
				handDegree = radiansToDegrees(Math.asin(handVerticalPositionFromGearCenter / handLength));
			
				adjustGearPositionLikeBeforeRotation(i); //for ie
				
				//rotate gear
				rotateElement(gearArray[i], gearDegree);
				
				adjustGearPositionAfterRotation(i, gearDegreeModulus90InRadian); //for ie
				
				//position hand x
				handAndArmArray[i].style.left = gearArray[i].offsetLeft + (0.5 * gearArray[i].offsetWidth) + (Math.sin(degreesToRadians(gearDegree)) * gearRadius) - 98 + "px"; //98 is x distance handAndArmArray from handle center	
			}
			else //left gear
			{
				handDegree = -1 * radiansToDegrees(Math.asin(handVerticalPositionFromGearCenter / handLength));
				
				adjustGearPositionLikeBeforeRotation(i); //for ie
				
				//rotate gear
				rotateElement(gearArray[i], -1 * gearDegree);
				
				adjustGearPositionAfterRotation(i, gearDegreeModulus90InRadian); //for ie
			
				//position hand x
				handAndArmArray[i].style.left = gearArray[i].offsetLeft + (0.5 * gearArray[i].offsetWidth) - (Math.sin(degreesToRadians(gearDegree)) * gearRadius) - handAndArmArray[i].offsetWidth + 98 + "px"; //98 is x distance handAndArmArray from handle center		
			}
		
			//position hand y
			handAndArmArray[i].style.top = gearArray[i].offsetTop + (0.5 * gearArray[i].offsetHeight) - (Math.cos(degreesToRadians(gearDegree)) * gearRadius) - 65 + "px"; //65 is y distance handAndArmArray from handle center		
			//rotate hand
			if (browserName != "safari") //not rotate the hand since the rotation is not good in safari
			{
				rotateElement(handAndArmArray[i], handDegree);
			}
			
		}
		else //can rotate gear false - hand disappearing
		{
			if (verticalPosition > verticalPositionBefore)
			{
				if(i % 2 == 0) //first, third, fifth, etc
				{
					if (handAndArmArray[i].offsetLeft <= gearContainerArray[i].offsetWidth) //if hand still appear
					{
						//shift hand to right
						handAndArmArray[i].style.left = handAndArmArray[i].offsetLeft + (verticalPosition - verticalPositionBefore) + "px";
					}
				}
				else
				{
					if (handAndArmArray[i].offsetLeft + handAndArmArray[i].offsetWidth >= 0) //if hand still appear
					{
						//shift hand to left
						handAndArmArray[i].style.left = handAndArmArray[i].offsetLeft - (verticalPosition - verticalPositionBefore) + "px";
					}
				}
				
				//hand close disappear
				handCloseArray[i].style.opacity = 0;
				handCloseArray[i].style.filter = "alpha(opacity=" + 0 + ")";
				
				//hand open appear
				handOpenArray[i].style.opacity = 1;
				handOpenArray[i].style.filter = "alpha(opacity=" + 100 + ")";
			}
		}
	}
}

function adjustGearPositionLikeBeforeRotation(i)
{
	if (browserName == "internet explorer")
	{
		//adjust gear position like before rotation
		rotateElement(gearArray[i], 0);
		gearArray[i].style.top = "84px";
		if(i % 2 == 0) //first, third, fifth, etc (right gear)
		{
			gearArray[i].style.left = "84px";
		}
		else //left gear
		{
			gearArray[i].style.left = "0px";
		}
	}
}

function adjustGearPositionAfterRotation(i, gearDegreeModulus90InRadian)
{
	if (browserName == "internet explorer")
	{
		//adjust gear position after rotation
		gearArray[i].style.top = gearArray[i].offsetTop - (0.5 * ((Math.cos(gearDegreeModulus90InRadian) * gearArray[i].offsetHeight) + (Math.sin(gearDegreeModulus90InRadian) * gearArray[i].offsetHeight) - gearArray[i].offsetHeight)) + "px";
		gearArray[i].style.left = gearArray[i].offsetLeft - (0.5 * ((Math.cos(gearDegreeModulus90InRadian) * gearArray[i].offsetHeight) + (Math.sin(gearDegreeModulus90InRadian) * gearArray[i].offsetHeight) - gearArray[i].offsetHeight)) + "px";	
	}
}

function positionGearContainer()
{
	for (var i=0; i<gearContainerArray.length; i++)
	{
		positionGearContainerX(i);
		positionGearContainerY(i);
	}
}

function positionGearContainerX(i)
{
	var contentWidthMax = 1006; //distance between window thumbnail column leftmost and row rightmost
	var sideSpace = (windowWidth - contentWidthMax) / 2;
	var horizontalDistanceBetweenOpenAndCloseHand = 50;
	
	if (i % 2 == 0) //first, third, fifth, etc (right column gear)
	{
		if (gearContainerArray[i].offsetWidth - horizontalDistanceBetweenOpenAndCloseHand < sideSpace) //50 is distance between open hand and close hand
		{
			//alert(gearContainerArray.length);
			gearContainerArray[i].style.left = windowWidth - gearContainerArray[i].offsetWidth + "px";
		}
		else
		{
			gearContainerArray[i].style.left = windowWidth - sideSpace - horizontalDistanceBetweenOpenAndCloseHand + "px";
		}
	}
	else // left column gear
	{
		if (gearContainerArray[i].offsetWidth - horizontalDistanceBetweenOpenAndCloseHand < sideSpace) //50 is distance between open hand and close hand
		{
			gearContainerArray[i].style.left = "0px";
		}
		else
		{
			gearContainerArray[i].style.left = sideSpace - gearContainerArray[i].offsetWidth + horizontalDistanceBetweenOpenAndCloseHand + "px";
		}
	}
}

function positionGearContainerY(i)
{
	if (i < thumbnailPaperContainerNumber) //position gear container for paper thumbnail
	{
		gearMaskArray[i].style.top = contentThumbnailPaperDiv.offsetTop + thumbnailPaperContainerArray[i].offsetTop - 170 + "px";
	}
	else //position gear container for window thumbnail
	{
		gearMaskArray[i].style.top = contentThumbnailWindowDiv.offsetTop + (thumbnailWindowArray[(i - thumbnailPaperContainerNumber) * thumbnailWindowRowNumber].offsetTop) - 120 + "px";
	}
}

function positionGear()
{
	for (var i=0; i<gearContainerArray.length; i++)
	{
		if(i % 2 == 0) //first, third, fifth, etc (right gear)
		{
			gearArray[i].style.left = "84px";
			gearArray[i].style.top = "84px";
		}
		else //left gear
		{			
			gearArray[i].style.left = "0px";
			gearArray[i].style.top = "84px";
		}
	}
}

function positionHandEarly()
{
	for (var i=0; i<gearContainerArray.length; i++)
	{
		if(i % 2 == 0) //first, third, fifth, etc (right hand)
		{
			handAndArmArray[i].style.left = "120px";
		}
		else //left hand
		{
			handAndArmArray[i].style.left = "-149px";
		}
		
		handAndArmArray[i].style.top = "33px";
	}
}

function setAllHandToClose()
{
	for (var i=0; i<gearContainerArray.length; i++)
	{
		//hand close disappear
		handCloseArray[i].style.opacity = 100;
		handCloseArray[i].style.filter = "alpha(opacity=" + 100 + ")";
				
		//hand open appear
		handOpenArray[i].style.opacity = 0;
		handOpenArray[i].style.filter = "alpha(opacity=" + 0 + ")";
	}
}

function setStringGearMaskDiv()
{
	stringGearMaskDiv.style.top = contentThumbnailPaperDiv.offsetTop + "px";
	stringGearMaskDiv.style.height = contentThumbnailPaperDiv.offsetHeight + "px";
}

function positionStringGear()
{
	var distanceGearContainerLeftMostToGearCenter = 218;
	
	for (var i=0; i<stringGearArray.length; i++)
	{
		if (i % 2 == 0) //first, third, fifth, etc
		{
			stringGearArray[i].style.left = "0px";
			stringGearArray[i].style.width = gearContainerArray[i].offsetLeft + distanceGearContainerLeftMostToGearCenter + "px";
		}
		else //second, fourth. sixth, etc
		{
			stringGearArray[i].style.left = gearContainerArray[i].offsetLeft + gearContainerArray[i].offsetWidth - distanceGearContainerLeftMostToGearCenter + "px"; //218 is distance between the gear container left with the axis of the gear
			stringGearArray[i].style.width = (5 * windowWidth) + "px";
		}
		
		stringGearArray[i].style.top = thumbnailPaperContainerArray[i].offsetTop + 6 + "px";
		
	}
}

function degreesToRadians(num)
{
	return (num) * Math.PI / 180;
}

function radiansToDegrees(num)
{
	return (num) / (Math.PI / 180);
}

function createIEMatrixString(M)
{
	return 'M11=' + M.e(1, 1) + ', M12=' + M.e(1,2) + ', M21=' + M.e(2,1) + ', M22=' + M.e(2,2);
}

function rotateElement(e, deg)
{
	deg_str = deg + "";
	rotate_transform = "rotate(" + deg + "deg)";
	matrix_str = createIEMatrixString(Matrix.Rotation(degreesToRadians(deg)));
	filter_str = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " + matrix_str + ")";

	e.style["rotation"] = deg_str + "deg"; // CSS3
	e.style.MozTransform = rotate_transform; // Moz
	e.style.OTransform = rotate_transform; // Opera
	e.style.WebkitTransform = rotate_transform; // Webkit/Safari/Chrome
	e.style.filter = filter_str; // IE 6/7
	e.style.MsFilter = filter_str; // IE 8
	e.style["zoom"] = "1"; // ??? Probably IEs
}