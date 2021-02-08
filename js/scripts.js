var url = 'https://pokeapi.co/api/v2/pokemon/1'
var lista = [];

var generacion = document.getElementById("gen").value;

// crear una funcion que se ejecute con onclick que venga de un select con las generaciones
// que segun que generacion se elige, en un var se almacena el comienzo y el tope de var i
// esos var se usan en el for de crearArrayNombres
// la funcion que voy a crear al final va a llamar a la funcion crearArrayNombres para que
// cargue los pokes en el select ni bien se "filtra"

// ver si se mejora el orden de carga de los elementos con una funcion con tiempo, retraso
function crearArrayNombres(){
    for (var i=1; i<=151; i++){
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

            let element = document.getElementById('elem')

            // añado el elemento creado
            element.appendChild(newOption)

            //console.log(data)
            
        })
        .catch(err=>console.log(err))

    }
}
crearArrayNombres();

console.log(lista);

