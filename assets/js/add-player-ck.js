function capitaliseFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}function addPlayerToDom(e){var t="",n=document.getElementById("playerList");t+='<li class="player">';t+='<div class="player-avatar">';t+='<img src="../assets/images/default_avatar.png" alt="player avatar">';t+="</div>";t+='<div class="player-name">';t+=e;t+="</div>";t+="</li>";n.insertAdjacentHTML("beforebegin",t);document.getElementById("new_player_name").value=""}function addPlayerToGlobal(e){var t=0;for(var n in players)t+=1;var r="player"+t;console.log(e);console.log(r);window.players[r]=e}function addNewPlayer(){var e={},t=getValidName();t!==!1&&(e.name=t);addPlayerToGlobal(e);addPlayerToDom(e.name)}function generatePlayersHTML(){output=""}function getValidName(){var e=document.getElementById("new_player_name").value,t=/[a-zA-Z'-]/,n=e.match(t);if(n===null)return!1;e=capitaliseFirstLetter(e);return e}function loadPlayersLocal(){if(window.localStorage&&localStorage.getItem("players")){window.players=localStorage.getItem("players");window.players=JSON.parse(window.players);generatePlayersHTML()}}function savePlayersLocal(){localStorage.setItem("players",JSON.stringify(players))}window.players={};loadPlayersLocal();document.getElementById("add_player").addEventListener("click",function(){addNewPlayer()},!1);