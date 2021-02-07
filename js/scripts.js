var url = 'https://pokeapi.co/api/v2/pokemon/1'
var lista = [];

function crearArrayNombres(){
    for (var i=1; i<=150; i++){
        var link = 'https://pokeapi.co/api/v2/pokemon/'+i;
        
        fetch(link)
        .then(response => response.json())
        .then(data => {

            var array = data.name
            lista.push(array);

            let element = document.getElementById('elem')

            element.innerHTML = `
                <p>${lista}</p>
                `;

            

            //console.log(data)
            
        })
        .catch(err=>console.log(err))


    }
}
crearArrayNombres();

console.log(lista);

