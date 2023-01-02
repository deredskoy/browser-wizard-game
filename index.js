import characterData from "./src/data.js"
import Character from "./src/Character.js"

let monstersArray = ["orc", "demon", "goblin"]
const atkButton = document.getElementById('attack-button')

let monster = getNewMonster()
const wizard = new Character(characterData.hero)

function attack() {
    !atkButton.disabled //false
    wizard.setDiceHtml()
    monster.setDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    render()

    if (wizard.isDead) {
        endGame()
        atkButton.disabled = true
    }
    else if (monster.isDead) {
        atkButton.disabled = true
        if (monstersArray.length) {
            setTimeout(() => {
                monster = getNewMonster()
                render()
                atkButton.disabled = false
            }, 1000)
        }
        else {
            endGame()
        }
    }
}

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function endGame() {
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" : wizard.health > 0 ? 
        "The Wizard Wins" : "The Monster is Victorious"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"

    setTimeout(() => {
        document.getElementById('chars').innerHTML = `
        <div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>`
    }, 1000)
}

document.getElementById('attack-button').addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

render()