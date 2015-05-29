var boxes = 0;
var snippits = {};

$('button').click(function() {
	addNew(this.id);
});

$(document).ready(function() {
  addNew(boxes);
});

function Snippit(bid){
	this.bid = bid;
};

Snippit.prototype = {
	title: "<b>Click To Paste</b>",
	setTitle: function() {
		// var p1 = document.getElementById("title".concat(this.bid));
  		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  			return tabs[0].title;
    		// p1.innerHTML = "<b>" + this.title + "</b>";
  		});
  		this.title = y;
	},

	content: "",
	setContent: function() {
		var text = document.getElementById("data".concat(this.bid));
  		chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  		function(tab){
    		chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    			function(response){
      				if (response.data == null){
        				chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        					this.content = tabs[0].url;
        				});
      				}else{
      					this.content = response.data;
      				}
    			});
  			});
  		// text.innerHTML = this.content;
	} 
}
