const baseURL = "http://localhost:3000/pups";
let allDogs;

// add event listern for the DOM
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("good-dog-filter")
    .addEventListener("click", (event) => {
      const currentFilter = event.target.innerText === "Filter good dogs: ON";
      const filter = !currentFilter;
      const elements = document.getElementById("dog-bar").children;

      if (filter) {
        event.target.innerText = "Filter good dogs: ON";
        for (element of elements) {
          if (allDogs.find((dog) => dog.id === element.dogId)?.isGoodDog) {
            element.style.display = "flex";
          } else {
            element.style.display = "none";
          }
        }
      } else {
        event.target.innerText = "Filter good dogs: OFF";
        for (element of elements) {
          element.style.display = "flex";
        }
      }
    });

  getDogs();
});

// fetch all dogs function
function getDogs() {
  fetch(baseURL)
    .then((res) => res.json())
    .then((dogData) => {
      allDogs = dogData;
      dogData.forEach(renderDogs);
    });
}

// render dog function
function renderDogs(dog) {
  let span = document.createElement("span");
  span.innerText = dog.name;
  span.dogId = dog.id;

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
    debugger;
    // isGoodDog = !isGoodDog;
    dog.isGoodDog = !dog.isGoodDog;
    setGoodDog();
    // updatedDog(dog.id, isGoodDog);
    updatedDog(dog.id, dog.isGoodDog);
  });

  document.querySelector("#dog-bar").appendChild(span);
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
