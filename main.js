const POKEMON = [];

class Pokemon {
  constructor(name, hp, defense, attack, speed, type1, type2) {
    this.name = name;
    this.hp = hp;
    this.defense = defense;
    this.attack = attack;
    this.speed = speed;
    this.type1 = type1;
    this.type2 = type2;
  }
}

function getPokemon() {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200){
      var data = JSON.parse(this.responseText);
      let pokemon = new Pokemon(data.name, data.stats[5].base_stat, data.stats[3].base_stat, data.stats[4].base_stat, data.stats[0].base_stat, data.types[0].name, data.types[1].name);
      console.log(data);
      POKEMON.push(pokemon);
    }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/1/", true);
  xhttp.send();
}

dragElement(document.getElementById("windowDiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "TitleBar")) {
    document.getElementById(elmnt.id + "TitleBar").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
