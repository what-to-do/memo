$(document).ready(function(){
  var status = 0;
  var arrow_direction = "ASC"

  view_all();
  making_cat_buttons()

  //When clicking on specific categories, this will only show the selected category
  $(".categories").on('click', '.category_buttons', function(){
    var category_id = $(this).data('index');
    if(category_id == 0){
      view_all();
      } else {
      //console.log(category_id);
      view_category(category_id);
    }     
  }); 

  //When arrow key is press, located on the table header, it will sort ASC to DESC
  $('.content').on('click', '.sort', function(){
    var column = $(this).data("index");
    $.get("/api/sort/" + arrow_direction + '/' + column , function(data) {
      render_view(data); 
    }); 
    //console.log(arrow_direction);
      if (arrow_direction == "DESC"){
        console.log("check");
        arrow_direction = "ASC";
      } else {
        arrow_direction = "DESC"
      }
    }); //end of SORTING onclick handler

  // Create New Category
  $('.this_is_submit').on('click', '#create_new_cat_button',function(){

    var created_cat = {
      category: $('#category_modal').val().trim()
    };

    $.post('/api/add/category', created_cat).
    done(function(data){
    //console.log(data);
      //creates category button and adds it to database
      var cat_btn = $("<button>");
      cat_btn.text(data.category);

      cat_btn.attr({
      "class" : "fill btn category_buttons",
      "type" : "button",
      "data-toggle" : "collapse",
      "data-target" : "#collapseExample",
      "aria-expanded": false,
      "aria-controls": "collapseExample",
      "data-index" : data.id
      });

      cat_btn.appendTo(".categories");

      //takes the category db and appends a dropdown of categories to snippet modal
      var dropdown_cat = $('<option>');
      dropdown_cat.text(data.category);
      dropdown_cat.attr({
        "value" : data.id
      });
      dropdown_cat.appendTo('#selected_category');
    });
    //empties out modal
    $('input').val('');
  });

// --------------------------------- CRUD ------------------------------------
// ---------------------------------------------------------------------------
  // Adding a new snippet
  $(".modal-footer").on("click", ".submit" , function(event) {

    var new_category = {
      snippet: $("#snippet_modal").val().trim(),
      category: $("#selected_category :selected").val(),
      urgency: $("input[name='group1']:checked").val()
    };

    //empties out modal
    $('input').val('');

    $.post("/api/add/snippet", new_category)
    .done(function(data) {
      //console.log(data);
    });
      if(status == 0){
        view_all();
      } else{
        view_category(status);
      }
  });

  //EMAIL SNIPPET
  /*When the user clicks on the email button it will grab the 
  index number of the snippet selected then provide the data
  of this snippet so it can be sent in an email*/
  $("#content").on("click", ".email", function(event){
    var user = $(this).data("index");
    var message = $(this).parent().parent().find(".snippet_td").text();

    $("#email-btn").on("click", function(){
      var email = {
        //snippet_id: user,
        message: message,
        recipient: $("#email").val().trim(),
        title: "Your Requested Snippet"
      };
      var recipient = $("#email").val().trim();
      //Jeff route here like below

      $.post("/api/email", email).
      done(function(data){
       
      });
    });
  });

  //Edit snippet
  $("#content").on("click" , ".edit" , function(event){
    var user = $(this).data("index");

    $("#edit-btn").on("click", function(){
      var edited_category = {
        snippet_id: user,
        snippet: $("#snippet_edit").val().trim(),
        urgency: $("input[name='group2']:checked").val()
      };

      $.post("/api/edit", edited_category).
      done(function(data){
       
      });

      if(status === 0){
        view_all();
      } else {
        view_category(status);
      }
    });
  });


  //Delete snippet
  $("#content").on("click" , ".del" , function(event){
    
    var user_delete = $(this).data("index");
    console.log(user_delete);

    $.post("/api/delete" , {user_delete: user_delete}).
    done(function(data){

    });
    /*if status === 0 that means the user is currently viewing all snippets.  If 
    status === a number it means they are viewing by category and will show the 
    appropriate category*/
      if(status == 0){
        view_all();
      } else {
        view_category(status);
      }
  });

// ---------------------------------------------------------------------------
// --------------------------------- END CRUD ---------------------------------

  function making_cat_buttons() {
    $.get("/api/categories" , function(data){
      for (let i = 0; i < data.length; i++) {
        var cat_btn = $("<button>");
        cat_btn.text(data[i].category);
        cat_btn.attr({
          "class" : "fill btn category_buttons",
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
  } // End of making cat buttons functions

  //retrieves all snippets by category
  function view_category(category_id){
    status = category_id;

    $.get("/api/view/" + category_id, function(data){
      render_view(data);
    });
  } // End of View Cat function

  //retrieves all snippets for the user
  function view_all(){
    status = 0;

    $.get("/api/view", function(data) {  
      render_view(data);
    });
  } // End of View All Function



    function render_view(data){
        $("#content").html("");
      
        //dynamically creates table off snippet db
        var table = $("<table>");
        table.addClass("table table-hover");
        table.appendTo("#content");
        var thead = $("<thead>");
        thead.appendTo(table);
        var tr = $("<tr>");

        tr.appendTo(thead);
        var heading = ["","Created", "Snippet", "Category" ,"Importance", "Actions"];

        for (let i = 0; i < heading.length; i++) {    
            var th = $("<th>");
            th.text(heading[i]);
            //th.attr("class", "fa fa-angle-down");
            th.appendTo(tr); 

            var arrowDown =$('<i>');

            if (heading[i] == "Importance") {


                if (arrow_direction == "DESC"){

                    arrowDown.attr({
                    "class" : "fa fa-angle-down fa-2x sort",
                    "data-index" : heading[i].toLowerCase()
                    });
                } else {
                    arrowDown.attr({
                      "class" : "fa fa-angle-up fa-2x sort",
                      "data-index" : heading[i].toLowerCase()
                    });
                } 
                arrowDown.appendTo(th);
            }
        } // End of For Loop I



          var tbody = $("<tbody>");
          tbody.appendTo(table);

            for (let i = 0; i < data.length; i++) {

              var tr2 = $("<tr>");

              tr2.appendTo(tbody);

              let th = $("<th>");
              th.attr({
                "class": "fa fa-circle fa-2x"
              });
              var importance_type = data[i].importance;

             switch(importance_type){

               case 1: 
               th.css("color", "#fafafa");
                 break;
               case 2:
                 th.css("color", "#64b5f6");
                 break;
               case 3:
                 th.css("color", "#66bb6a");
                 break;
               case 4:
                 th.css("color", "#ffca28");
                 break;
               case 5:
                 th.css("color", "#b71c1c");
                 break;
             };

              th.appendTo(tr2);

              let td_created = $("<td>");
              td_created.text(data[i].createdAt);
              td_created.appendTo(tr2);
              let td_snippet = $("<td>");
              td_snippet.attr({
                "class" : "snippet_td"
              });
            
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


              // Make the anchor and icons


              var a_edit = $("<a>");
              var i_edit = $("<i>");


              var a_delete = $("<a>");
              var i_delete = $("<i>");


              var a_envelope = $("<a>");
              var i_envelope = $("<i>");

              a_edit.attr({
                "class": "teal-text edit",
                          "data-index": data[i].id,
                          "data-toggle":"modal",
                          "data-target": "#modal-register"
              });

              i_edit.attr({
                "class" : "fa fa-pencil"
              });

              i_envelope.attr({
                "class" : "fa fa-envelope",
                "aria-hidden": true

              });

              a_envelope.attr({

                "class": "blue-text email",
                          "data-index": data[i].id,
                          "data-toggle" : "modal",
                          "data-target": "#email_user"

              });

          
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

                a_envelope.appendTo(td_action);
                i_envelope.appendTo(a_envelope)

              } // End of For Loop I

    } // End of Render View



}); // End of Document Ready
