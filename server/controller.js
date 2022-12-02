const signs = require("./db.json");

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },
  getFortune: (req, res) => {
    const fortune = [
      "Adventure can be real happiness.",
      "Congratulations! You are on your way.",
      "Don’t just think, act!",
      "Each day, compel yourself to do something you would rather not do.",
      "Happy life is just in front of you.",
      "In order to take, one must first give.",
      "Strong reasons make strong actions.",
      "Those who care will make the effort.",
      "When your heart is pure, your mind is clear.",
    ];
    //choose random fortune
    let randomId = Math.floor(Math.random() * fortune.length);
    let randomFortune = fortune[randomId];

    res.status(200).send(randomFortune);
  },
  getHoroscope: (req,res) =>{
    res.status(200).send(signs)
  }
};
