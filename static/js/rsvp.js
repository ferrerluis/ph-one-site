function appear(time, container) {
    
    setTimeout(function () {
        container.removeClass('animated fadeOut');
        container.show().addClass('animated fadeIn');
    }, time);
}

function disappear(time, container) {
    
    if ($(window).scrollTop() == 0) time = 0;
        
        $('body').animate({
            scrollTop: $("body").offset().top
        }, time);
    
    setTimeout(function() {
        
        container.removeClass('animated fadeOut');        
        container.addClass('animated fadeOut');
        
        setTimeout(function() {
            container.hide();
        }, 500);
    }, time);
}

$(window).ready(function() {
   
    var rsvp_form = $('#rsvp-container');
    var response = $('#response-container');
    var event = 'main';
    
    if ($(window).width() < 800) {
        
        var device = 'mobile';
    } else {
        
        var device = 'pc';
    }
       
    $('#rsvp-form').submit(function(e) {
       
       e.preventDefault(); 
    });
       
    $('#submit-rsvp-button').click(function () {
        
        disappear(400, rsvp_form);
        
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
            'news': $('#news').val(),
            'event': {'name': event, 'device': device}
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
                
                var email_subj = 'Form%20Error';
                var error_msg = JSON.parse(resp.responseText).description;
                var separator = '----------------------';
                var info = '';
                
                for (var key in form_info) {
                    if (form_info.hasOwnProperty(key)) {
                        
                        info += key + ':%20' + form_info[key] + '%0D%0A';
                    }
                }
                
                console.log(info);
                
                $('#response-title').addClass('red').html('OOPS! SOMETHING WENT WRONG.');
                $('#response-details').html('Error: ' + error_msg +
                '<br><br>If the error persists, please email <a href="mailto:help@pantherhackers.com?subject='
                + email_subj + '&body=%0D%0A%0D%0AError:%20' + error_msg + '%0D%0A' + separator + '%0D%0A' + info + '" target="_blank">help@pantherhackers.com<a>.'); 
            }
        });
	
        appear(2000, response);
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
    
    $('#repeat-symbol').click(function() {
        
        disappear(500, response);
        appear(1500, rsvp_form);
    });
    
    var button_main = $('#button-main');
    var button_recap = $('#button-recap');
    
    button_main.click(function() {
        
        button_main.addClass('blue');
        button_recap.removeClass('red');
        
        event = 'main';
    });
    
    button_recap.click(function() {
       
        button_recap.addClass('red'); 
        button_main.removeClass('blue');       
       
       event = 'recap'
    });
});