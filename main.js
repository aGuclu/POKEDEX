const POKEMON = [];

var idNo = document.getElementById('IdNo');
var img = document.getElementById('spriteDiv');
var stats1 = document.getElementById('statsDiv1');
var stats2 = document.getElementById('statsDiv2');
var type1 = document.getElementById('typeDiv');
var abilities = document.getElementById('abilitiesDiv');
var description = document.getElementById('descriptionDiv');

class Pokemon {
  constructor(name, id, hp, def, atk, spd, types, abilities) {
    this.name = name;
    this.id = id;
    this.hp = hp;
    this.def = def;
    this.atk = atk;
    this.spd = spd;
    this.types = types;
    this.abilities = abilities;
    POKEMON.push(this);
  }
}

class TrainerX {
}

function getPokemon(value) {
  var xhttp = new XMLHttpRequest();
  console.log(value);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200){
      var data = JSON.parse(this.responseText);
      var pokemon = new Pokemon(
                                data['name'],
                                data['id'],
                                data['stats'][5]['base_stat'],
                                data['stats'][3]['base_stat'],
                                data['stats'][4]['base_stat'],
                                data['stats'][0]['base_stat'],
                                data['types'],
                                data['abilities']
                               );
      console.log(data);
      idNo.value = pokemon.id;
      clearScreen()

      var hpH3 = document.createElement('h3');
      var defH3 = document.createElement('h3');
      var atkH3 = document.createElement('h3');
      var spdH3 = document.createElement('h3');
      var hpTxt = document.createTextNode('HP :' + pokemon.hp);
      var defTxt = document.createTextNode('DEF:' + pokemon.def);
      var atkTxt = document.createTextNode('ATK:' + pokemon.atk);
      var spdTxt = document.createTextNode('SPD:' + pokemon.spd);

      hpH3.id = 'hp';
      defH3.id = 'def';
      atkH3.id = 'atk';
      spdH3.id = 'spd';

      stats1.appendChild(hpH3);
      stats1.appendChild(defH3);
      hpH3.appendChild(hpTxt);
      defH3.appendChild(defTxt);
      stats2.appendChild(atkH3);
      stats2.appendChild(spdH3);
      atkH3.appendChild(atkTxt);
      spdH3.appendChild(spdTxt);

      var typeH3 = document.createElement('h3');
      typeH3.id = 'type';
      type1.appendChild(typeH3);
      var i = 0
      var typelength = pokemon.types.length;
      var typeTxt = '';
      for (; i < typelength; ) {
        typeTxt += 'TYPE' + [i + 1] + ': ' + pokemon.types[i]['type']['name'] + '<br>';
        i++;
      }
      typeH3.innerHTML = typeTxt;

      var abilitiesH4 = document.createElement('h4');
      abilitiesH4.id = 'abilities';
      abilities.appendChild(abilitiesH4);
      var i = 0
      var abilitylength = pokemon.abilities.length;
      var abilitiesTxt = '';
      for (; i < abilitylength; ) {
        abilitiesTxt += 'ABILITY' + [i + 1] + ': ' + pokemon.abilities[i]['ability']['name'] + '<br>';
        i++;
      }
      abilitiesH4.innerHTML = abilitiesTxt;

      var nameH2 = document.createElement('h2');
      nameH2.id = 'name';
      nameDiv.appendChild(nameH2);
      var nameTxt = data['name'];
      var t1 = 0
      var speed = 50;
      function typeName() {
        if (t1 < nameTxt.length) {
          document.getElementById('name').innerHTML += nameTxt.charAt(t1);
          t1++;
          setTimeout(typeName, speed);
        }
      }
      img.style.backgroundImage = `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value}.png')`;
      getFlavorText(value);
      typeName();
    }
  };
  xhttp.open("GET", `https://pokeapi.co/api/v2/pokemon/${value}/`, true);
  xhttp.send();
}

function getFlavorText(value) {
  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data2 = JSON.parse(this.responseText);
      for (prop in data2['flavor_text_entries']) {
        if (data2['flavor_text_entries'][prop]['language']['name'] == 'en'){
          var t2 = 0;
          let descriptionTxt = data2['flavor_text_entries'][prop]['flavor_text'];
          var descriptionH4 = document.createElement('h4');
          descriptionH4.id = 'description';
          descriptionDiv.appendChild(descriptionH4);
          var speed = 10;
          function typeDescription() {
            if (t2 < descriptionTxt.length) {
              document.getElementById('description').innerHTML += descriptionTxt.charAt(t2);
              t2++;
              setTimeout(typeDescription, speed);
            }
          }
          typeDescription();
          return;
        }
      }
    }
  };
  xhttp2.open("GET", `https://pokeapi.co/api/v2/pokemon-species/${value}/`, true);
  xhttp2.send();
}

function clearScreen() {
    let name = document.getElementById('name');
    let hp = document.getElementById('hp');
    let def = document.getElementById('def');
    let atk = document.getElementById('atk');
    let spd = document.getElementById('spd');
    let type = document.getElementById('type');
    let abilities = document.getElementById('abilities');
    let description = document.getElementById('description');
    name.remove();
    hp.remove();
    def.remove();
    atk.remove();
    spd.remove();
    type.remove();
    abilities.remove();
    description.remove();
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
