// sonido para cuando se recarga la página interactuando
// no utilizo el evento click con el boton de limpiar porque
// justamente como recarga la página, no se reproduce
$(document).ready(function() {
    $(".audioInit")[0].play();
});

// botón para reproducir o pausar música
$('#music').click(function() {
    var icon = document.getElementById('musicIcon').innerHTML;

    if (icon == "notifications_off") {
        document.getElementById('musicIcon').innerHTML = `notifications_active`
        $(".audioMusic")[0].play();
    } else {
        document.getElementById('musicIcon').innerHTML  = `notifications_off`
        $(".audioMusic")[0].pause();
    }
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

// evento para reproducir sonido cuando el mouse entra en el area de un elemento
var hoverSound = $(".hoverSound")[0];
$(".containerHoverSound")
.mouseenter(function() {
    hoverSound.play();
})