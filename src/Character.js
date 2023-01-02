import { getDiceRollArray, getDicePlaceholderHtml, getPercantage } from "./utils.js"

class Character {
    constructor(data) {
        Object.assign(this, data)
        this.diceHtml = getDicePlaceholderHtml(this.diceCount)
        this.maxHealth = this.health
    }

    setDiceHtml() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) => `<div class="dice">${num}</div>`).join(' ')
    }

    takeDamage(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, i) => total + i)
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.health = 0
            this.isDead = true
        }
    }

    getHealthBarHtml() {
        const percent = getPercantage(this.health, this.maxHealth)

        return `<div class="health-bar-outer">
                <div id="health-bar" class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                style="width: ${percent}%;">
            </div>
        </div>`
    }

    getCharacterHtml() {
        const { name, avatar, health, diceHtml } = this
        const healthBar = this.getHealthBarHtml()

        return `
        <div class="character-card">
            <h4 class="name">${name}</h4>
            <img class="avatar" src="${avatar}"/>
            <div class="health">health: <b>${health}</b></div>
            ${healthBar}
            <div class="dice-container">    
            ${diceHtml}
        </div>
    </div>`
    }
}

export default Character