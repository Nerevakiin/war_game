var deckId

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
            document.getElementById('cards').children[0].innerHTML = `
                <img src='${data.cards[0].image}' />
                `
            document.getElementById('cards').children[1].innerHTML = `
                <img src='${data.cards[1].image}' />
            `
        })
}   else {
        console.log("You need to draw a deck first")
    }
}

document.getElementById('new-deck').addEventListener('click', newDeckClick)

document.getElementById('draw-cards').addEventListener('click', drawCards)