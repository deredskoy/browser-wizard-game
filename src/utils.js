//returning new array with numbers and html
function getDicePlaceholderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(() => 
        `<div class="placeholder-dice"></div>`).join(' ')
}

//function to return newly generetad dice roll from 1 to 6
function getDiceRollArray(diceCount) {
	return new Array(diceCount).fill(0).map(() =>
		Math.floor(Math.random() * 6) + 1)
}

//function which generates percent of displayed health in healthbar
function getPercantage(remainingHealth, maximumHealth) {
    return (100 * remainingHealth) / maximumHealth
}

export { getDiceRollArray, getDicePlaceholderHtml, getPercantage }