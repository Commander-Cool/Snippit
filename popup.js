$(function(){
  $('#paste').click(function(){pasteSelection();});
});
function pasteSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      var text = document.getElementById('text'); 
      text.innerHTML = response.data;
      console.log("clicked");
    });
  });
}


$(function(){
  $('#addnew').click(function(){addnew();});
});
function addnew(){
	var body = document.getElementById('body');
	var textarea = document.createElement('textarea');
	textarea.id = "text";
	var paste = document.createElement('button');
	var text = document.createTextNode("Paste Selection");
	paste.appendChild(text)
	paste.id = "paste";
	body.appendChild(textarea);
	body.appendChild(paste);
}