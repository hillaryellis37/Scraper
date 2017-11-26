var itemID;

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
              					"<button class='comment btn btn-primary' type='button' data-toggle='modal' data-target='#commentModal' data-id='"+ data[i]._id +"'>Comment</button>"+
              					"<button class='remove btn btn-primary' data-id='"+ data[i]._id +"'>Delete From Saved</button>"+
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
              					"<button class='save-item btn btn-primary'  type='button' data-toggle='modal' data-target='#exampleModal' data-id='"+ data[i]._id +"'>Save</button>"+
              				"</div>"+
            		  	"</div>"+
          			  "</div>";
	    // Display the apropos information on the page
	    $("#items-container").append(div);
	  }
	});
});

$("#items-container").on("click", ".save-item", function() {
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
              					"<button class='comment btn btn-primary' type='button' data-toggle='modal' data-target='#commentModal' data-id='"+ savedItem._id +"'>Comment</button>"+
              					"<button class='remove btn btn-primary' data-id='"+ savedItem._id +"'>Delete From Saved</button>"+
              				"</div>"+
            		  	"</div>"+
          			  "</div>";

        $("#saved-container").append(div);
		});
	});
});

$("#saved-container").on("click", ".remove", function() {
	itemID = $(this).attr("data-id");
	
	$(this).closest(".tile").remove();

	$.ajax({
		method: "DELETE",
		url: "/api/saved/" + itemID,
	}).done(function(){});

});

$("#saved-container").on("click", ".comment", function() {
    itemID = $(this).closest('.tile').attr('data-id');
});

$('#addCommentBtn').on("click", function() {
    var newComment = $('.new-comment').val().trim();
    var userName = $('.username').val().trim();
    console.log(itemID);

    $.ajax({
    	method: "POST",
    	url: "/api/saved/" + itemID,
    	data: {
    		username: userName,
    		body: newComment
    	}		   	
    }).done(function(dbComment) {
    	console.log(dbComment.comment);
    });

});