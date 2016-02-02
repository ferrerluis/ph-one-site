window.onload = function() {
	
	var rsvp_button = $("#button");
	var logo = $("#logo");
	
	rsvp_button.click( function() {
	
		rsvp_button.addClass("animated pulse");
		logo.addClass("animated flash");
	
		window.setTimeout( function() {
			
			window.location.href = "./rsvp.html";
		}, 1000);
	
	});
}