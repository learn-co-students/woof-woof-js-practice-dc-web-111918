document.addEventListener('DOMContentLoaded',()=>{
  fetchDoggos()
})

function dogInfo(){
  return document.querySelector('#dog-info')
}

function fetchDoggos(){
  fetch('http://localhost:3000/pups')
  .then(res=>res.json())
  .then(pups=>{
    pups.forEach(pup=>{
      displayDoggo(pup)
    })
  })
}

function displayDoggo(pup){
  let pupImage = pup.image
  let pupGood = pup.isGoodBoy
  let pupContainer = document.querySelector('#dog-bar')
  let span  = document.createElement('span')
  span.innerText = pup.name
  span.id = pup.id
  span.addEventListener("click",(e)=>{
    dogInfo().innerHTML = ""
    fetchPupInfo(e)
  })
  pupContainer.appendChild(span)
}

function fetchPupInfo(e){
  let pupId = e.currentTarget.id
  fetch(`http://localhost:3000/pups/${pupId}`)
  .then(res=>res.json())
  .then(pup=>{
    displayPup(pup)
  })
}

function displayPup(pup){
  dogInfo().innerHTML = ""
  let h2 = document.createElement('h2')
  h2.innerText = pup.name
  dogInfo().appendChild(h2)

  let img = document.createElement('img')
  img.src = pup.image
  dogInfo().appendChild(img)

  let button = document.createElement('button')
  if (pup.isGoodDog){
    button.innerText = "Good Dog!"
  }
  else{
    button.innerText = "Bad Dog!"
  }
  button.id = `${pup.id}`
  button.addEventListener('click',goodDogClick)


  dogInfo().appendChild(button)
}




function goodDogClick(e){
  let dogId = e.currentTarget.id.split("-")[0]
  let isGoodBoy = undefined
  if (e.currentTarget.innerText.includes("Good")){
    isGoodBoy = false
  }
  else {
    isGoodBoy = true
  }
  editDoggo(dogId,isGoodBoy)
}

function editDoggo(dogId,isGoodBoy){
  fetch(`http://localhost:3000/pups/${dogId}`,{
    method: "PATCH",
    headers:{
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      isGoodDog: isGoodBoy
    })
  })
  .then(res=>res.json())
  .then(data=>{
    displayPup(data)
  })
}
