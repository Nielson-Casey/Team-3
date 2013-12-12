window.players = {

};

function capitaliseFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addPlayerToDom(name) {
  var output = '';
  var list = document.getElementById('playerList');

  output += '<li class="player">';
  output += '<div class="player-avatar">';
  output += '<img src="../assets/images/default_avatar.png" alt="player avatar">';
  output += '</div>';
  output += '<div class="player-name">';
  output += name;
  output += '</div>';
  // output += '<div class="player-score">22-13</div>';
  output += '</li>';
  
  list.insertAdjacentHTML('beforebegin', output);

  document.getElementById('new_player_name').value = '';
}

function addPlayerToGlobal(newPlayer) {
  var i = 0;
  for(var key in players){
    i += 1;
  }
  var id = 'player' + i;
  console.log(newPlayer);
  console.log(id);
  window.players[id] = newPlayer;
}

function addNewPlayer() {
  // New Player Object
  var newPlayer = {};

  // Get and Capitalize Player Name
  var playerName = getValidName();

  if (playerName !== false) {
    newPlayer.name = playerName;
  }

  addPlayerToGlobal(newPlayer);
  addPlayerToDom(newPlayer.name);
}

function generatePlayersHTML() {
  var output = '';
  var list = document.getElementById('playerList');
  for(var key in players){
    var player = players[key];
    for (var prop in player) {
      if(player.hasOwnProperty(prop)){
        // console.log(prop + " = " + player[prop]);
        output += '<li class="player">';
        output += '<div class="player-avatar">';
        output += '<img src="../assets/images/default_avatar.png" alt="player avatar">';
        output += '</div>';
        output += '<div class="player-name">';
        output += player[prop];
        output += '</div>';
        // output += '<div class="player-score">22-13</div>';
        output += '</li>';
      }
    }
  }
  list.insertAdjacentHTML('beforebegin', output);
}

function getValidName() {
  var playerName = document.getElementById('new_player_name').value;
  var validName = /[a-zA-Z'-]/;
  var matchesName = playerName.match(validName);
  if (matchesName === null) {
    return false;
  } else {
    playerName = capitaliseFirstLetter(playerName); // Capitalise
    return playerName;
  }
}

function loadPlayersLocal() {
  if (window.localStorage) {
    if (localStorage.getItem('players')) {
      window.players = localStorage.getItem('players');
      window.players = JSON.parse(window.players);
      generatePlayersHTML();
    }
  }
}

function savePlayersLocal() {
  localStorage.setItem('players', JSON.stringify(players));
}

loadPlayersLocal();

document.getElementById('add_player').addEventListener('click', function(){
  addNewPlayer();
}, false);