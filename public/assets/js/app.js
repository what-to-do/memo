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
  cat_div.text("This is test text.Blah blah blah");
  cat_div.appendTo(".content");


    viewing();


    function crud(){


      $(".del").on("click" , function(event){
      
        console.log("obj");
        var user_delete = $(this).data("index");

        console.log(user_delete);

        $.post("/api/delete" , {user_delete: user_delete}).
        done(function(data){

          viewing();

        });

      });


      // Question: What does this code do?
      $("#add-button").on("click", function(event) {
        event.preventDefault();

        var new_category = {

          snippet: $("#snippet").val().trim(),
          category: $("#category").val().trim(),
          urgency: $("input[name='group1']:checked").val()
      

        };

        console.log(new_category);

        // Question: What does this code do??
        $.post("/api/add", new_category)
        .done(function(data) {
          console.log(data);

          viewing();

        });
      });


    }

    
    function viewing(){

      $.get("/api/view", function(data) {
          console.log(data);
          console.log("hello");
          $("#content").html("");

          var table = $("<table>");

          table.addClass("table");

          table.appendTo("#content");

          var thead = $("<thead>");

          thead.appendTo(table);

          var tr = $("<tr>");

          tr.appendTo(thead);

          var heading = ["#","Created","Snippet","Category" , "Urgency","Actions"];

          for (let i = 0; i < heading.length; i++) {
            
            var th = $("<th>");

            th.text(heading[i]);

            th.appendTo(tr);

          } // End of For Loop I
          
          var tbody = $("<tbody>");

          tbody.appendTo(table);

          for (let i = 0; i < data.length; i++) {

            var tr2 = $("<tr>");

            tr2.appendTo(tbody);
            
            let th = $("<th>");

            th.attr({
              "scope": i + 1
            });

            th.text(i);

            th.appendTo(tr2);



            let td_created = $("<td>");

            td_created.text(data[i].createdAt);

            td_created.appendTo(tr2);


            let td_snippet = $("<td>");

            td_snippet.text(data[i].snippet);

            td_snippet.appendTo(tr2)



            let td_category = $("<td>");

            td_category.text(data[i].Category.category);

            td_category.appendTo(tr2);




            let td_import = $("<td>");

            td_import.text(data[i].importance);

            td_import.appendTo(tr2);



            let td_action = $("<td>");

            td_action.appendTo(tr2);


            var a_edit = $("<a>");

            var i_edit = $("<i>");

            a_edit.attr({

              "class": "teal-text edit",
                        "data-index": data[i].id

            });

            i_edit.attr({

              "class" : "fa fa-pencil"

            });

            var a_delete = $("<a>");

            var i_delete = $("<i>");

            a_delete.attr({

              "class": "red-text del",
                        "data-index": data[i].id

            });

            i_delete.attr({

              "class" : "fa fa-times"

            });

            a_edit.appendTo(td_action);
            i_edit.appendTo(a_edit);


            a_delete.appendTo(td_action);
            i_delete.appendTo(a_delete);

          } // End of For Loop I
          

       // End of For Loop I
          crud();

        });

      

     }
});
  