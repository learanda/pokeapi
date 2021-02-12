var url = 'https://pokeapi.co/api/v2/pokemon/'
var urlText = 'https://pokeapi.co/api/v2/pokemon-species/'
var lista = [];
var pokeName = "";
var pokeID = 0;

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


function search(url) {
 
    fetch(url)
    .then(response => response.json())
    .then(data => {

        /* ================= INICIO FUNCIONALIDAD PARA MOSTRAR HABILIDADES ================= */
        var abilities = [];
        var keys = Object.keys(data.abilities) + "";
        var keysArray = keys.split(",");

        for (var i=0; i<keysArray.length; i++) {
            abilities.push(" " + data.abilities[i].ability.name);
        }
        /* =================== FIN FUNCIONALIDAD PARA MOSTRAR HABILIDADES ================== */

        /* ================ INICIO FUNCIONALIDAD PARA MOSTRAR PESO Y ALTURA ================ */
        var weightKg = (data.weight)/10;    var heightMts = (data.height)/10;
        /* ================= FIN FUNCIONALIDAD PARA MOSTRAR PESO Y ALTURA ================== */

        /* ==================== INICIO FUNCIONALIDAD PARA MOSTRAR TIPOS ==================== */
        var types = [];
        var keys = Object.keys(data.types) + "";
        var keysArray = keys.split(",");

        for (var i=0; i<keysArray.length; i++) {
            types.push(" " + data.types[i].type.name);
        }
        /* ===================== FIN FUNCIONALIDAD PARA MOSTRAR TIPOS ====================== */

        /* ==== INICIO FUNCIONALIDAD PARA MOSTRAR UNA IMÁGEN EN CASO DE NULL EN LA API ===== */
        var defaultFront = data.sprites.front_default
        var defaultBack = data.sprites.back_default
        var shinyFront = data.sprites.front_shiny
        var shinyBack = data.sprites.back_shiny
        var dreamWorld = data.sprites.other.dream_world.front_default
        var id = data.id
        var officialArtwork = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+id+".png";
        
        function getImgs(){
            if (defaultFront == null) { defaultFront = "img/noDisponible.png" } else { defaultFront = data.sprites.front_default }
            if (defaultBack == null) { defaultBack = "img/noDisponible.png" } else { defaultBack = data.sprites.back_default }
            if (shinyFront == null) { shinyFront = "img/noDisponible.png" } else { shinyFront = data.sprites.front_shiny }
            if (shinyBack == null) { shinyBack = "img/noDisponible.png" } else { shinyBack = data.sprites.back_shiny }
            if (dreamWorld == null) { dreamWorld = "img/noDisponible.png" } else { dreamWorld = data.sprites.other.dream_world.front_default }
            if (officialArtwork == null) { officialArtwork = "img/noDisponible.png" } 
        }
        getImgs();
        /* ====== FIN FUNCIONALIDAD PARA MOSTRAR UNA IMÁGEN EN CASO DE NULL EN LA API ===== */


        document.getElementById('pokeName').innerHTML = `${(data.name).toUpperCase()}&nbsp; #${data.id}`
        
        let element = document.getElementById('pokeInfo')
        element.innerHTML = `
            <div class="col-12">
            <table class="table table-striped" id="tabla">
                <thead></thead>
                <tbody id="body">
                    <th colspan="2">Tipos: ${types}</th><tr></tr>
                    <th colspan="2">Habilidades: ${abilities}</th><tr></tr>
                    <th scope="col">Peso: ${weightKg} KG</th>
                    <th scope="col">Altura: ${heightMts} Mts</th><tr></tr>

                    <th scope="col">Frente</th> <th scope="col">Espalda</th>
                    <tr>
                        <td><img src='${defaultFront}'/></td>
                        <td><img src='${defaultBack}'/></td>
                    </tr>
                    
                    <th scope="col">Frente (shiny)</th> <th scope="col">Espalda (shiny)</th>
                    <tr>
                        <td><img src='${shinyFront}'/></td>
                        <td><img src='${shinyBack}'/></td>
                    </tr>

                    <th scope="col">Dream World</th> <th scope="col">Official-Artwork</th>
                    <tr>
                        <td><img src='${dreamWorld}'/></td>
                        <td><img src='${officialArtwork}'/></td>
                    </tr>
                </tbody>
              </table>
            </div>
            `;

        // borra mensaje de error
        $(".errMsg").detach();
    })

    .catch( err => {
        console.log(err)
        let element = $("#formContainer");
        element.append('<div class="col-12 mt-1 errMsg"><p style="color: yellow;">Nombre o id de Pokémon incorrecto.</p></div>');
    })
}

function searchFlavorText(urlText) {
    fetch(urlText)
    .then(response => response.json())
    .then(data => {

        var keys = Object.keys(data.flavor_text_entries) + "";
        var keysArray = keys.split(",");
        var descriptionText = [];
        var language = "es";
        getDescription(language);

        // se guarda el texto en el idioma especificado en el var
        function getDescription(language) {
            for (var i=0; i<keysArray.length; i++) {
                var languageName = data.flavor_text_entries[i].language.name
                if (languageName == language) {
                    descriptionText.push("<div>" + '<span class="gameName">'+(data.flavor_text_entries[i].version.name).toUpperCase()+":&nbsp; </span>" + data.flavor_text_entries[i].flavor_text + "</div>")
                }
            }
        }   changeLanguage(language);
        
        // si el texto sigue vacío por no encontrar el 1er idioma,
        // se cambia a idioma alternativo y vuelve a buscar
        function changeLanguage(language) {
            if (descriptionText == "") { language = "en"; getDescription(language); }
        }

        let headDescriptions = document.getElementById('descriptionTable')
        headDescriptions.innerHTML = `<th colspan="2">Descripciones por juegos</th><tr id="rows"></tr>`;

        let element = document.getElementById('rows')
        element.innerHTML = `${descriptionText}`;
    })
    .catch( err => console.log(err))
}