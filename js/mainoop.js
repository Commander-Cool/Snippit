var boxes = 0;
var snippits = {};

$(document).ready(function() {
  if (localStorage.getItem(0) == null){
    addNew(boxes);
  }else{
    var snip = JSON.parse(localStorage.getItem(boxes));
    snip = new Snippit(boxes)
    snip
  }
});

$(function(){
  $(document).on('click','.grab',
    function(){
      set(snippits[this.id]);
    }
  );
});

function Snippit(bid){
	var snippit = Object.create(Snippit.prototype);
	snippit.title = "<b>Click To Paste</b>"
	snippit.content = "";
	snippit.bid = bid;
	return snippit;
};

Snippit.prototype.setTitle = function (status){
  var p1 = document.getElementById("title".concat(this.bid));
  if (status){
    
  }
  else{
    var callback = function(tabs) {
      this.title = tabs[0].title;
      p1.innerHTML = "<b>" + this.title + "</b>";
    }
    chrome.tabs.query({currentWindow: true, active: true}, callback.bind(this));
    }
};

Snippit.prototype.setText = function (status){
  var text = document.getElementById("data".concat(this.bid));
  var self = this;
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
  function(tab){
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
    function(response){
      if (response.data == null){
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        self.content = tabs[0].url;
        text.innerHTML = self.content;
      });
      }else{
      	self.content = response.data;
        text.innerHTML = self.content;
      }
    });
  });
};

function createButton(snippit){
	var button = document.createElement("BUTTON");
  button.setAttribute("class","list-group-item grab")
  button.id = boxes;
  var p = document.createElement("p");
  p.setAttribute("class", "list-group-item-heading pull-left data");
  p.innerHTML = snippit.title;
  p.id = "title".concat(snippit.bid.toString());
  var p2 = document.createElement("p");
  p2.setAttribute("class", "list-group-item-text pull-left data");
  p2.id = "data".concat(snippit.bid.toString());
  button.appendChild(p);
  button.appendChild(p2);
  document.getElementById("snippits").appendChild(button);
};

function addNew(id){
	if (id < boxes){
		return;
	}else{
		snippits[boxes] = new Snippit(boxes);
		createButton(snippits[boxes]);
		boxes+=1;
	};
};

function set(snippit){
  snippit.setTitle();
  snippit.setText();
  addNew(snippit.bid + 1);
  window.setTimeout(function(){store(snippit);}, 1000) //15
}

function store(snippit){
  localStorage.setItem(snippit.bid, JSON.stringify(snippit));
}
