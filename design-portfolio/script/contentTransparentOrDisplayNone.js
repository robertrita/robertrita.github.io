var contentDiv = document.getElementById("content");

setContentToTransparentOrDisplayNone();

function setContentToTransparentOrDisplayNone()
{
	if ((browserName == "internet explorer") && (browserVersion <= 8))
	{
		contentDiv.setAttribute("class", "displayNone");
		//alert("contentDiv displayNone");
	}
	else
	{
		contentDiv.setAttribute("class", "transparent");
		//alert("contentDiv transparent");
	}
}