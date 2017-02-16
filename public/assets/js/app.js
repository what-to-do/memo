$(document).ready(function(){

    var status = 0;
    var arrow_direction = {

        arrow_created : "ASC",
        arrow_snippet : "ASC",
        arrow_category : "ASC",
        arrow_importance: "ASC"

    }

    view_all();
    making_cat_buttons()


    $(".categories").on('click', '.category_buttons', function(){
        var category_id = $(this).data('index');
        if(category_id === 0){
          view_all();
        }else{
        console.log(category_id);
        view_category(category_id);
          }     
    }); 






    $('.content').on('click', '.sort', function(){

        var column = $(this).data("index");

        var arrow = "";

        switch(column){

            case "createdAt":

                arrow = arrow_direction.arrow_created;

                break;

            case "snippet":

                arrow = arrow_direction.arrow_snippet;

                break;

            case "category":

                arrow = arrow_direction.arrow_category;

                break;

            case "importance":

                arrow = arrow_direction.arrow_importance;

                break;

        }

      $.get("/api/sort/" + arrow + '/' + column , function(data) {

        render_view(data);
         
      });

      console.log(column);

      switch(column){

        case "createdAt":

            if (arrow_direction.arrow_created == "DESC") {

                arrow_direction.arrow_created = "ASC";

            } else {

                arrow_direction.arrow_created = "DESC";

            }

            break;
        case "snippet":

            if (arrow_direction.arrow_snippet == "DESC") {

                arrow_direction.arrow_snippet = "ASC";

            } else {

                arrow_direction.arrow_snippet = "DESC";

            }

            break;

        case "category":

            if (arrow_direction.arrow_category == "DESC") {

                arrow_direction.arrow_category = "ASC";

            } else {

                arrow_direction.arrow_category = "DESC";

            }

            break;

        case "importance": 

            if (arrow_direction.arrow_importance == "DESC") {

                arrow_direction.arrow_importance = "ASC";

            } else {

                arrow_direction.arrow_importance = "DESC";

            }

            break;

      } // End of Switch Statement


    });

    //USER SIGNUP
    $("#signup_submit").on("click", function(){
      var new_user = {
            email: $("#email_val").val().trim(),
            password: $("#password_val").val().trim()
      };
      console.log(new_user);
      $.post("/signup/complete", new_user).
      done(function(data){
            console.log("signup\n");
            console.log(data);
               
      });
    });

    //Create New Category
    $('.this_is_submit').on('click', '#create_new_cat_button',function(){
        var created_cat = {
          category: $('#category_modal').val().trim()
        };
        console.log(created_cat);
        $.post('/api/add/category', created_cat).
        done(function(data){
          console.log(data);
            var cat_btn = $("<button>");
            cat_btn.text(data.category);
            cat_btn.attr({
            "class" : "btn btn-primary category_buttons",
            "type" : "button",
            "data-toggle" : "collapse",
            "data-target" : "#collapseExample",
            "aria-expanded": false,
            "aria-controls": "collapseExample",
            "data-index" : data.id
            });
          cat_btn.appendTo(".categories");

          var dropdown_cat = $('<option>');
            dropdown_cat.text(data.category);
            dropdown_cat.attr({
              "value" : data.id
            });
            dropdown_cat.appendTo('#selected_category');
          });
    });



// --------------------------------- CRUD ------------------------------------
// ---------------------------------------------------------------------------


    $(".modal-footer").on("click", ".submit" , function(event) {

        var new_category = {
          snippet: $("#snippet_modal").val().trim(),
          category: $("#selected_category :selected").val(),
          urgency: $("input[name='group1']:checked").val()
        };

        // Question: What does this code do??
        $.post("/api/add/snippet", new_category)
        .done(function(data) {

          



          });
          if(status === 0){
            view_all();
          } else{
            view_category(status);
          }
         


    });

    $("#content").on("click" , ".edit" , function(event){

        var user = $(this).data("index");
          // Question: What does this code do?

        $("#edit-btn").on("click", function(){
        var edited_category = {
          snippet_id: user,
          snippet: $("#snippet_edit").val().trim(),
          urgency: $("input[name='group2']:checked").val()
          };

          console.log(edited_category);

          $.post("/api/edit", edited_category).
          done(function(data){


          });

        });
        if(status === 0){
            view_all();
        } else{
            view_category(status);
        }


    });

    $("#content").on("click" , ".del" , function(event){
      
        
        var user_delete = $(this).data("index");

       

        $.post("/api/delete" , {user_delete: user_delete}).
        done(function(data){

        });
        /*if status === 0 that means the user is currently viewing all snippets.  If 
        status === a number it means they are viewing by category and will show the 
        appropriate category*/
          if(status === 0){
            view_all();
          } else{
            view_category(status);
          }
    });

// ---------------------------------------------------------------------------
// --------------------------------- CRUD ------------------------------------



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

        var table = $("<table>");
        table.addClass("table table-hover");
        table.appendTo("#content");
        var thead = $("<thead>");
        thead.appendTo(table);
        var tr = $("<tr>");

        tr.appendTo(thead);
        var heading = ["#","Created", "Snippet", "Category" ,"Importance", "Actions"];

        for (let i = 0; i < heading.length; i++) {    
            var th = $("<th>");
            th.text(heading[i]);
            //th.attr("class", "fa fa-angle-down");
            th.appendTo(tr); 

            if (heading[i] == "#" || heading[i] == "Actions") {

            } else {

                var arrowDown =$('<i>');
              
                switch(heading[i]){

                    case "Created":
                      
                        if (arrow_direction.arrow_created == "DESC"){

                            arrowDown.attr({
                            "class" : "fa fa-angle-down fa-2x sort",
                            "data-index" : "createdAt"
                            });

                        } else {

                            arrowDown.attr({
                              "class" : "fa fa-angle-up fa-2x sort",
                              "data-index" : "createdAt"
                            });

                        } 

                        break;

                    case "Snippet":

                        if (arrow_direction.arrow_snippet == "DESC"){

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

                        break;


                    case "Category":

                        if (arrow_direction.arrow_category == "DESC"){

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

                        break;

                    case "Importance":

                        if (arrow_direction.arrow_importance == "DESC"){

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

                        break;




                } // End of Switch Statement




               
                if (arrow_direction == 0) {


                } else {

                }
                arrowDown.appendTo(th)

            } 

        } // End of For Loop I



          var tbody = $("<tbody>");
          tbody.appendTo(table);

            for (let i = 0; i < data.length; i++) {

              var tr2 = $("<tr>");


              var importance_type = data[i].importance;


              switch(importance_type){

                case 1: 
                  break;
                case 2:
                  tr2.addClass("table-success");
                  break;
                case 3:
                  tr2.addClass("table-info");
                  break;
                case 4:
                  tr2.addClass("yellow accent-1");
                  break;
                case 5:
                  tr2.addClass("table-danger");
                  break;

              } // End of Switch Statement

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
