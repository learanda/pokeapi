var url = 'https://pokeapi.co/api/v2/pokemon/1'
var lista = [];

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

