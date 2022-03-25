const containerpoke = document.querySelector('.container-poke');
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");

let nump = 9;

next.addEventListener('click', function() {
  nump = nump+9;
  removeChildNodes(containerpoke);
      setTimeout(function(){
        pokeNum(nump);
      }, 0001);
    });
   

previous.addEventListener('click', function() {
  const promise = new Promise((resolve, reject) => {
    if(nump<=9){
      resolve("Cantidad minima de Pokemons");
    }else{
      reject("");
      nump = nump-9;
      removeChildNodes(containerpoke);
      pokeNum(nump);
    }
  });
  promise
    .then(function(mensaje){
      alert(mensaje);
    });
});

function buspoke(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json())
    .then(data => {
        createPokemon(data);
    });
}

function pokeNum(number){
  for(let i = 1; i<=number; i++){
      buspoke(i);
  }

}

function createPokemon(pokemon) {
  
    const card = document.createElement("div");
    card.classList.add("poke-block");
  
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");
  
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
    
    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
  
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    containerpoke.appendChild(card);
}


function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }


  
pokeNum(nump);