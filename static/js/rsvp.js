$(window).ready(function() {
   
    $('#rsvp-form').submit( function (e) {
        e.preventDefault();
        var container = $('#rsvp-container');
        container.addClass('animated bounceOut');
        
        setTimeout(function() {
            container.remove();
        }, 1000);
        
        var form_info = {
            'first_name': $('#first-name').val(),
            'last_name': $('#last-name').val(),
            'email': $('#email').val(),
            'phone': $('#phone').val(),
            'academic_level': $('#academic-level').val(),
            'gender': $("input[name=gender]:checked").val(),
            'race': $('#race').val(),
            'roles': $('#roles').val(),
            'news': $('#news').val()
        }
        
        $.ajax({
            url: './rsvp',
            type: 'POST',
            data : JSON.stringify(form_info),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function(resp) {
                console.log(resp)                
                $('#response-title').html('SUCCESS');
                $('#response-details').html('You have successfully RSVPed.<br>See you at the meeting!');
                $('#response-container').show().addClass('animated bounceIn');
            },
            error: function(resp) {
                console.log(JSON.parse(resp.responseText).description);
                console.log(resp)
                $('#response-title').addClass('red').html('UPS! SOMETHING WENT WRONG.');
                $('#response-details').html(JSON.parse(resp.responseText).description +
                '<br><br>If the error persists, please email <a href="mailto:hello@pantherhackers.com">hello@pantherhackers.com<a>.');
                $('#response-container').show().addClass('animated bounceIn');
            }
        });
    });
});
