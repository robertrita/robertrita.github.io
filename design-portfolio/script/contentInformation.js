//INFORMATION CONTAINER FUNCTION AND VARIABLE---------------------------------------------------------------------------------------------------------------------------------------------------------------------

var contentInformationContainer1Div = document.getElementById("contentInformationContainer1");
var contentInformationContainer2Div = document.getElementById("contentInformationContainer2");
var informationContainer1Div = document.getElementById("informationContainer1");
var informationContainer2Div = document.getElementById("informationContainer2");

var textClient1Div = document.getElementById("textClient1");
var textType1Div = document.getElementById("textType1");
var textWork1Div = document.getElementById("textWork1");
var speakBubbleBack1Div = document.getElementById("speakBubbleBack1");
var speakBubble1Div = document.getElementById("speakBubble1");
var speakBubbleTriangle1Div = document.getElementById("speakBubbleTriangle1");
var bee1Div = document.getElementById("bee1");

var textClient2Div = document.getElementById("textClient2");
var textType2Div = document.getElementById("textType2");
var textWork2Div = document.getElementById("textWork2");
var speakBubbleBack2Div = document.getElementById("speakBubbleBack2");
var speakBubble2Div = document.getElementById("speakBubble2");
var speakBubbleTriangle2Div = document.getElementById("speakBubbleTriangle2");
var bee2Div = document.getElementById("bee2");

var speakBubbleHorizontalPadding = 20;
var informationContainerDistanceToDesignContainer = 10;
var spanOpen = "<span>";
var spanClose = "</span>";

function initVariableAndFunctionInContentInformationJs() //called from header.js
{
	contentInformationContainer1Div.style.top = designContainer1Div.offsetTop + "px";
	hideInformationContainer1Div(); //hide outside the viewable window
	
	setText(textClient1Div, textType1Div, textWork1Div, "", "", "");
	setSpeakBubbleBackWidth(speakBubbleBack1Div, speakBubbleTriangle1Div, speakBubble1Div, textClient1Div, textType1Div, textWork1Div);
	
	contentInformationContainer2Div.style.top = designContainer2Div.offsetTop;
	hideInformationContainer2Div(); //shift hideInformationContainer2Div outside viewable window
	
	setText(textClient2Div, textType2Div, textWork2Div, "", "", "");
	setSpeakBubbleBackWidth(speakBubbleBack2Div, speakBubbleTriangle2Div, speakBubble2Div, textClient2Div, textType2Div, textWork2Div);
}

function hideInformationContainer1Div()
{
	informationContainer1Div.style.left = windowWidth + "px";
	hideSpeakBubble1();
	hideBee1();
}

function hideInformationContainer2Div()
{
	informationContainer2Div.style.left = (-1 * informationContainer2Div.offsetWidth) + "px";
	hideSpeakBubble2();
	hideBee2();
}

function hideBee1()
{
	bee1Div.style.opacity = 0;
	bee1Div.style.filter = "alpha(opacity=" + 0 + ")";
}

function hideBee2()
{
	bee2Div.style.opacity = 0;
	bee2Div.style.filter = "alpha(opacity=" + 0 + ")";
}

function showBee1()
{
	bee1Div.style.opacity = 1;
	bee1Div.style.filter = "alpha(opacity=" + 100 + ")";
}

function showBee2()
{
	bee2Div.style.opacity = 1;
	bee2Div.style.filter = "alpha(opacity=" + 100 + ")";
}

function shiftInformationContainer1X()
{
	showBee1();
	$("#informationContainer1").animate({left: setInformationContainer1ShowX()}, 300, function() {showSpeakBubble1()});
}

function shiftInformationContainer2X()
{
	showBee2();
	$("#informationContainer2").animate({left: setInformationContainer2ShowX()}, 300, function() {showSpeakBubble2()});
}

function setInformationContainer1ShowX()
{
	return designContainer1Div.offsetLeft + designContainer1Div.offsetWidth + informationContainerDistanceToDesignContainer;
}

function setInformationContainer2ShowX()
{
	return designContainer2Div.offsetLeft - informationContainer2Div.offsetWidth - informationContainerDistanceToDesignContainer;
}

function setText(textClientDiv, textTypeDiv, textWorkDiv, textClientString, textTypeString, textWorkString)
{
	if (textClientDiv == textClient1Div)
	{
		expandSpeakBubble(speakBubble1Div); //expand speak bubble first, otherwise it will cut the text if the text is longer
	}
	if (textClientDiv == textClient2Div)
	{
		expandSpeakBubble(speakBubble2Div); //expand speak bubble first, otherwise it will cut the text if the text is longer
	}
	
	textClientDiv.innerHTML = spanOpen + textClientString + spanClose;
	textTypeDiv.innerHTML = spanOpen + textTypeString + spanClose;
	textWorkDiv.innerHTML = spanOpen + textWorkString + spanClose;
}

function setSpeakBubbleBackWidth(speakBubbleBackDiv, speakBubbleTriangleDiv, speakBubbleDiv, textClientDiv, textTypeDiv, textWorkDiv)
{
	speakBubbleBackDiv.style.width = textClient1Div.offsetLeft + theLongestText(textClientDiv, textTypeDiv, textWorkDiv) + speakBubbleHorizontalPadding + "px";
	
	speakBubbleTriangleDiv.style.left = 0.5 * (speakBubbleBackDiv.offsetWidth - speakBubbleTriangleDiv.offsetWidth) + "px";
	speakBubbleTriangleDiv.style.top = "140px";
	
	speakBubbleDiv.style.width = speakBubbleBackDiv.offsetWidth + "px";
	speakBubbleDiv.style.height = speakBubbleBackDiv.offsetHeight + "px";
}

function theLongestText(textClientDiv, textTypeDiv, textWorkDiv)
{
	var theLongestText = 0;
	
	var textDivArray = new Array();
	textDivArray.push(textClientDiv, textTypeDiv, textWorkDiv);
	
	for (var i=0; i<textDivArray.length; i++)
	{
		if (textDivArray[i].offsetWidth > theLongestText)
		{
			theLongestText = textDivArray[i].offsetWidth;
		}
	}
	
	return theLongestText;
}

function expandSpeakBubble(speakBubbleDiv)
{
	speakBubbleDiv.style.width = "285px";
	speakBubbleDiv.style.height = "160px";
}

function changeInformationText(thumbnailFileName, informationContainerDiv)
{
	var speakBubbleTextClient;
	var speakBubbleTextType;
	var speakBubbleTextWork;
	
	switch (thumbnailFileName)
	{
		case "thmAnmSwf2m2mm.jpg":
			speakBubbleTextClient = "G4";
			speakBubbleTextType = "Banner Ad";
			speakBubbleTextWork = "Design & Animation";
			break;
		case "thmAnmSwfBullrun.jpg":
			speakBubbleTextClient = "SPEED TV";
			speakBubbleTextType = "Banner Ad";
			speakBubbleTextWork = "Concept, Design, & Animation";
			break;
		case "thmAnmSwfHaier.jpg":
			speakBubbleTextClient = "Haier";
			speakBubbleTextType = "Website Animation";
			speakBubbleTextWork = "Concept, Design, & Animation";
			break;
		case "thmAnmSwfIncognito.jpg":
			speakBubbleTextClient = "Incognito Digital";
			speakBubbleTextType = "Website Animation";
			speakBubbleTextWork = "Concept, Design, & Animation";
			break;
		case "thmAnmSwfNiptuck.jpg":
			speakBubbleTextClient = "FX Networks";
			speakBubbleTextType = "Rich Media";
			speakBubbleTextWork = "Design & Development";
			break;
		case "thmAnmSwfShield.jpg":
			speakBubbleTextClient = "FX Networks";
			speakBubbleTextType = "Banner Ad";
			speakBubbleTextWork = "Design & Animation";
			break;
		case "thmAnmSwfSoa.jpg":
			speakBubbleTextClient = "FX Networks";
			speakBubbleTextType = "Rich Media";
			speakBubbleTextWork = "Design & Development";
			break;
		case "thmAnmSwfSunny.jpg":
			speakBubbleTextClient = "FX Networks";
			speakBubbleTextType = "Rich Media";
			speakBubbleTextWork = "Design & Development";
			break;
		case "thmAnmSwfTestees.jpg":
			speakBubbleTextClient = "FX Networks";
			speakBubbleTextType = "Banner Ad";
			speakBubbleTextWork = "Design & Animation";
			break;
		case "thmAnmSwfWwe.jpg":
			speakBubbleTextClient = "MyNetworkTV";
			speakBubbleTextType = "Banner Ad";
			speakBubbleTextWork = "Design & Animation";
			break;
		case "thmGraJpgDisease.jpg":
			speakBubbleTextClient = "SPEED TV";
			speakBubbleTextType = "Microsite";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgElderlife.jpg":
			speakBubbleTextClient = "Elderlife Financial";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgEltesoro.jpg":
			speakBubbleTextClient = "El Tesoro";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgFoxnewssunday.jpg":
			speakBubbleTextClient = "Fox News";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgHairclub.jpg":
			speakBubbleTextClient = "Hair Club for Man";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgKellyfile.jpg":
			speakBubbleTextClient = "Fox News";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgKinect.jpg":
			speakBubbleTextClient = "Fox News";
			speakBubbleTextType = "Xbox Kinect App";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgMakingmoney.jpg":
			speakBubbleTextClient = "Fox News";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgNiptuck.jpg":
			speakBubbleTextClient = "FX Networks";
			speakBubbleTextType = "Rich Media Ad";
			speakBubbleTextWork = "Design & Development";
			break;
		case "thmGraJpgPao.jpg":
			speakBubbleTextClient = "SPEED TV";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgRedeye.jpg":
			speakBubbleTextClient = "Fox News";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgSkyy.jpg":
			speakBubbleTextClient = "Skyy Vodka";
			speakBubbleTextType = "Microsite";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgWrecked.jpg":
			speakBubbleTextClient = "SPEED TV";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgWarstories.jpg":
			speakBubbleTextClient = "Fox News";
			speakBubbleTextType = "Website";
			speakBubbleTextWork = "Concept & Design";
			break;
		case "thmGraJpgWp7.jpg":
			speakBubbleTextClient = "Fox News";
			speakBubbleTextType = "Mobile App";
			speakBubbleTextWork = "Concept & Design";
			break;
		default:
  			speakBubbleTextClient = "";
			speakBubbleTextType = "";
			speakBubbleTextWork = "";
	}
	
	if (informationContainerDiv == informationContainer1Div)
	{
		setText(textClient1Div, textType1Div, textWork1Div, speakBubbleTextClient, speakBubbleTextType, speakBubbleTextWork);
		setSpeakBubbleBackWidth(speakBubbleBack1Div, speakBubbleTriangle1Div, speakBubble1Div, textClient1Div, textType1Div, textWork1Div);
	}
	
	if (informationContainerDiv == informationContainer2Div)
	{
		setText(textClient2Div, textType2Div, textWork2Div, speakBubbleTextClient, speakBubbleTextType, speakBubbleTextWork);
		setSpeakBubbleBackWidth(speakBubbleBack2Div, speakBubbleTriangle2Div, speakBubble2Div, textClient2Div, textType2Div, textWork2Div);
	}
}

function hideSpeakBubble1()
{
	speakBubble1Div.style.opacity = 0;
	speakBubble1Div.style.filter = "alpha(opacity=" + 0 + ")";
}

function hideSpeakBubble2()
{
	speakBubble2Div.style.opacity = 0;
	speakBubble2Div.style.filter = "alpha(opacity=" + 0 + ")";
}

function showSpeakBubble1()
{
	speakBubble1Div.style.opacity = 1;
	speakBubble1Div.style.filter = "alpha(opacity=" + 100 + ")";
}

function showSpeakBubble2()
{
	speakBubble2Div.style.opacity = 1;
	speakBubble2Div.style.filter = "alpha(opacity=" + 100 + ")";
}

function shiftInformationContainer1Y()
{
	if ((verticalPosition + (0.5 * windowHeight) > designContainer1Div.offsetTop + designContainer1Div.offsetHeight - informationContainer1Div.offsetHeight) && (designContainer1Div.offsetHeight > informationContainer1Div.offsetHeight))
	{
		contentInformationContainer1Div.style.top = designContainer1Div.offsetTop + designContainer1Div.offsetHeight - informationContainer1Div.offsetHeight + "px";
	}
	else if ((verticalPosition + (0.5 * windowHeight) < designContainer1Div.offsetTop) || (designContainer1Div.offsetHeight <= informationContainer1Div.offsetHeight))
	{
		contentInformationContainer1Div.style.top = designContainer1Div.offsetTop + "px";
	}
	else
	{
		contentInformationContainer1Div.style.top = verticalPosition + (0.5 * windowHeight) + "px";
	}
}

function shiftInformationContainer2Y()
{
	if ((verticalPosition + (0.5 * windowHeight) > designContainer2Div.offsetTop + designContainer2Div.offsetHeight - informationContainer2Div.offsetHeight) && (designContainer2Div.offsetHeight > informationContainer2Div.offsetHeight))
	{
		contentInformationContainer2Div.style.top = designContainer2Div.offsetTop + designContainer2Div.offsetHeight - informationContainer2Div.offsetHeight + "px";
	}
	else if ((verticalPosition + (0.5 * windowHeight) < designContainer2Div.offsetTop) || (designContainer2Div.offsetHeight <= informationContainer2Div.offsetHeight))
	{
		contentInformationContainer2Div.style.top = designContainer2Div.offsetTop + "px";
	}
	else
	{
		contentInformationContainer2Div.style.top = verticalPosition + (0.5 * windowHeight) + "px";
	}
}

function resetInformationContainerVerticalPositionAfterDesignContainerAppear()
{
	setVerticalPosition();
	shiftInformationContainer1Y(verticalPosition);
	shiftInformationContainer2Y(verticalPosition);
}

function resizeContentInformation()
{
	if (isDesignContainer1Open == true)
	{
		informationContainer1Div.style.left = setInformationContainer1ShowX() + "px";
	}
	if (isDesignContainer1Open == false)
	{
		hideInformationContainer1Div();
	}
	
	if (isDesignContainer2Open == true)
	{
		informationContainer2Div.style.left = setInformationContainer2ShowX() + "px";
	}
	if (isDesignContainer2Open == false)
	{
		hideInformationContainer2Div();
	}
}