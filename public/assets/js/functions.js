$(document).ready(function(){

function making_cat_buttons() {
  $.get("/api/categories" , function(data){
    for (let i = 0; i < data.length; i++) {
      var cat_btn = $("<button>");
      cat_btn.text(data[i].category);
      cat_btn.attr({
        "class" : "btn btn-primary category_buttons",
        "type" : "button",
        "data-toggle" : "collapse",
        "data-target" : "#collapseExample",
        "aria-expanded": false,
        "aria-controls": "collapseExample",
        "data-index" : data[i].id
        });
      cat_btn.appendTo(".categories");
    };

      for (let i = 0; i < data.length; i++) {
        var dropdown_cat = $('<option>');
        dropdown_cat.text(data[i].category);
        dropdown_cat.attr({
          "value" : data[i].id
        });
        dropdown_cat.appendTo('#selected_category');

      };
  });
}


}