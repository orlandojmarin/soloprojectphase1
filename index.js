//FETCH REQUEST
fetch('http://localhost:3000/basketballCards')
  .then(response => response.json())
  .then(basketballCards => {
        console.log(basketballCards)
        basketballCards.forEach(card => buildCard(card))
  });

//FUNCTION TO BUILD A CARD
  function buildCard(newCard) {
    const cardContainer = document.getElementById("cards")

    const individualCard = document.createElement("div")
    individualCard.id = newCard.id
    
    const cardH1 = document.createElement("h1")
    cardH1.innerText = newCard.playerName

    individualCard.appendChild(cardH1)

    const cardH2 = document.createElement("h2")
    cardH2.innerText = newCard.yearDrafted

    individualCard.appendChild(cardH2)

    const cardImage = document.createElement("img")
    cardImage.src = newCard.image

    individualCard.appendChild(cardImage)

    const cardTeamName = document.createElement("p")
    cardTeamName.textContent = newCard.rookieYearTeam

    individualCard.appendChild(cardTeamName)

    const playerHeight = document.createElement("p")
    playerHeight.textContent = newCard.height

    individualCard.appendChild(playerHeight)

    const playerWeight = document.createElement("p")
    playerWeight.textContent = newCard.weight

    individualCard.appendChild(playerWeight)

    const deleteCardButton = document.createElement("button")
    deleteCardButton.id = "delete"
    deleteCardButton.textContent = "x Delete Card"
//ADD EVENT LISTENER TO DELETE BUTTON, DELETE CARD ONCE CLICKED
    deleteCardButton.addEventListener("click", () => deleteCard(individualCard))
    individualCard.appendChild(deleteCardButton)
    cardContainer.appendChild(individualCard)
  }

  //ADD EVENT LISTENER TO FORM SUBMIT BUTTON, BUILD NEW CARD ONCE SUBMITTED
  const form = document.querySelector("form")
  console.log(form)
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e)
    console.log(e.target.playerName.value)
    let card = {playerName: e.target.playerName.value,
                yearDrafted: e.target.yearDrafted.value,
                image: e.target.image.value,
                rookieYearTeam: e.target.rookieYearTeam.value,
                height: e.target.height.value,
                weight: e.target.weight.value
    }
    buildCard(card)
    postNewCard(card)
    console.log(card)
  })

//FUNCTION FOR THE POST REQUEST
function postNewCard(card){
    console.log(card)
    fetch('http://localhost:3000/basketballCards', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
     },
    body: JSON.stringify(card),
    })
    .then(response => response.json())
    .then(card => {
    console.log('Success:', card);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
} 

//FUNCTION FOR THE DELETE REQUEST
function deleteCard(card) {
  document.getElementById(card.id).remove()
  fetch(`http://localhost:3000/basketballCards/${card.id}`, {
    method: 'DELETE'
    })
    .then(response => response.json())
    .then(cardResponse => {
      console.log(cardResponse)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function removeACard(card){
  document.getElementById(card.id).remove()
}
