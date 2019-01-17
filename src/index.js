document.addEventListener('DOMContentLoaded', function(){

  getAllPups()

})

function dogBar(){
  return document.querySelector('#dog-bar')
}

function dogInfo(){
  return document.querySelector('#dog-info')
}

function pupButton(){
  return document.querySelector('#pup-button')
}

function getAllPups(){
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(pups => {
    pups.forEach(pup => renderPup(pup))
  })
}

function renderPup(pup){
  const pupSpan = document.createElement('span')
  pupSpan.innerText = pup.name
  pupSpan.addEventListener('click', (e) => {renderPupInfo(pup)})
  dogBar().appendChild(pupSpan)
}

function clearNode(node){
    while(node.firstChild){
      node.removeChild(node.firstChild)
    }
}

function renderPupInfo(pup){
  event.preventDefault()
  clearNode(dogInfo())
  let pupImage = pup.image
  let pupImageNode = document.createElement('img')
  pupImageNode.src = pupImage
  const pupButton = document.createElement('button')
  pupButton.id = 'pup-button'
  pupButton.innerText = isGoodDog(pup)
  dogInfo().appendChild(pupImageNode)
  dogInfo().appendChild(pupButton)
  pupButton.addEventListener('click', (e) => {handlePupButton(pup)})

}

function isGoodDog(pup){
  return(pup.isGoodDog? "Good Dog!" : "Bad Dog!")
}

function handlePupButton(pup){
  event.preventDefault()
  if(pupButton().innerText == "Good Dog!"){
    function data(){return {
      "isGoodDog": false
      }
    }
  }
  else{
    function data(){return {
      "isGoodDog": true
      }
    }
  }
  fetch(`http://localhost:3000/pups/${pup.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data())
  })
  .then(r => r.json())
  .then(updatedPup => {
    pupButton().innerText = isGoodDog(updatedPup)
    console.log(updatedPup)
  })
}
