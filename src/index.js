document.addEventListener("DOMContentLoaded", function(){

  populateDogs();

  getGoodDogFilterButton().addEventListener("click", function(){
      changeGoodDogFilterButtonLabel();
  });
});

const changeGoodDogFilterButtonLabel = () => {
  if (getGoodDogFilterButton().innerText === "Filter good dogs: OFF"){
    getGoodDogFilterButton().innerText = "Filter good dogs: ON";
    populateDogs();
  } else {
    getGoodDogFilterButton().innerText = "Filter good dogs: OFF";
    populateDogs();
  }
};

const getGoodDogFilterButtonValue = () => {
  if (getGoodDogFilterButton().innerText === "Filter good dogs: OFF"){
    return false;
  } else {
    return true;
  }
};


const populateDogs = () => {
  getDogBar().innerHTML = "";
  let dogsData = fetchDogsData();
  dogsData.then(function(dogsData){
    dogsData.forEach(function(dogData){
      if (getGoodDogFilterButtonValue()){
        if (dogData.isGoodDog){
        populateDogSpan(dogData);
        }
      } else {
        populateDogSpan(dogData);
      };
    });
  });
};

const fetchDogsData = () => {
  return fetch("http://localhost:3000/pups")
  .then(res=>res.json())
  .then(json => json);
};

const fetchDogData = (dogData) => {
  return fetch(`http://localhost:3000/pups/${dogData.id}`)
  .then(res=>res.json())
  .then(json => json);
};

const updateDogData = (dogData) => {
  return fetch(`http://localhost:3000/pups/${dogData.id}`,
    {
      method: "PATCH",
      headers:
        {
          "content-type":"application/json",
          accept: "application/json"
        },
        body: JSON.stringify(dogData)
    })
};

const populateDogSpan = (dogData) => {
  const dogBar = getDogBar();

  const span = document.createElement('span');
  dogBar.appendChild(span);
  span.innerText = dogData.name;
  span.id = dogData.id;
  span.addEventListener("click", function(event){
    dogData = {id: event.target.id};
    populateDog(dogData);
  })
};

const populateDog = (dogId) => {
  let dogData = fetchDogData(dogId);
  dogData.then(function(dogData){
    populateDoggo(dogData);
  });
};

const populateDoggo = (dogData) => {
  let doggoDiv = getDogContainer();
  // doggoDiv.id = "dog-info";
  doggoDiv.innerHTML = "";

  const div = document.createElement("div");
  doggoDiv.appendChild(div);
  div.id = "dog-info";

  const img = document.createElement("img");
  img.src = dogData.image;
  div.appendChild(img);


  const h2 = document.createElement("h2");
  div.appendChild(h2);
  h2.innerText = dogData.name;

  const button = document.createElement("button");
  button.id = "good-dog-button"
  div.appendChild(button);

  setButtonValue(dogData);

  button.addEventListener("click",function(event){
      dogData.isGoodDog = !isGoodDog();
      updateDogData(dogData)
      .then(res => res.json())
      .then(dogData => {
        setButtonValue(dogData);
        populateDog(dogData);
        populateDogs();
      });;
  });
};


function setButtonValue(dogData){
  if (dogData.isGoodDog){
    getGoodDogButton().innerText = "Good Dog!"
  } else {
    getGoodDogButton().innerText = "Bad Dog!"
  }
};

function isGoodDog(){
  return (getGoodDogButton().innerText == "Good Dog!" ? true : false)
}

function getDogBar(){
  return document.getElementById("dog-bar");
};

function getDogContainer(){
  return document.getElementById("dog-summary-container");
};

function getGoodDogButton(){
  return document.getElementById("good-dog-button");
}

function getGoodDogFilterButton(){
  return document.getElementById("good-dog-filter");
};
