$(window).ready(function() {
   
    $('#rsvp-form').submit( function (e) {
        e.preventDefault();
        var container = $('#rsvp-container');
        container.addClass('animated bounceOut');
        
        setTimeout(function() {
            container.remove();
            $('#response-container').show().addClass('animated bounceIn');
        }, 1000);
        
        var form_info = {
            'first_name': $('#first-name').val(),
            'last_name': $('#last-name').val(),
            'email': $('#email').val(),
            'phone': $('#phone').val(),
            'academic_level': $('#academic-level').val(),
            'gender': $('#gender').val(),            
            'race': $('#race').val(),
            'date_of_birth': $('#birth').val(),
            'news': $('#news').val(),
            'professions': []
        }
        
        $.ajax({
            url: 'http://162.243.24.237:5000/rsvp-submit',
            type: 'POST',
            data : form_info,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            // headers: {'Access-Control-Allow-Origin': true},
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