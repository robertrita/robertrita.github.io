getWindowWidthHeight();

var preloaderDiv = document.getElementById("preloader");
var preloaderStringLeftDiv = document.getElementById("preloaderStringLeft");
var preloaderStringRightDiv = document.getElementById("preloaderStringRight");
var preloaderDotAnimationDiv = document.getElementById("preloaderDotAnimation");
var preloaderDotStaticDiv = document.getElementById("preloaderDotStatic");

showPreloader();

function getWindowWidthHeight()
{
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  windowWidth = myWidth;
  windowHeight = myHeight;
}

function hidePreloader() //called in header.js
{
	preloaderAndStringContainerDiv.setAttribute("class", "displayNone");
}

function showPreloader()
{
	preloaderAndStringContainerDiv.setAttribute("class", "");
}

function hidePreloaderDotAnimation()
{
	preloaderDotAnimationDiv.style.opacity = 0;
	preloaderDotAnimationDiv.style.filter = "alpha(opacity=" + 0 + ")";
}

function showPreloaderDotStatic()
{
	preloaderDotStaticDiv.style.opacity = 1;
	preloaderDotStaticDiv.style.filter = "alpha(opacity=" + 100 + ")";
}

function turnOffPreloaderDotAnimation() //called in header.js
{
	showPreloaderDotStatic();
	hidePreloaderDotAnimation();
}