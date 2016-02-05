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
    
    var content = $('#content');    
    var totalHeight = $(window).height();    
    
    //If it is a mobile device and the height of the info
    //presented is less than that of the screen, then
    //increase the height of the content so the arrow
    //can't be seen when you scroll down
    
    if ($(window).width() > 480 && content.height() < totalHeight) {
        
        content.height(totalHeight);
        var info = $('#info');
        info.offset({top: totalHeight * 1.5 - info.height()/2});
    }
});
