var footerDiv = document.getElementById("footer");
var buttonGoUpDiv = document.getElementById("buttonGoUp");
var groundCenterAreaDiv = document.getElementById("groundCenterArea");
var grassCenterAreaDiv = document.getElementById("grassCenterArea");

var textPleaseFillDiv = document.getElementById("textPleaseFill");
var textSendingMessageDiv = document.getElementById("textSendingMessage"); 
var textMessageSentDiv = document.getElementById("textMessageSent"); 
var textMessageWrongDiv = document.getElementById("textMessageWrong");
var textValidEmailDiv = document.getElementById("textValidEmail");

var speakBubbleMonkeyDiv = document.getElementById("speakBubbleMonkey");
var speakBubbleMonkeyBackDiv = document.getElementById("speakBubbleMonkeyBack");
var speakBubbleMonkeyTriangleDiv = document.getElementById("speakBubbleMonkeyTriangle");
var speakBubbleMonkeyTextDiv = document.getElementById("speakBubbleMonkeyText");
var speakBubbleMonkeyTextThankYouDiv = document.getElementById("speakBubbleMonkeyTextThankYou");

var mailDiv = document.getElementById("mail");
var subjectDiv = document.getElementById("subject");
var textDiv = document.getElementById("text");

function initVariableAndFunctionInFooterJs()
{
	positionFormAndMonkey();
	positionButtonGoUp();
}

hideEmailStatusTextAndSpeakBubbleMonkey();
positionSpeakBubbleMonkey();

function positionButtonGoUp()
{
	buttonGoUpDiv.style.left = (0.5 * windowWidth) - 780 + "px";
}

function buttonGoUpPressed()
{
	$.scrollTo("#header", 800 );
}

function hideAllEmailStatusText() //called from this js and email.js
{
	textPleaseFillDiv.style.opacity = 0;
	textPleaseFillDiv.style.filter = "alpha(opacity=" + 0 + ")";
	
	textSendingMessageDiv.style.opacity = 0;
	textSendingMessageDiv.style.filter = "alpha(opacity=" + 0 + ")";
	
	textMessageSentDiv.style.opacity = 0;
	textMessageSentDiv.style.filter = "alpha(opacity=" + 0 + ")";
	
	textMessageWrongDiv.style.opacity = 0;
	textMessageWrongDiv.style.filter = "alpha(opacity=" + 0 + ")";
	
	textValidEmailDiv.style.opacity = 0;
	textValidEmailDiv.style.filter = "alpha(opacity=" + 0 + ")";
}

function hideEmailStatusTextAndSpeakBubbleMonkey() //called from this js and index.html
{
	hideAllEmailStatusText();
	hideSpeakBubbleMonkey();
}

function showTextPleaseFillDiv() //called from email.js
{
	textPleaseFillDiv.style.opacity = 1;
	textPleaseFillDiv.style.filter = "alpha(opacity=" + 100 + ")";
}

function showTextSendingMessageDiv() //called from email.js
{
	textSendingMessageDiv.style.opacity = 1;
	textSendingMessageDiv.style.filter = "alpha(opacity=" + 100 + ")";
}

function showTextMessageSentDiv() //called from email.js
{
	textMessageSentDiv.style.opacity = 1;
	textMessageSentDiv.style.filter = "alpha(opacity=" + 100 + ")";
}

function showTextMessageWrongDiv() //called from email.js
{
	textMessageWrongDiv.style.opacity = 1;
	textMessageWrongDiv.style.filter = "alpha(opacity=" + 100 + ")";
}

function showTextValidEmailDiv() //called from email.js
{
	textValidEmailDiv.style.opacity = 1;
	textValidEmailDiv.style.filter = "alpha(opacity=" + 100 + ")";
}

function clearAllInputField() //called from email.js and index.html
{
	for (var i=0; i<document.forms["formail"].elements.length; i++)
	{
		document.forms["formail"].elements[i].value = "";
	}
}

function positionSpeakBubbleMonkey()
{
	speakBubbleMonkeyDiv.style.left = ((0.5 * windowWidth) + 185) + "px";
}

function hideSpeakBubbleMonkey()
{
	speakBubbleMonkeyBackDiv.style.opacity = 0;
	speakBubbleMonkeyBackDiv.style.filter = "alpha(opacity=" + 0 + ")";
	speakBubbleMonkeyTriangleDiv.style.opacity = 0;
	speakBubbleMonkeyTriangleDiv.style.filter = "alpha(opacity=" + 0 + ")";
	speakBubbleMonkeyTextDiv.style.opacity = 0;
	speakBubbleMonkeyTextDiv.style.filter = "alpha(opacity=" + 0 + ")";
	speakBubbleMonkeyTextThankYouDiv.style.opacity = 0;
	speakBubbleMonkeyTextThankYouDiv.style.filter = "alpha(opacity=" + 0 + ")";
}

function showSpeakBubbleMonkey()
{
	speakBubbleMonkeyBackDiv.style.opacity = 1;
	speakBubbleMonkeyBackDiv.style.filter = "alpha(opacity=" + 100 + ")";
	speakBubbleMonkeyTriangleDiv.style.opacity = 1;
	speakBubbleMonkeyTriangleDiv.style.filter = "alpha(opacity=" + 100 + ")";
	speakBubbleMonkeyTextDiv.style.opacity = 1;
	speakBubbleMonkeyTextDiv.style.filter = "alpha(opacity=" + 100 + ")";
	speakBubbleMonkeyTextThankYouDiv.style.opacity = 1;
	speakBubbleMonkeyTextThankYouDiv.style.filter = "alpha(opacity=" + 100 + ")";
}

function checkSpeakBubbleMonkey()
{
	if (verticalPosition < footerDiv.offsetTop - windowHeight)
	{
		hideEmailStatusTextAndSpeakBubbleMonkey();
	}
}

function positionFormAndMonkey()
{
	groundCenterAreaDiv.style.left = (0.5 * (windowWidth - groundCenterAreaDiv.offsetWidth)) + "px";
	grassCenterAreaDiv.style.left = (0.5 * (windowWidth - grassCenterAreaDiv.offsetWidth)) + "px";
}

function focusEmail() //called from email.js
{
	mailDiv.focus();
}

function focusSubject() //called from email.js
{
	subjectDiv.focus();
}

function focusMessage() //called from email.js
{
	textDiv.focus();
}