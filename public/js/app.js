$("#populate-items").on("click", function() {
	$.getJSON("/api/items", function(data) {


	  // For each one
	for (var i = 0; i < data.length; i++) {

			var div =  "<div data-id='"+ data[i]._id +"' class='tile'>"+
              				"<a class='covershot-con' href='" + data[i].link + "'>"+
                			"<img src='" + data[i].img + "'>"+
              				"</a>"+
              				"<div class='item-details'>"+
                				"<p>"+ data[i].title + "</p>"+
              				"</div>"+
              				"<div class='button-container'>"+
              					"<button class='save-item' data-id='"+ data[i]._id +"'>Save</button>"+
              				"</div>"+
            		  	"</div>"+
          			  "</div>";
	    // Display the apropos information on the page
	    $("#items-container").append(div);
	  }
	});
});

$("#items-container").on("click", ".save-item", function() {
	alert('clicked');

});