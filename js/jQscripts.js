// ejecuta function catchInput con keypress
$(document).ready(function() {
        $('#inputName').keypress(function(e){   
        if(e.which == 13){      
            catchInput();      
        }   
        });
});

// ejecuta function catchID con keypress
$(document).ready(function() {
    $('#inputID').keypress(function(e){   
    if(e.which == 13){      
        catchID();      
    }   
    });
});

// evento para reproducir sonido de click
$('#formContainer').click(function() {
    $(".audioClick")[0].play();
});

// evento para reproducir sonido de tap
$('#formContainer').on("tap", function() {
    $(".audioTouch")[0].play();
});