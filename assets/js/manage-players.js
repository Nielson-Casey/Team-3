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
// This is where it all happens

function addNewPlayer() {
  // New Player Object
  var newPlayer = {};

  // Get and Capitalize Player Name
  var playerName = getValidName();

  // Save it to the New Player Object
  newPlayer.name = playerName;

  //initialize player socre at zero
  var score = 0;

  function gainedPoint() {
    newPlayer.score++;
  }
  
  function lostPoint() {
    newPlayer.score--;
  }

  //add score to player object
  newPlayer.score = score;

  // Save to Global Object
  // and store player's id
  newPlayer.id = addPlayerToGlobal(newPlayer);

  // Generate HTML
  addPlayerToDom(newPlayer.id, newPlayer.name, newPlayer.score);

  // Save to Local Storage
  savePlayersLocal();
}

// Adds New Player Object to the Global Object
// Called by addNewPlayer()
function addPlayerToGlobal(newPlayer) {
  // count objects in global "players"
  var i = 0;
  for(var key in players){
    i += 1;
  }
  // create an id for the new player
  var id = 'player' + i;
  // add new player to global object
  // with new id
  window.players[id] = newPlayer;
  return id;
}

// Adds New Player Object to the DOM
// Called by addNewPlayer()
function addPlayerToDom(id, name, score) {
  var output = '';
  var list = document.getElementById('playerList');

  // generate HTML to output
  output += generatePlayerHTML(id, name, score);
  
  // insert new HTML just inside the player list
  list.insertAdjacentHTML('beforebegin', output);

  // attatch delete player event listener
  addDeleteEvent(id);

  // clear the input field for next use
  document.getElementById('new_player_name').value = '';
}

// Retrieves Player Name from the DOM
// Called by addNewPlayer()
function getValidName() {
  // get player name from the input field
  var playerName = document.getElementById('new_player_name').value;

  // check against RegExp to make sure valid name
  // NOT CURRENTLY ENFORCED
  // var validName = /[a-zA-Z'-]/;
  // var matchesName = playerName.match(validName);
  // if (matchesName === null) {
  //   return false;
  // } else {
  //   playerName = capitaliseFirstLetter(playerName); // Capitalise
  //   return playerName;
  // }
  playerName = capitaliseFirstLetter(playerName); // Capitalise
  return playerName;
}

// Generate View for Players
// called by loadPlayersLocal()
function generatePlayersView() {
  var output = '';
  var list = document.getElementById('playerList');

  // Loop through all the players
  // and generate HTML items for them
  for(var key in players){
    var player = players[key];
    console.log(players[key]);
    output += generatePlayerHTML(key, player['name'], player['score']);
  }

  // insert new HTML to the DOM
  list.insertAdjacentHTML('beforebegin', output);

  // Loop through all the players
  // and attatch Delete Event
  addDeleteEvents();
}

// Generates Player HTML
// called by addPlayerToDom() and generatePlayersView()
function generatePlayerHTML(id, name, score) {
  var output = '';
  output += '<li id="';
  output += id;
  output += '" class="player">';
  output += '<div class="player-avatar">';
  output += '<img src="../assets/images/default_avatar.png" alt="player avatar">';
  output += '</div>';
  output += '<div class="player-name">';
  output += name;
  output += '</div>';
  output += '<div class "addPoint">';
  output += '<button type="button" onclick="addNewPlayer.gainedPoint()">'
  output += '</div>'
  output += '<div class="player-score">';
  output += score;
  output += '</div>';
  output += '<div class "lostPoint">';
  output += '<button type="button" onclick="addNewPlayer.lostPoint()">'
  output += '</div>'
  output += '<a href="#" class="player-delete" data-id="';
  output += id;
  output += '">';
  output += 'Delete';
  output += '</a>';
  output += '</li>';
  return output;
}

// -----------------------------------------------
// DELETE PLAYER

function deletePlayer(id) {
  // Get player html element
  var player = document.getElementById(id);

  // delete player from Global Object
  delete window.players[id];

  // delete html element
  player.remove();

  // save results to local storage
  savePlayersLocal();
}

// For use with single DOM output ('add player')
function addDeleteEvent(id) {
  var query = '#' + id + ' .player-delete';
  var deleteNode = document.querySelector(query);
  deleteNode.addEventListener('click', function(){
    deletePlayer(id);
  }, false);
}

// For use with generating full list (localstorage items on load)
// called by generatePlayersView()
function addDeleteEvents() {
  for (var key in players) {
    var player = players[key];
    console.log(players[key]);
    addDeleteEvent(key);
  }
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
  // Serialize object to a string for storage using JSON.stringify()
  // and save to local storage
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