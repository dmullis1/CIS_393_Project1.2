var gameList = [];

function addGame() {
	var gameName = document.getElementById("game-name").value;
	var summary = document.getElementById("summary").value;
	var likeDislike = document.getElementById("like-dislike").value;
	var rating = document.getElementById("rating").value

	var game = {
		gameName: gameName,
		summary: summary,
		likeDislike: likeDislike,
		rating: rating
	};

	gameList.push(game);

	populateTable();
}

function populateTable() {
	var table = document.getElementById("game-table");

	while (table.rows.length > 1) {
		table.deleteRow(1);
	}

	for (var i = 0; i < gameList.length; i++) {
		var row = table.insertRow(i + 1);
		var gameNameCell = row.insertCell(0);
		var summaryCell = row.insertCell(1);
		var likeDislikeCell = row.insertCell(2);
		var rating = row.insertCell(3);

		gameNameCell.innerHTML = gameList[i].gameName;
		summaryCell.innerHTML = gameList[i].summary;
		likeDislikeCell.innerHTML = gameList[i].likeDislike;
		rating.innerHTML = gameList[i].rating;
  }
}
