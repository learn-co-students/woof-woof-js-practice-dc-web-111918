document.addEventListener('DOMContentLoaded', function(){ 
	console.log('connected')
	getAllDogs();
	let filter = false;
	changeFilter(filter);

});

function changeFilter(filter){
	const filterBtn = document.querySelector('#good-dog-filter')
	filterBtn.addEventListener('click', function(){
		fetch('http://localhost:3000/pups')
		.then(res => res.json())
		.then(dogs1 => {
			if(filter === false) {
				filter = true;
				filterBtn.innerText = 'Filter good dogs: ON';
				return dogs1.filter(dog => dog.isGoodDog)
			} else {
				filter = false;
				filterBtn.innerText = 'Filter good dogs: OFF';
				return dogs1;
			}})
		.then(dogs => {
			const showDog = document.querySelector('#dog-bar')
			while (showDog.firstChild) {
		    	showDog.removeChild(showDog.firstChild);
			}
			dogs.forEach(dog => {
				renderDogBar(dog)
			})
		})
	})
}

function getAllDogs(){
	fetch('http://localhost:3000/pups')
		.then(res => res.json())
		.then(dogs => {
			dogs.forEach(dog =>{
				renderDogBar(dog)
			})
		})
}

function renderDogBar(dog){
	const showDog = document.querySelector('#dog-bar')
	const dogDiv = document.createElement('span')
	dogDiv.innerText = dog.name
	// dogDiv.id = `dog-${id}`
	
	dogDiv.addEventListener('click', function(){
		dogClicked(dog)
	})
	showDog.appendChild(dogDiv)
}

function dogClicked(dog){
	const infoPup = document.querySelector('#dog-info')
	// infoPup.innerHTML = '';
	while (infoPup.firstChild) {
    	infoPup.removeChild(infoPup.firstChild);
	}


	const image = document.createElement('img')
	image.src = dog.image
	infoPup.appendChild(image)

	const pupName = document.createElement('h2')
	pupName.innerText = dog.name
	infoPup.appendChild(pupName)

	const dogBtn = document.createElement('button')
	dogBtn.classList.add('toggle-btn')
	dogBtn.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'

	dogBtn.addEventListener('click', function(){
		patchDog(dog);
		dog.isGoodDog = !dog.isGoodDog
	});
	infoPup.appendChild(dogBtn)
}

function patchDog(dog){
	fetch(`http://localhost:3000/pups/${dog.id}`, {
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json",
  			"Accept": "application/json"
		},
		body: JSON.stringify({
			isGoodDog: !dog.isGoodDog 
		})
	}).then(res => res.json())
	.then(updatedDog => {
		const toggleBtn = document.querySelector('.toggle-btn');
		toggleBtn.innerText =  updatedDog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
	})
	
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







