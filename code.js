//PURPOSE: To provide information about the various national parks in the US and allows users to create personal wishlists of parks to visit
//AUTHOR: Sucheta Srikanth

//initialize lists and variables about the park
var nameList = getColumn("US National Parks", "Name");
var imageList = getColumn("US National Parks", "Image");
var locationList = getColumn("US National Parks", "Location");
var estList = getColumn("US National Parks", "Date established");
var acresList = getColumn("US National Parks", "Area in acres");
var descriptionList = getColumn("US National Parks", "Description");
//variables in use
var park;
var wishList = [];
var wishText;


//add "Select a Park Name" or blank to lists
nameList.unshift("Select a Park Name");
imageList.unshift("");
locationList.unshift("");
estList.unshift("");
acresList.unshift("");
descriptionList.unshift("");
//fills dropdowns with National Park names
setProperty("wishlistDrop1", "options", nameList);
setProperty("searchParkDrop", "options", nameList);

//writes actions for all buttons
////NOTE: numbered button ids are derived from intended page order - homeScreen, wishlistScreen, parkInfoScreen, aboutScreen
onEvent("aboutButton1", "click", function( ) {
  setScreen("aboutScreen");
});

onEvent("aboutButton2", "click", function( ){
  setScreen("aboutScreen");
});

onEvent("aboutButton3", "click", function( ){
  setScreen("aboutScreen");
});

onEvent("homeButton1", "click", function( ){
  setScreen("homeScreen");
});

onEvent("homeButton2", "click", function( ){
  setScreen("homeScreen");
});

onEvent("homeButton3", "click", function( ){
  setScreen("homeScreen");
});

onEvent("listButton1", "click", function( ){
  setScreen("wishlistScreen");
  wishlistClear("wishlistScreen");
});

onEvent("listButton2", "click", function( ){
  setScreen("wishlistScreen");
  wishlistClear("wishlistScreen");
});

onEvent("listButton3", "click", function( ){
  setScreen("wishlistScreen");
  wishlistClear("wishlistScreen");
});

//shows pop up asking to see more information or add National Park to wishlist
onEvent("addButton", "click", function( ) {
  showElement("wantInfo");
  showElement("add2");
  showElement("yesInfoButton");
});

//if the user wants to add to wishlist without seeing info, createWishlist and wishlistClear are run
onEvent("add2", "click", function( ){
  createWishlist();
  wishlistClear("wishlistScreen");
});

//when Park Information Button is clicked, all elements on parkInfoScreen are set as void
onEvent("infoButton1", "click", function( ){
  setText("nameText", "");
  setText("estText", "");
  setText("locText", "");
  setText("descText", "");
  setText("areaText", "");
  setProperty("parkPic", "image", "");
  showElement("cover");
  showElement("wishlistDrop1");
  showElement("searchParkDrop");
  setScreen("parkInfoScreen");
});

//if user wants to see more information, screen is changed and information is set based on selected park
onEvent("yesInfoButton", "click", function( ){
  hideElement("searchParkDrop");
  setScreen("parkInfoScreen");
  park = getProperty("wishlistDrop1", "index");
  parkInformation();
});

//using a dropdown, the user can see information about any park without accessing wishlist
onEvent("searchParkDrop", "change", function( ){
  park = getProperty("searchParkDrop", "index");
  parkInformation();
  hideElement("cover");
});

//if the currentScreen is the wishlist, clears the popups from the wishlist and resets the dropdown index
function wishlistClear(currentScreen){
  if(currentScreen == "wishlistScreen"){
    hideElement("wantInfo");
    hideElement("add2");
    hideElement("yesInfoButton");
    setProperty("wishlistDrop1", "index", 0);
  }
}

//fills the boxes in the Park Information Screen
function parkInformation(){
  setText("nameText", nameList[park]);
  setText("estText", estList[park]);
  setText("locText", locationList[park]);
  setText("descText", descriptionList[park]);
  setText("areaText", acresList[park]);
  setProperty("parkPic", "image", imageList[park]);
}

//takes National Park name from the dropdown, checks if the name is in list wishList, adds to list with checkbox
function createWishlist() {
  wishText = getText("wishlistDrop1");
  for(var i = wishList.length - 1; i < wishList.length; i++){
    if(wishList.indexOf(wishText) == -1) {
      appendItem(wishList, wishText);
      checkbox("checkbox"+i, false);
      textLabel("label"+i, wishText, "checkbox"+i);
      setPosition("checkbox"+i, 40, (i*25)+100);    
      setPosition("label"+i, 50, (i*25)+97);
    }
  }
}

