let computerScore = 0
let myScore = 0
var deckId
const cardsContainer = document.getElementById('cards')
const placeHolderText = document.getElementById('winner-placeholder')
const drawCardsBtn = document.getElementById('draw-cards')
const newDeckBtn = document.getElementById('new-deck')
const computerScoreEl = document.getElementById('computer-score')
const myScoreEl = document.getElementById('my-score')
const remainingCardsEl = document.getElementById("remaining-cards")

function newDeckClick(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            
            remainingCardsEl.innerHTML = `Remaining cards: ${data.remaining}`
            drawCardsBtn.classList.remove("disabled")
            drawCardsBtn.disabled = false
            
            computerScore = 0
            myScore = 0
            computerScoreEl.textContent = `Computer Score: ${computerScore}`
            myScoreEl.textContent = `My Score: ${myScore}`

            
        })
    placeHolderText.innerText = "New deck locked and loaded"
}

function drawCards() {
    
    if (deckId) {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            cardsContainer.children[0].innerHTML = `
                <img src='${data.cards[0].image}' class='card' />
                `
            cardsContainer.children[1].innerHTML = `
                <img src='${data.cards[1].image}' class='card' />
            `

            remainingCardsEl.innerHTML = `Remaining cards: ${data.remaining}`



            winnerCard(data.cards[0].value, data.cards[1].value)

            
            if (data.remaining === 0){

                if (computerScore > myScore) {
                    placeHolderText.textContent = "Final Winner: Computer"
                    console.log("Final Winner: Computer")
                } else if (myScore > computerScore) {
                    placeHolderText.textContent = "Final Winner: Me"
                    console.log("Final Winner: me")
                } else {
                    placeHolderText.textContent = "Tie!"
                }

                drawCardsBtn.disabled = true 
                drawCardsBtn.classList.add("disabled")

            }
        })
}   else {
        console.log("You need to draw a deck first!")
        placeHolderText.textContent = "You need to draw a deck first silly"
    }
}



function winnerCard(card1, card2){
        console.log(deckId)
    console.log({card1}, {card2})
    
    const valueArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']
    
    
    if (valueArray.indexOf(card1) > valueArray.indexOf(card2)){
        console.log("The winner is Computer with value: " + card1)
        placeHolderText.innerHTML = `The winner is Computer with value: ${card1}`
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`

    } else if ((valueArray.indexOf(card1) < valueArray.indexOf(card2))) {
        console.log("The winner is Me with value: " + card2)
        placeHolderText.innerHTML = `The winner is Me with value: ${card2}`
        myScore++
        myScoreEl.textContent = `My Score: ${myScore}`

    } else {
        console.log("Tie")
        placeHolderText.innerHTML = `Tie!`
    }
}

newDeckBtn.addEventListener('click', newDeckClick)
drawCardsBtn.addEventListener('click', drawCards) 