const complimentBtn = document.getElementById("complimentButton");
//get the Dom element for fortune button
const fortuneBtn = document.getElementById("fortuneButton");
//for horoscope button
const horoscopeBtn = document.getElementById("signsButton");
let characterSection = document.querySelector(".horoscope");

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
                        <p class="horoscope"> ${results[i].title}</p>
                        <p class="horoscope"> Horoscope: ${results[i].text}</p>
                        <img alt='sign cover' src=${results[i].imageURL} class="signImg"/>
                    </div>
                `;
    // console.log(cards);
  }
  characterSection.innerHTML = cards;
}

complimentBtn.addEventListener("click", getCompliment);
//event listener and handler
fortuneBtn.addEventListener("click", getFortune);
horoscopeBtn.addEventListener("click", getHoroscope);
