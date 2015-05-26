var boxes = 0;

$(function(){
  $(document).on('click','.grab', function(){setText(this.id)});
});

$(function(){
  $('#addnew').click(function(){addnew(boxes);});
});

function Snippit(id){
	var snippit = Object.create(Snippit.prototype);
	snippit.id = id;
	snippit.title = "<b>Click To Paste</b>"
	snippit.data = "";
	return snippit;
};

Snippit.prototype.setTitle = function (){
	var p1 = document.getElementById("title".concat(Snippit.id));
  	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  		Snippit.title = tabs[0].title;
    	p1.innerHTML = "<b>" + Snippit.title + "</b>";
  	});
};

Snippit.prototype.setText = function (){
  	var text = document.getElementById("data".concat(Snippit.id));
  	chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  	function(tab){
    	chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    	function(response){
      		if (response.data == null){
        		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        		Snippit.data = tabs[0].url;
        	});
      		}else{
      			Snippit.data = response.data;
      		}
    	});
  	});
  	text.innerHTML = Snippit.data;
};

function addNew(Snippit){
	if (id < boxes){
		return;
	}else{
		boxes+=1;
	    var button = document.createElement("BUTTON");
	    button.setAttribute("class","list-group-item grab")
	    button.id = boxes.toString();
	    var p = document.createElement("p");
	    p.setAttribute("class", "list-group-item-heading pull-left data");
	    p.innerHTML = "<b>Click To Paste</b>"
	    p.id = "title".concat(boxes.toString());
	    var p2 = document.createElement("p");
	    p2.setAttribute("class", "list-group-item-text pull-left data");
	    p2.id = "data".concat(boxes.toString());
	    button.appendChild(p);
	    button.appendChild(p2);
	    document.getElementById("snippits").appendChild(button);
	};
};

function store(Snippit){
  var snip = JSON.stringify(getSnippit(bid));
  bid = bid.toString();
  localStorage.setItem(bid, snip);
}