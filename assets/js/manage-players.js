// -----------------------------------------------
// MANAGE PLAYERS

// -----------------------------------------------
// GLOBAL OBJECT
// Players are stored in this object first,
// then saved to localStorage or generated to HTML

window.players = {

};

// -----------------------------------------------
// ADD NEW PLAYER
// This is where it all begins

function addNewPlayer() {
  // New Player Object
  var newPlayer = {};

  // Get and Capitalize Player Name
  var playerName = getValidName();

  // Save it to the New Player Object
  newPlayer.name = playerName;

  // Save to Global Object
  addPlayerToGlobal(newPlayer);

  // Generate HTML
  addPlayerToDom(newPlayer.name);

  // Save to Local Storage
  savePlayersLocal();
}

// Adds New Player Object to the Global Object
// Called by addNewPlayer()
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

// Adds New Player Object to the DOM
// Called by addNewPlayer()
function addPlayerToDom(name) {
  var output = '';
  var list = document.getElementById('playerList');

  output += generatePlayerHTML(name);
  
  list.insertAdjacentHTML('beforebegin', output);

  document.getElementById('new_player_name').value = '';
}

// Retrieves Player Name from the DOM
// Called by addNewPlayer()
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

// Generate View for Players
// called by loadPlayersLocal()
function generatePlayersView() {
  var output = '';
  var list = document.getElementById('playerList');
  for(var key in players){
    var player = players[key];
    for (var prop in player) {
      if(player.hasOwnProperty(prop)){
        output += generatePlayerHTML(player[prop]);
      }
    }
  }
  list.insertAdjacentHTML('beforebegin', output);
}

// Generates Player HTML
// called by addPlayerToDom() and generatePlayersView()
function generatePlayerHTML(name) {
  var output = '';
  output += '<li class="player">';
  output += '<div class="player-avatar">';
  output += '<img src="../assets/images/default_avatar.png" alt="player avatar">';
  output += '</div>';
  output += '<div class="player-name">';
  output += name;
  output += '</div>';
  // output += '<div class="player-score">22-13</div>';
  output += '</li>';
  return output;
}


// -----------------------------------------------
// LOCAL STORAGE

// Loads Players from Local Storage
// called on initialization
function loadPlayersLocal() {
  // Check that localStorage exists
  if (window.localStorage) {
    // Check for saved players
    if (localStorage.getItem('players')) {
      window.players = localStorage.getItem('players');
      // Parse string into a valid object
      window.players = JSON.parse(window.players);
      // Generate list of players in the view
      generatePlayersView();
    }
  }
}

// Saves Players to Local Storage
// called by addNewPlayers()
function savePlayersLocal() {
  localStorage.setItem('players', JSON.stringify(players));
}


// -----------------------------------------------
// UTILITY

// Capitalizes the first letter of a string
function capitaliseFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}


// -----------------------------------------------
// INITIALIZE
// These are run when the document loads

// Check for local storage and load
loadPlayersLocal();

// Event Listener for Adding New Players
document.getElementById('add_player').addEventListener('click', function(){
  addNewPlayer();
}, false);