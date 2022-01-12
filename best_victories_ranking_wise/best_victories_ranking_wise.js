function getMatchScoreFromElement(scoreTdElement) {
	let matchScore = "";
	
	let spans = scoreTdElement.querySelectorAll("span.set-score-string");
	let divReason = scoreTdElement.querySelector("div.player-matches__reason");
	
	spans.forEach(s => {
		let auxScore = s.innerHTML;
		auxScore = auxScore.replace("<strong>", "").replace("</strong>", "");
		
		if (auxScore.includes("<sup>")) {
			// if the <sup> tag is at the end (the indexOf plus 6 because "</sup> has 6 characters")
			if (auxScore.indexOf("</sup>")+6 === auxScore.length) {
				// replace <sup> tags (tiebreak) with parenthesis
				auxScore = auxScore.replace("<sup>", "(").replace("</sup>", ")");
			} else {
				// the <sup> tag isn't at the end. I have to move the tiebreak score to the end
				let indexOpenSup = auxScore.indexOf("<sup>");
				let indexCloseSup = auxScore.indexOf("</sup>");
				let onlyTiebreakScore = auxScore.slice(indexOpenSup+5, indexCloseSup); // plus 5 because "<sup>" has 4 characters
				let fullTiebreakScoreWithSups = auxScore.slice(indexOpenSup, indexCloseSup+6); // plus 6 because "</sup>" has 6 characters
				
				auxScore = auxScore.replace(fullTiebreakScoreWithSups, "");
				auxScore += `(${onlyTiebreakScore})`;
			}			
		}
		
		matchScore += auxScore + " ";		
	});
	
	if (divReason !== null) {
		matchScore += divReason.innerText;
	}
	
	matchScore = matchScore.trim();
	
	return matchScore;
}

let allTournamentsElements = document.querySelectorAll(".player-matches__tournament");
let allMatches = [];
let numMatch = 1;

for (let i = 0; i < allTournamentsElements.length; i++) {
	let tournamentElement = allTournamentsElements[i];
	
	// tournament information
	let tournamentName = tournamentElement.querySelector(".player-matches__tournament-title").innerText;
	let tournamentLocation = tournamentElement.querySelector(".player-matches__tournament-location").innerText;
	let tournamentDate = tournamentElement.querySelector(".player-matches__tournament-date").innerText;
	let tournamentSurface = tournamentElement.querySelector(".player-matches__tournament-meta").querySelector(".player-matches__tournament-meta-item:nth-child(2) > .player-matches__tournament-meta-value").innerText;
	
	// ranking, entry type, points and prize money won
	let playerTournamentRanking = "?";
	let playerEntryType = "?";
	let playerSeed = "?"; // ToDo
	let playerTournamentPoints = "?";
	let playerTournamentPrizeMoney = "?";
	let tournamentFooterElement = tournamentElement.querySelector(".player-matches__tournament-footer");
	let tournamentFooterItems = tournamentFooterElement.querySelectorAll(".player-matches__tournament-meta-item");
	for (let j = 0; j < tournamentFooterItems.length; j++) {
		let label = tournamentFooterItems[j].querySelector(".player-matches__tournament-meta-label").innerText;
		let value = tournamentFooterItems[j].querySelector(".player-matches__tournament-meta-value").innerText;
		
		if (label === "Rank") {
			playerTournamentRanking = value;
		} else if (label === "Entry Type") {
			playerEntryType = value;
		} else if (label === "WTA Points Gain") {
			playerTournamentPoints = value;
		} else if (label === "Ranking Points Gain") {
			playerTournamentPoints = value;
		} else if (label === "Prize Money Won") {
			playerTournamentPrizeMoney = value;
		}
	}
	
	// matches
	let tournamentMatchesElem = tournamentElement.querySelectorAll(".player-matches__match");
	for (let j = 0; j < tournamentMatchesElem.length; j++) {
		let matchElement = tournamentMatchesElem[j];
		
		let matchRound = matchElement.querySelector(".player-matches__match-round").innerText;
		let matchOpponent = matchElement.querySelector(".player-matches__match-opponent-link").innerText;
		let matchOpponentRanking = matchElement.querySelector(".player-matches__match-cell--opp-rank").innerText;
		if (matchOpponentRanking === "-") {
			matchOpponentRanking = 9999;
		}
		let matchResult = matchElement.querySelector(".player-matches__match-cell--winloss").innerText;
		
		let scoreElement = matchElement.querySelector(".player-matches__match-cell--score");
		let matchScore = getMatchScoreFromElement(scoreElement);
		
		
		let thisMatch = {
			numMatch: numMatch,
			tournamentName: tournamentName,
			tournamentDate: tournamentDate,
			tournamentLocation: tournamentLocation,
			tournamentSurface: tournamentSurface,
			playerTournamentRanking: playerTournamentRanking,
			matchRound: matchRound,
			matchOpponent: matchOpponent,
			matchOpponentRanking: Number(matchOpponentRanking),
			matchResult: matchResult,
			matchScore: matchScore
		};
		allMatches.push(thisMatch);
		numMatch++;
	}
}

let allVictories = allMatches.filter(m => m["matchResult"] === "W");

// sort by opponent's ranking, from lowest to highest ranking
// if there is a tie, show first the older match (matches are numbered from most recent to most ancient, so the higher the number of match, the oldest it will be)
allVictories.sort((a, b) => {
	if (a["matchOpponentRanking"] < b["matchOpponentRanking"]) {
		return -1;
	} else if (a["matchOpponentRanking"] > b["matchOpponentRanking"]) {
		return 1;
	} else {
		if (a["numMatch"] > b["numMatch"]) {
			return -1;
		} else if (a["numMatch"] < b["numMatch"]) {
			return 1;
		} else {
			return 0;
		}
	}
});

console.log(allVictories);

console.log("10 best victories ranking-wise:");
allVictories.slice(0, 10).forEach((v, i) => {
	console.log(`(${i+1}) ${v["tournamentName"]} (${v["tournamentLocation"]} || ${v["tournamentSurface"]} || ${v["tournamentDate"]} || vs ${v["matchOpponent"]} (#${v["matchOpponentRanking"]}) || Result: ${v["matchScore"]} || Round: ${v["matchRound"]} || Player's ranking: ${v["playerTournamentRanking"]}`);
});