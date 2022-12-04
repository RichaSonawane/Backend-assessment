const complimentBtn = document.getElementById("complimentButton");
//get the Dom element for fortune button
const fortuneBtn = document.getElementById("fortuneButton");
//for horoscope button
const horoscopeBtn = document.getElementById("signsButton");
let characterSection = document.querySelector(".horoscope");
//for goals
const goalContainer = document.querySelector("#goals-container");
const form = document.querySelector("form");

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};
//getFortune function
const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune/").then((res) => {
    const data = res.data;
    alert(data);
  });
};
//getHoroscope function
var signsarr = [];
const getHoroscope = () => {
  axios.get("http://localhost:4000/api/horoscope/").then((data) => {
    charactersArray = data.data;
    buildCards(data.data);
  });
};

function buildCards(results) {
  let cards = ``;
  for (let i = 0; i < results.length; i++) {
    cards += `
                    <div class="card">
                        <img alt='sign cover' src=${results[i].imageURL} class="signImg"/>
                        <p class="horoscope"><h3> ${results[i].title}</h3></p>
                        <p class="horoscope"> Horoscope: ${results[i].text}</p>
                    </div>
                `;
    // console.log(cards);
  }
  characterSection.innerHTML = cards;
}
const goalsCallback = ({ data: goal }) => displayGoals(goal);
const errCallback = (err) => console.log(err);

const getAllGoals = () =>
  axios
    .get("http://localhost:4000/api/goals/")
    .then(goalsCallback)
    .catch(errCallback);
const createGoal = (body) =>
  axios
    .post("http://localhost:4000/api/goals/", body)
    .then(goalsCallback)
    .catch(errCallback);
const deleteGoal = (id) =>
  axios
    .delete(`http://localhost:4000/api/goals/${id}`)
    .then(goalsCallback)
    .catch(errCallback);
const updateGoal = (id, type) =>
  axios
    .put(`http://localhost:4000/api/goals/${id}`, { type })
    .then(goalsCallback)
    .catch(errCallback);

function submitHandler(e) {
  e.preventDefault();

  let goal = document.querySelector("#goals");
  let words = document.querySelector("#words");
  let imageURL = document.querySelector("#img");
  let priority = document.querySelector("#priority");

  let bodyObj = {
    goal: goal.value,
    words: words.value,
    priority: priority.value,
    imageURL: imageURL.value,
  };

  createGoal(bodyObj);

  goal.value = "";
  words.value = "";
  priority.value = "";
  imageURL.value = "";
}

function createGoalCard(goal) {
  const goalCard = document.createElement("div");
  goalCard.classList.add("goal-card");

  goalCard.innerHTML = `<img alt='goal cover image' src=${goal.imageURL} class="goal-cover-image"/>
    <p class="goal"><h3>${goal.goal}</h3></p>
    <p class="goalWords">${goal.words}</p>
    <div class="btns-container">
        <button onclick="updateGoal(${goal.id},'minus')">-</button>
        <p>Goal Priority ${goal.priority}</p>
        <button onclick="updateGoal(${goal.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGoal(${goal.id})"> delete </button>
    `;

  goalContainer.appendChild(goalCard);
}
function displayGoals(arr) {
  goalContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createGoalCard(arr[i]);
  }
}

complimentBtn.addEventListener("click", getCompliment);
//event listener and handler
fortuneBtn.addEventListener("click", getFortune);
horoscopeBtn.addEventListener("click", getHoroscope);
//fot goals
form.addEventListener("submit", submitHandler);

getAllGoals();
