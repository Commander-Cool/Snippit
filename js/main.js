
// ========== jQuery on click declarations
var boxes = 0;
$(function(){
  $(document).on('click','.grab', function(){pasteSelection(this.id)});
});

$(function(){
  $('#addnew').click(function(){addnew();});
});

// ========= Functions

// Get selected text and paste
function pasteSelection(bid) {
  putTitle(bid);
  var text = document.getElementById("data".concat(bid.toString()));
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      if (response.data == null){
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
          text.innerHTML = tabs[0].url;
        });
      }else{
        text.innerHTML = response.data;
      }
    });
  });
  addnew();
}

function putTitle(bid){
  var p1 = document.getElementById("title".concat(bid.toString()));
  console.log("title".concat(bid.toString()));
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    p1.innerHTML = "<b>" + tabs[0].title + "</b>";
  });
}

// Add new paste box
function addnew(){
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
}

function store(bid, value){
  bid = bid.toString();
  value = JSON.stringify(value);
  chrome.storage.local.set({bid: value}, function (result) {
    return;
  }); 
}