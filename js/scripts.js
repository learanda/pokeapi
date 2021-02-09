var url = 'https://pokeapi.co/api/v2/pokemon/1'
var lista = [];

var initFor = 0;
var endFor = 0;

function filtrar() {
    var generacion = document.getElementById("gen").value;
    console.log(generacion);
    switch (generacion) {
        case '1': initFor = 1; endFor = 151; break;
        case '2': initFor = 152; endFor = 251; break;
        case '3': initFor = 252; endFor = 386; break;
        case '4': initFor = 387; endFor = 493; break;
        case '5': initFor = 494; endFor = 649; break;
        case '6': initFor = 650; endFor = 721; break;
        case '7': initFor = 722; endFor = 809; break;
        case '8': initFor = 810; endFor = 890; break;
        case '9': initFor = 1; endFor = 890; break;
        default: console.log("Seleccione una opción válida");
    }
    //console.log(initFor, endFor)
    crearArrayNombres(initFor, endFor);
}
/* setTimeout(() => {
    console.log(initFor, endFor);
}, 3000); */


function crearArrayNombres(initFor, endFor){
    for (var i=initFor; i<=endFor; i++){
        var link = 'https://pokeapi.co/api/v2/pokemon/'+i;
        
        fetch(link)
        .then(response => response.json())
        .then(data => {

            var array = data.name
            lista.push(array);

            // creo un nuevo elemento "option"
            // cargo el contenido en un var y luego lo cargo en el "option"
            var newOption = document.createElement("option")
            var newContent = document.createTextNode(array)
            newOption.appendChild(newContent)

            let element = document.getElementById('selectName')

            // añado el elemento creado
            element.appendChild(newOption)

            //console.log(data)
            
        })
        .catch(err=>console.log(err))

    }
}
//crearArrayNombres();
console.log(lista);


var pokeName = "";
// capturo el nombre del select
function catchList() {
    pokeName = document.getElementById("selectName").value;
    searchByPokeName(pokeName);
}

// capturo el nombre del input
function catchInput() {
    var pokeName2 = document.getElementById("inputName").value;
    pokeName = pokeName2.toLowerCase();
    searchByPokeName(pokeName);
}

var pokeID = 0;
// capturo el ID del input
function catchID() {
    pokeID = document.getElementById("inputID").value;
    searchByPokeID(pokeID);
    console.log(pokeID);
}

function searchByPokeName(pokeName) {
    url = 'https://pokeapi.co/api/v2/pokemon/'+pokeName;
    search(url);
}

function searchByPokeID(pokeID) {
    url = 'https://pokeapi.co/api/v2/pokemon/'+pokeID;
    search(url);
}


function search(url) {
 
    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        let element = document.getElementById('pokeName')
        element.innerHTML = `
            <h1 class="d-flex justify-content-center">${(data.name).toUpperCase()}</h1>
            <p class="d-flex justify-content-center pokeNumber">#${data.id}</p>
            <div class="col-12">
            <table class="table table-striped" id="tabla">
                <thead>
                  <tr>
                    <th scope="col">Front</th>
                    <th scope="col">Back</th>
                  </tr>
                </thead>
                <tbody id="body">
                    <tr>
                        <td><img class="d-block justify-content-center mx-auto imagen"src='${data.sprites.front_default}'/></td>
                        <td><img class="d-block justify-content-center mx-auto imagen"src='${data.sprites.back_default}'/></td>
                    </tr>
                    
                    <th scope="col">Front (shiny)</th>
                    <th scope="col">Back (shiny)</th>
                    <tr>
                        <td><img class="d-block justify-content-center mx-auto imagen"src='${data.sprites.front_shiny}'/></td>
                        <td><img class="d-block justify-content-center mx-auto imagen"src='${data.sprites.back_shiny}'/></td>
                    </tr>

                    <th colspan="2">Dream World</th>
                    <tr>
                        <td colspan="2"><img class="d-block justify-content-center mx-auto imagen"src='${data.sprites.other.dream_world.front_default}'/></td>
                    </tr>

                    <th colspan="2">Abilities</th>                    
                    <tr><td colspan="2" class="ability">${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}</td></tr>
                    
                    
                </tbody>
              </table>
            </div>
            `;

        console.log(data)

        // borra mensaje de error (funciona a medias)
        $("#errMsg").empty();
    })

    .catch( err => {
        console.log(err)
        let element = $("#formContainer");
        element.append('<div class="col-12 mt-1"><p style="color: yellow;" id="errMsg">Nombre o id de Pokémon incorrecto.</p></div>');
    })
}