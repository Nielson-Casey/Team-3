// -----------------------------------------------
// FRIENDS
// Ajax in a JSON set of saved players
// which the user can then add to this game

// -----------------------------------------------
// AJAX
// Pulls in JSONP list of players, saves to window and to view

(function($) {

var url = 'http://samuelloveland.com/files/friends.json?callback=?';

$.ajax({
   type: 'GET',
    url: url,
    async: false,
    jsonpCallback: 'friendsCallback',
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json) {
       window.friends = json.friends;
       var output = '';
       for (var key in friends) {
        output += '<li>' + friends[key].name + ' <a id="' + key + '" href="#" class="friend-add">(Add)</a></li>';
       }
       document.getElementById('friendList').innerHTML = output;
       addFriendEvents();
    }
});

})(jQuery);

// -----------------------------------------------
function addFriend(id) {
  // New Player Object
  var newPlayer = friends[id];

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

// For use with single DOM output ('add friend')
function addFriendEvent(id) {
  var query = '#' + id + '.friend-add';
  var addNode = document.querySelector(query);
  console.log(addNode);
  addNode.addEventListener('click', function(){
    console.log('Added listener for' + id);
    addFriend(id);
  }, false);
}


// For use with generating full list (localstorage items on load)
// called by generatePlayersView()
function addFriendEvents() {
  for (var key in friends) {
    var friend = friends[key];
    console.log(friend);
    addFriendEvent(key);
  }
}