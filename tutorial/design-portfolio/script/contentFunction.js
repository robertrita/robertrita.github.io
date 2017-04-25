//INFORMATION CONTAINER, PAPER THUMBNAIL, AND WINDOW THUMBNAIL - FUNCTION AND VARIABLE TOGETHER--------------------------------------------------------------------------------------------------------

getWindowWidthHeight();

window.onscroll = function (e)
{
  	setVerticalPosition();
    
 	scrollThumbnailPaperContainer(); //for thumbnail paper
  
 	slideFrame(); //for thumbnail window
  
 	setVerticalPositionBefore();
}

window.onresize = function (e)
{
	getWindowWidthHeight();
	scrollThumbnailPaperContainer();
	slideFrame();
}

function setVerticalPositionBefore()
{
	verticalPositionBefore = verticalPosition;
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
  //windowWidth = myWidth;
  windowHeight = myHeight;
}