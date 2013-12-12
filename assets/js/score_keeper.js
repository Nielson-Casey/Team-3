function ScoreKeeper() {
	var score= 0; 
	function gainedPoint() { 
		score++; 
	} 
	function lostPoint() {
		score--;
	}
	function gainedManyPoints(points) {
		score += points
	}
	function lostManyPoints(points) {
		score -= points
	}
	function getScore() { 
		return score; 
	} 
}