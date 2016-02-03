function showResponse(time) {
    
    setTimeout(function () {
            $('#response-container').show().addClass('animated bounceIn');
        }, time);
}

function animateForm(time) {
    
    var container = $('#rsvp-container');
        
    $('body').animate({
        scrollTop: $("body").offset().top
    }, time);
        
    setTimeout(function() {
        container.addClass('animated bounceOut');
    }, time);
        
    setTimeout(function() {
        container.hide();
    }, time + 500);
}

$(window).ready(function() {
   
    $('#rsvp-form').submit(function (e) {
        e.preventDefault();
        
        animateForm(500);
        
        var heard = '';
        
        if ($("#other-heard-radio").is(':checked')) {
            
            heard = $("#other-heard").val();
        }  else if ($("#talk-radio").is(':checked')) {
            
            heard = 'talk:' + $('#talk-class').val();
        } else {
            
            heard = $("input[name=heard]:checked").val();
        }
        
        var form_info = {
            'first_name': $('#first-name').val(),
            'last_name': $('#last-name').val(),
            'email': $('#email').val(),
            'phone': $('#phone').val(),
            'academic_level': $('#academic-level').val(),
            'gender': $("#other-gender-radio").is(':checked') ? $("#other-gender").val() : $("input[name=gender]:checked").val(),
            'heard': heard,
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
                $('#response-title').addClass('blue').html('SUCCESS');
                $('#response-details').html('You have successfully RSVPed.<br>See you at the meeting!');
            },
            error: function(resp) {
                console.log(JSON.parse(resp.responseText).description);
                console.log(resp)
                $('#response-title').addClass('red').html('OOPS! SOMETHING WENT WRONG.');
                $('#response-details').html('Error: ' + JSON.parse(resp.responseText).description +
                '<br><br>If the error persists, please email <a href="mailto:hello@pantherhackers.com">hello@pantherhackers.com<a>.'); 
            }
        });
	
        showResponse(2000);
    });
    
    $('#other-gender').click(function() {
        
        $("#other-gender-radio").prop("checked", true);
    });
    
    $('#other-heard').click(function() {
        
        $("#other-heard-radio").prop("checked", true);
    });
    
    $('#talk-class').click(function() {
        
        $("#talk-radio").prop("checked", true);
    });
});
