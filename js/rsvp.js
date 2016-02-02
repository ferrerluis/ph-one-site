$(window).ready(function() {
   
    $('#submit-rsvp-button').click( function () {
    
        var container = $('#rsvp-container');
        container.addClass('animated bounceOut');
        
        setTimeout(function() {
            container.remove();
            $('#response-container').show().addClass('animated bounceIn');
        }, 1000);
        
        var form_info = $('#rsvp-form').serialize();
        
        $.ajax({
            url: 'http://162.243.24.237:5000/rsvp-submit',
            type: 'POST',
            data : form_info,
            contentType: "application/json; charset=utf-8",
            success: function(resp) {
                $('#response-title').text('SUCCESS');
                $('#response-details').text('You have successfully RSVPed.<br>See you at the meeting!');
                $('#response-container').addClass('animated bounceIn');
            },
            always: function(resp) {
                $('#response-title').text('UPS! SOMETHING WENT WRONG.');
                $('#response-details').text(resp);
                $('#response-container').addClass('animated bounceIn');
            }
        });
    });
});