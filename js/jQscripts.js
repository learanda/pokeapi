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