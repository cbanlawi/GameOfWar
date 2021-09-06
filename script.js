let deckId = ""
let computerScoreCurrent = 0
let myScoreCurrent = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck-btn")
const drawCardBtn = document.getElementById("draw-card-btn")
const header = document.getElementById("header")
const cardsLeft = document.getElementById("cards-left")
const computerScore = document.getElementById("computer-score")
const myScore = document.getElementById("my-score")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
          cardsLeft.textContent = `Cards Left: ${data.remaining}`
          deckId = data.deck_id
        })
    
    header.textContent = "Game of War"
    header.style.color = "yellow"
    computerScore.textContent = "Computer Score: 0"
    myScore.textContent = "My Score: 0"
    drawCardBtn.disabled = false
}

function drawCard() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
          cardsLeft.textContent = `Cards Left: ${data.remaining}`
          cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" />
          `
          cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card" />
          `

          const winnerText = cardWinner(data.cards[0], data.cards[1])
          header.innerHTML = winnerText

          if (data.remaining === 0) {
            drawCardBtn.disabled = true
            if (computerScoreCurrent > myScoreCurrent) {
              header.style.color = "red"
              header.textContent = "The computer won the game!"
            } else if (computerScoreCurrent < myScoreCurrent) {
              header.style.color = "red"
              header.textContent = "You won the game!"
            } else {
              header.style.color = "red"
              header.textContent = "Tie Game!"
            }
          }
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", drawCard)

function cardWinner(card1, card2) {
  const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

  const card1Value = cardValues.indexOf(card1.value)
  const card2Value = cardValues.indexOf(card2.value)

  if (card1Value > card2Value) {
    computerScoreCurrent++
    computerScore.textContent = `Computer Score: ${computerScoreCurrent}`
    return "Computer wins!"
  } else if (card1Value < card2Value) {
    myScoreCurrent++
    myScore.textContent = `My Score: ${myScoreCurrent}`
    return "You win!"
  } else {
    return "WAR!"
  }
}