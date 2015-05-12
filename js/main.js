
// ========== jQuery on click declarations
$(function(){
  $('.grab').click(function(){pasteSelection();});
});

$(function(){
  $('#addnew').click(function(){addnew();});
});

$(document).ready(function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    document.getElementById('title').innerHTML = tabs[0].title;
  });
});

// ========= Functions

// Get selected text and paste
function pasteSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      var text = document.getElementById('data');
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

// Add new paste box
function addnew(){ 
  document.getElementById("paste").setAttribute("class", "list-group-item grab data");

  var button = document.createElement("BUTTON");
  button.setAttribute("class","list-group-item active grab data")
  var p = document.createElement("p");
  p.setAttribute("class", "list-group-item-heading pull-left data");
  p.innerHTML = "Website Title"
  var p2 = document.createElement("p");
  p2.setAttribute("class", "list-group-item-text pull-left data");
  p2.innerHTML = "Paste Data"
  button.appendChild(p);
  button.appendChild(p2);
  document.getElementById("snippits").appendChild(button);
  // document.getElementById("snippits").appendChild(button);
}