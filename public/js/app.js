$.getJSON("/api/saved", function(data) {
	
	for (var i = 0; i < data.length; i++) {
		var div =  "<div data-id='"+ data[i]._id +"' class='tile'>"+
              			"<a class='covershot-con' href='" + data[i].link + "'>"+
                			"<img src='" + data[i].img + "'>"+
              			"</a>"+
              			"<div class='item-details'>"+
                			"<p>"+ data[i].title + "</p>"+
              			"</div>"+
              			"<div class='button-container'>"+
              				"<button class='comment' data-id='"+ data[i]._id +"'>Comment</button>"+
              				"<button class='remove' data-id='"+ data[i]._id +"'>Delete from Saved</button>"+
              			"</div>"+
            		  	"</div>"+
          			  "</div>";

        $("#saved-container").append(div);

	}
});

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
	alert("clicked");
	var dataId = $(this).attr("data-id");

	$.getJSON("api/items/" + dataId, function(data) {

		$.ajax({
			method: "POST",
			url: "api/items/saved",
			data: {
				link: data.link,
				img: data.img,
				title: data.title
			}
		}).done(function(savedItem) {
			
			var div =  "<div data-id='"+ savedItem._id +"' class='tile'>"+
              				"<a class='covershot-con' href='" + savedItem.link + "'>"+
                				"<img src='" + savedItem.img + "'>"+
              				"</a>"+
              				"<div class='item-details'>"+
                				"<p>"+ savedItem.title + "</p>"+
              				"</div>"+
              				"<div class='button-container'>"+
              					"<button class='comment' data-id='"+ savedItem._id +"'>Comment</button>"+
              					"<button class='remove' data-id='"+ savedItem._id +"'>Delete from Saved</button>"+
              				"</div>"+
            		  	"</div>"+
          			  "</div>";

        $("#saved-container").append(div);
		});
	});
});

$("#saved-container").on("click", ".remove", function() {
	var itemId = $(this).attr("data-id");
	console.log($(this).closest(".tile").remove());

	$.ajax({
		method: "DELETE",
		url: "/api/saved/" + itemId,
	}).done(function(){});


});