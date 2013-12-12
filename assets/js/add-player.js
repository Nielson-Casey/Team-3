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
}

function addNewPlayer() {
  var playerName = document.getElementById('new_player_name').value;
  var validName = /[a-zA-Z'-]/;
  var matchesName = playerName.match(validName);

  // Capitalise
  playerName = capitaliseFirstLetter(playerName);

  if (matchesName === null) {
    // Not valid name
  } else {
    addPlayerToDom(playerName);
  }
}

document.getElementById('add_player').addEventListener('click', function(){
  addNewPlayer();
}, false);