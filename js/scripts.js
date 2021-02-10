var url = 'https://pokeapi.co/api/v2/pokemon/'
var urlText = 'https://pokeapi.co/api/v2/pokemon-species/'
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
        case '8': initFor = 810; endFor = 898; break;
        case '9': initFor = 1; endFor = 898; break;
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
    //console.log(pokeID);
}

function searchByPokeName(pokeName) {
    url = 'https://pokeapi.co/api/v2/pokemon/'+pokeName;
    urlText = 'https://pokeapi.co/api/v2/pokemon-species/'+pokeName;
    search(url);
    searchFlavorText(urlText);
}

function searchByPokeID(pokeID) {
    url = 'https://pokeapi.co/api/v2/pokemon/'+pokeID;
    urlText = 'https://pokeapi.co/api/v2/pokemon-species/'+pokeID;
    search(url);
    searchFlavorText(urlText);
}

function searchFlavorText(urlText) {
    fetch(urlText)
    .then(response => response.json())
    .then(data => {
        let element = document.getElementById('pokeDescription')
        element.innerHTML = `<p class="flavorText">${data.flavor_text_entries[0].flavor_text}</p>`;
    })
    .catch( err => console.log(err))
}

function search(url) {
 
    fetch(url)
    .then(response => response.json())
    .then(data => {

        /* ================= INICIO FUNCIONALIDAD PARA MOSTRAR HABILIDADES ================= */
        var abilities = [];
        var keys = Object.keys(data.abilities) + "";
        var keysArray = keys.split(",");
        //console.log(keysArray.length);

        for (var i=0; i<keysArray.length; i++) {
            abilities.push(" " + data.abilities[i].ability.name);
        }
        //console.log(abilities)
        /* =================== FIN FUNCIONALIDAD PARA MOSTRAR HABILIDADES ================== */

        /* ================ INICIO FUNCIONALIDAD PARA MOSTRAR PESO Y ALTURA ================ */
        var apiWeight = data.weight;    var weightKg = apiWeight/10;
        var apiHeight = data.height;    var heightMts = apiHeight/10;
        /* ================= FIN FUNCIONALIDAD PARA MOSTRAR PESO Y ALTURA ================== */

        /* ==================== INICIO FUNCIONALIDAD PARA MOSTRAR TIPOS ==================== */
        var types = [];
        var keys = Object.keys(data.types) + "";
        var keysArray = keys.split(",");
        //console.log(keysArray.length);

        for (var i=0; i<keysArray.length; i++) {
            types.push(" " + data.types[i].type.name);
        }
        //console.log(abilities)
        /* ===================== FIN FUNCIONALIDAD PARA MOSTRAR TIPOS ====================== */


        // ver si puedo ocultar img si es null


        let element = document.getElementById('pokeName')
        element.innerHTML = `
            <h1 class="d-flex justify-content-center">${(data.name).toUpperCase()}&nbsp; #${data.id}</h1>
            <p class="d-flex justify-content-center pokeNumber"></p>
            <div class="col-12">
            <table class="table table-striped" id="tabla">
                <thead>
                    
                </thead>
                <tbody id="body">
                    <th colspan="2">Types: ${types}</th><tr></tr>
                    <th colspan="2">Abilities: ${abilities}</th><tr></tr>
                    <th scope="col">Weight: ${weightKg} KG</th>
                    <th scope="col">Height: ${heightMts} Mts</th><tr></tr>

                    <th scope="col">Front</th>
                    <th scope="col">Back</th>
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

                    <th colspan="2">Official-Artwork</th>
                    <tr>
                        <td colspan="2"><img class="d-block justify-content-center mx-auto imagen"src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png'/></td>
                    </tr>

                </tbody>
              </table>
            </div>
            `;

        //console.log(data)

        // borra mensaje de error (funciona a medias)
        $("#errMsg").empty();
    })

    .catch( err => {
        console.log(err)
        let element = $("#formContainer");
        element.append('<div class="col-12 mt-1"><p style="color: yellow;" id="errMsg">Nombre o id de Pokémon incorrecto.</p></div>');
    })
}