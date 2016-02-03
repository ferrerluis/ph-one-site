$(window).ready(function() {
	
	var rsvp_button = $("#button");
	var logo = $("#logo");
	
	rsvp_button.click( function() {
	
		rsvp_button.addClass("animated pulse");
		logo.addClass("animated flash");
	
		window.setTimeout( function() {
			
			window.location.href = "./rsvp";
		}, 1000);
	
	});
    
    $("#arrow").click(function() {
        
        $('#arrow').addClass('animate flash');
        
        $('body').animate({
            scrollTop: $("#content").offset().top
        }, 500);
    });
});
