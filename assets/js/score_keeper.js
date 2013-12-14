function ScoreKeeper() {
	var playerScore = {}; 
	var score= document.getElementById('playerScore');
	function gainedPoint() { 
		playerScore.score++; 
	} 
	function lostPoint() {
		playerScore.score--;
	}
	function gainedManyPoints(points) {
		playerScore.score += points
	}
	function lostManyPoints(points) {
		playerScore.score -= points
	}
	function getScore() { 
		 document.getElementById("playerScore").innerHTML=score; 
	} 
}