document.addEventListener('DOMContentLoaded', () =>{
  displayAllDogs()

  filterButton().addEventListener('click', filterGoodDogs)
})



////////////// DOM Selectors //////////////
function dogBarDiv() {
  return document.getElementById('dog-bar')
}

function dogInfoDiv() {
  return document.getElementById('dog-info')
}

function dogButton(dogId) {
  return document.querySelector(`[data-dog-id='${dogId}']`)
}

function filterButton() {
  return document.getElementById('good-dog-filter')
}



////////////// Fetch Functions //////////////
function getAllDogs() {
  return fetch('http://localhost:3000/pups')
}

function getDoggo(dogId) {
  return fetch(`http://localhost:3000/pups/${dogId}`)
}

function updateDogStatus(dogObj) {
  let dogStatus;
  if (dogButton(dogObj.id).innerText === "Good Dog!") {
    dogStatus = false
  } else {
    dogStatus = true
  }

  const data = {isGoodDog: dogStatus}
  return fetch(`http://localhost:3000/pups/${dogObj.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}



/////////// HTML Creation Functions ////////////
function displayAllDogs() {
  dogBarDiv().innerHTML = '';
  
  getAllDogs()
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => {addDogToDogBar(dog)}))
}

function addDogToDogBar(dogObj) {
  const span = document.createElement('span')
  span.innerText = dogObj.name
  span.addEventListener('click', () => handleDogClick(dogObj))

  dogBarDiv().appendChild(span)
}

function displayDoggo(dogObj) {
  dogInfoDiv().innerHTML = ''

  const img = document.createElement('img')
  img.src = dogObj.image

  const h2 = document.createElement('h2')
  h2.innerText = dogObj.name

  const btn = document.createElement('button')
  if (dogObj.isGoodDog) {
    btn.innerText = "Good Dog!"
  } else {
    btn.innerText = "Bad Dog!"
  }
  btn.dataset.dogId = dogObj.id
  btn.addEventListener('click', () => toggleDogStatus(dogObj))

  dogInfoDiv().appendChild(img)
  dogInfoDiv().appendChild(h2)
  dogInfoDiv().appendChild(btn)
}

function displayOnlyGoodDogs() {
  dogBarDiv().innerHTML = '';
  const goodDogs = [];

  getAllDogs()
    .then(r => r.json())
    .then(dogs => {
      dogs.forEach(dog => {
        if (dog.isGoodDog) {
          goodDogs.push(dog)
        }
      })
      goodDogs.forEach(dog => addDogToDogBar(dog))
    })
}



/////////// Event Handlers ////////////
function handleDogClick(dogObject) {
  getDoggo(dogObject.id)
    .then(r => r.json())
    .then(dog => displayDoggo(dog))
}

function toggleDogStatus(dogObject) {
  if (dogButton(dogObject.id).innerText === "Good Dog!") {
    updateDogStatus(dogObject)
      .then(r => r.json())
      .then(dog => {dogButton(dogObject.id).innerText = "Bad Dog!"})
  } else {
    updateDogStatus(dogObject)
      .then(r => r.json())
      .then(dog => {dogButton(dogObject.id).innerText = "Good Dog!"})
  }
}

function filterGoodDogs() {
  if (filterButton().innerText === "Filter good dogs: OFF") {
    filterButton().innerText = "Filter good dogs: ON"
    displayOnlyGoodDogs()
  } else {
    filterButton().innerText = "Filter good dogs: OFF"
    displayAllDogs()
  }
}
