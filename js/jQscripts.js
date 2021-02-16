// sonido para cuando se recarga la página interactuando
// no utilizo el evento click con el boton de limpiar porque
// justamente como recarga la página, no se reproduce
$(document).ready(function() {
    $(".audioInit")[0].play();
});

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