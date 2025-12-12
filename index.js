var deckId
const cardsContainer = document.getElementById('cards')

function newDeckClick(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

function drawCards() {
    
    if (deckId) {fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            cardsContainer.children[0].innerHTML = `
                <img src='${data.cards[0].image}' class='card' />
                `
            cardsContainer.children[1].innerHTML = `
                <img src='${data.cards[1].image}' class='card' />
            `

            winnerCard(data.cards[0].value, data.cards[1].value)
        })
}   else {
        console.log("You need to draw a deck first!")
    }
}



// Super proud I managed to think and write this all by myself hehe
function winnerCard(card1, card2){
        console.log(deckId)
    console.log({card1}, {card2})
    
    const valueArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']
    
    
    if (valueArray.indexOf(card1) > valueArray.indexOf(card2)){
        console.log("The winner is card1 with value: " + card1)
    } else if ((valueArray.indexOf(card1) < valueArray.indexOf(card2))) {
        console.log("The winner is card2 with value: " + card2)
    } else {
        console.log("Tie")
    }
}

document.getElementById('new-deck').addEventListener('click', newDeckClick)

document.getElementById('draw-cards').addEventListener('click', drawCards) 