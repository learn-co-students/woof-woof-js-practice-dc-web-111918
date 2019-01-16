document.addEventListener('DOMContentLoaded', ()=> {
  getAllDogs()
  .then(response => response.json())
  .then(allDogs => {
    allDogs.forEach(dogObj => {
      renderDog(dogObj)
    })
  })

  getFilterButton().addEventListener('click', handleFilterButton)
})

// GET DOM ELEMENTS
function getDogsBarDiv() {
  return document.querySelector('#dog-bar')
}

function getDogsSummaryDiv() {
  return document.querySelector('#dog-info')
}

function getGoodDogButton() {
  return document.querySelector('#good-button')
}

function getFilterButton() {
  return document.querySelector('#good-dog-filter')
}

// FETCH REQUEST
function getAllDogs() {
  return fetch('http://localhost:3000/pups')
}

function updateGoodDogValue(dogId, value) {
  const data = {isGoodDog: value}
  return fetch(`http://localhost:3000/pups/${dogId}`,
    {
      method: 'PATCH',
      headers:
      {
        'Content-Type' : 'application/json',
        Accept : 'application/json'
      },
      body: JSON.stringify(data)
    })
}


//id: 4, name: "Buttercup", isGoodDog: false, image: "https://www.petinsurance.com/images/VSSimages/consumer/v5/banner_dog_insurance.jpg"

// RENDER DOM ELEMENTS
function renderDog(dogObj) {
  //creates bar elements
  let nameSpan = document.createElement('span')
  nameSpan.innerText = dogObj.name

  getDogsBarDiv().appendChild(nameSpan)
  nameSpan.addEventListener('click', (e) => handleDogNameButton(dogObj))


}
  //creates summary elements
function renderAdditionalDogInfo(dogObj) {
  let imageTag = document.createElement('img')
  imageTag.src = dogObj.image

  let headerTag = document.createElement('h2')
  headerTag.innerText = dogObj.name

  let goodDogButton = document.createElement('button')


  goodDogButton.innerText = dogObj.isGoodDog ? 'Good Dog!' : 'Bad Dog!'


  goodDogButton.id = 'good-button'

  goodDogButton.addEventListener('click', (e) => handleGoodDogButton(dogObj))

  getDogsSummaryDiv().appendChild(imageTag)
  getDogsSummaryDiv().appendChild(headerTag)
  getDogsSummaryDiv().appendChild(goodDogButton)
}


// EVENT LISTENER HANDLERS
function handleDogNameButton(dogObj) {
  let infoPup = getDogsSummaryDiv()

  while (infoPup.firstChild) {
    	infoPup.removeChild(infoPup.firstChild);
	}
  renderAdditionalDogInfo(dogObj)
}

function handleGoodDogButton(dogObj) {
  updateGoodDogValue(dogObj.id, !dogObj.isGoodDog)
  .then(res => res.json())
  .then(updatedDogObj => {
    if (updatedDogObj.isGoodDog) {
      dogObj.isGoodDog = true
      getGoodDogButton().innerText = 'Good Dog!'
    }else {
      dogObj.isGoodDog = false
      getGoodDogButton().innerText = 'Bad Dog!'
    }
  })
}

function handleFilterButton() {
  let filterOff = 'Filter good dogs: OFF'
  let filterOn = 'Filter good dogs: ON'

  if (getFilterButton().innerText === filterOff) {
    getFilterButton().innerText = filterOn

  }else {
    getFilterButton().innerText = filterOff
  }

}
