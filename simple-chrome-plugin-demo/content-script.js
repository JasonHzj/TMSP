
chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === "copy") {
	  var ctrl = document.cookie;
	 
      if (ctrl.length > 0) {
		if (sendResponse) sendResponse(ctrl);
		 console.log(ctrl)
      } else {
        alert("No data");
      }
    } else if (request.action === "paste") {
      var ctrl = $("#input");
      if (ctrl !== null) {
		ctrl.val(request.data);
        sendResponse("OK");
      } else {
        alert("No data");
      }
	}
	  console.log(request.action)
  }
);