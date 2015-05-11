var text = "";
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection"){
  	text = window.getSelection().toString();
    sendResponse({data: window.getSelection().toString()});
  }
  if (text.length == 0){
  	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    	console.log(tabs[0].url);
    	text = tabs[0].url.toString();
	});
  	sendResponse({data:text.concat(" --URL")});
  }else
  	sendResponse({data: text});
});