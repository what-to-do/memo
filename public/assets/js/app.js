$(document).ready(function(){

var categories = ["music", "movies", "recipes"];

for (var i = 0; i < categories.length; i++) {
  var cat_btn = $("<button>");
  cat_btn.text(categories[i]);
  cat_btn.attr({
    "class" : "btn btn-primary",
    "type" : "button",
    "data-toggle" : "collapse",
    "data-target" : "#collapseExample",
    "aria-expanded": false,
    "aria-controls": "collapseExample",
    "data-index" : i
    });
  cat_btn.appendTo(".categories");
};  

  var cat_div = $("<div>");
  cat_div.attr({
    "class" : "col-md-12 collapse",
    "id" : "collapseExample",
    "aria-expanded": false,
  });
  cat_div.text("hello");
  cat_div.appendTo(".content");


$('#myModal').modal({
  keyboard: false
})



});
