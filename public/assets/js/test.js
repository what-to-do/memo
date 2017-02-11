$(document).ready(function(){

  $.get("/api/view", function(data) {
    console.log(data);

    
    

  });


	// Question: What does this code do?
	$("#add-button").on("click", function(event) {
	  event.preventDefault();

	  var new_category = {

	    snippet: $("#snippet").val().trim(),
	    category: $("#category").val().trim(),
	    urgency: $("#urgency").val().trim(),
	    due: $("#due").val().trim()

	  };
	  // Question: What does this code do??
	  $.post("/api/add", new_category)
	  .done(function(data) {
	    console.log(data);

	  });
	});
	


// <table class="table">
//     <thead>
//         <tr>
//             <th>#</th>
//             <th></th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Username</th>
//             <th>Actions</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <th scope="row">1</th>
//             <td>
//                 <fieldset class="form-group">
//                     <input type="checkbox" id="checkbox1">
//                     <label for="checkbox1"></label>
//                 </fieldset>
//             </td>
//             <td>Ashley</td>
//             <td>Lynwood</td>
//             <td>@ashow</td>
//             <td>
//                 <a class="blue-text"><i class="fa fa-user"></i></a>
//                 <a class="teal-text"><i class="fa fa-pencil"></i></a>
//                 <a class="red-text"><i class="fa fa-times"></i></a>
//             </td>
//         </tr>
//         <tr>
//             <th scope="row">2</th>
//             <td>
//                 <fieldset class="form-group">
//                     <input type="checkbox" id="checkbox2">
//                     <label for="checkbox2"></label>
//                 </fieldset>
//             </td>
//             <td>Billy</td>
//             <td>Cullen</td>
//             <td>@cullby</td>
//             <td>
//                 <a class="blue-text"><i class="fa fa-user"></i></a>
//                 <a class="teal-text"><i class="fa fa-pencil"></i></a>
//                 <a class="red-text"><i class="fa fa-times"></i></a>
//             </td>
//         </tr>
//         <tr>
//             <th scope="row">3</th>
//             <td>
//                 <fieldset class="form-group">
//                     <input type="checkbox" id="checkbox3">
//                     <label for="checkbox3"></label>
//                 </fieldset>
//             </td>
//             <td>Ariel</td>
//             <td>Macy</td>
//             <td>@arielsea</td>
//             <td>
//                 <a class="blue-text"><i class="fa fa-user"></i></a>
//                 <a class="teal-text"><i class="fa fa-pencil"></i></a>
//                 <a class="red-text"><i class="fa fa-times"></i></a>
//             </td>
//         </tr>

//     </tbody>
// </table>
});