var boxes = 0;
var snippits = {};

$(function(){
  $(document).on('click','.grab', function(){setText(this.id)});
});

$(function(){
  $('#addnew').click(function(){addnew();});
});

function Snippit(id){
	document.getElementById("snippits").appendChild(button);
	var snippit   = Object.create(Snippit.prototype);
	snippit.title = "<b>Click To Paste</b>"
	snippit.data  = "";
	snippit.id 	  = id;
	return snippit;
};

Snippit.prototype.setTitle = function (){
	var p1 = document.getElementById("title".concat(this.id));
  	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  		this.title = tabs[0].title;
    	p1.innerHTML = "<b>" + this.title + "</b>";
  	});
  	setText();
};

Snippit.prototype.setText = function (){
  	var text = document.getElementById("data".concat(this.id));
  	chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  	function(tab){
    	chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    	function(response){
      		if (response.data == null){
        		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        		this.data = tabs[0].url;
        	});
      		}else{
      			this.data = response.data;
      		}
    	});
  	});
  	text.innerHTML = this.data;
};

function createButton(snippit){
	var button = document.createElement("BUTTON");
    button.setAttribute("class","list-group-item grab")
    button.id = snippit.id.toString();
    var p = document.createElement("p");
    p.setAttribute("class", "list-group-item-heading pull-left data");
    p.innerHTML = snippit.title;
    p.id = "title".concat(snippit.id.toString());
    var p2 = document.createElement("p");
    p2.setAttribute("class", "list-group-item-text pull-left data");
    p2.id = "data".concat(snippit.id.toString());
    button.appendChild(p);
    button.appendChild(p2);
};

function addNew(id){
	if (id < boxes){
		return;
	}else{
		boxes+=1;
		snippits[boxes] = new Snippit(boxes);
	};
};

function store(Snippit){
  var snip = JSON.stringify(getSnippit(bid));
  bid = bid.toString();
  localStorage.setItem(bid, snip);
}