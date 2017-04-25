var preloaderAndStringContainerDiv = document.getElementById("preloaderAndStringContainer");

setPreloaderAndStringContainerToTransparentOrDisplayNone();

function setPreloaderAndStringContainerToTransparentOrDisplayNone()
{
	if ((browserName == "internet explorer") && (browserVersion <= 8))
	{
		preloaderAndStringContainerDiv.setAttribute("class", "displayNone");
		//alert("preloaderAndStringContainerDiv displayNone");
	}
	else
	{
		preloaderAndStringContainerDiv.setAttribute("class", "transparent");
		//alert("preloaderAndStringContainerDiv transparent");
	}
}