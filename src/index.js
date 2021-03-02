const baseURL = "http://localhost:3000/pups";
let allDogs;
let filter = false;

// add event listern for the DOM
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("good-dog-filter")
    .addEventListener("click", () => {
      filter = !filter;
      filterGoodDogs();
    });

  getDogs();
});

function filterGoodDogs() {
    const elements = document.getElementById("dog-bar").children;
    const filterButton = document.getElementById("good-dog-filter")

    if (filter) {
      filterButton.innerText = "Filter good dogs: ON";
      for (element of elements) {
        if (allDogs.find((dog) => dog.id === element.dogId)?.isGoodDog) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
      }
    } else {
      filterButton.innerText = "Filter good dogs: OFF";
      for (element of elements) {
        element.style.display = "flex";
      }
    }
}

// fetch all dogs function
function getDogs() {
  fetch(baseURL)
    .then((res) => res.json())
    .then((dogData) => {
      allDogs = dogData;
      dogData.forEach(addDog);
    });
}

// add dog function
function addDog(dog) {
  let span = document.createElement("span");
  span.innerText = dog.name;
  span.dogId = dog.id;
  span.addEventListener('click', () => {
      showDog(dog);
  });

  document.querySelector("#dog-bar").appendChild(span);
}

function showDog(dog) {
    let h2 = document.createElement("h2");
    h2.innerText = dog.name;
  
    let img = document.createElement("img");
    img.src = dog.image;
  
    //   let isGoodDog = dog.isGoodDog;
    let btn = document.createElement("button");
  
    const setGoodDog = () => {
      // if (isGoodDog) {
      if (dog.isGoodDog) {
        btn.innerText = "Good Dog!";
      } else {
        btn.innerText = "Bad Dog";
      }
    };
  
    setGoodDog();
  
    btn.addEventListener("click", () => {
      dog.isGoodDog = !dog.isGoodDog;
      setGoodDog();
      updatedDog(dog.id, dog.isGoodDog);
      filterGoodDogs();
    });
  
    document.getElementById("dog-info").innerHTML = '';
    document.querySelector("#dog-info").append(img, h2, btn);
  }

function updatedDog(dogID, isGoodDog) {
  const body = { isGoodDog: isGoodDog };
  fetch(`${baseURL}/${dogID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  // fetch(baseURL + "/" + dogID)
}
