window.players = {
  player1: { name: "Sam" }
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

function addPlayerToGlobal(name) {

}

function addNewPlayer() {
  // New Player Object
  var newPlayer = {};

  // Get and Capitalize Player Name
  var playerName = getValidName();

  if (playerName !== false) {
    newPlayer.name = playerName;
  }

  addPlayerToDom(newPlayer.name);
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

document.getElementById('add_player').addEventListener('click', function(){
  addNewPlayer();
}, false);