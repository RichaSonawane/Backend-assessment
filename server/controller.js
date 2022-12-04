const signs = require("./db.json");
const goals = [
  {
    id: 1,
    goal: "Look after my body",
    words: "Do yoga and spin classes",
    priority: 1,
    imageURL:
      "https://media.istockphoto.com/id/1217085312/vector/happy-woman-hugging-herself.jpg?s=612x612&w=0&k=20&c=6cCzjDFxJl0-AoM7wf4ptB_uTZFQboNrhQq_6pOuh8M=",
  },
  {
    id: 2,
    goal: "Cherish friends and family.",
    words: "Spend more quality time with mom.",
    priority: 2,
    imageURL:
      "https://media.istockphoto.com/id/1153633559/vector/faceless-family-resting-at-home-idyllic-cartoon.jpg?s=612x612&w=0&k=20&c=C71oUz7cDQnziyS0ci6rjiVxJBoTlv4juy8Gq-r4-c8=",
  },
  {
    id: 3,
    goal: "Travel more",
    words: "Atleast 2 family vacation in a year.",
    priority: 3,
    imageURL:
      "https://media.istockphoto.com/id/1205908639/vector/family-home-and-vacation-activities-vectors-set.jpg?s=612x612&w=0&k=20&c=ExDocnCZfoF9GfGbl_HDgQrLEdqO1L-J_lxWgM3Algk=",
  },
];
let globalId = 4;

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
  getHoroscope: (req, res) => {
    res.status(200).send(signs);
  },
  //for vision board
  getGoals: (req, res) => res.status(200).send(goals),
  deleteGoals: (req, res) => {
    let index = goals.findIndex((elem) => elem.id === +req.params.id);
    goals.splice(index, 1);
    res.status(200).send(goals);
  },
  createGoals: (req, res) => {
    let { goal, words, priority, imageURL } = req.body;
    let newGoal = {
      id: globalId,
      goal,
      words,
      priority,
      imageURL,
    };
    goals.push(newGoal);
    res.status(200).send(goals);
    globalId++;
  },
  updateGoals: (req, res) => {
    let { id } = req.params;
    let { type } = req.body;
    let index = goals.findIndex((elem) => +elem.id === +id);
    if (goals[index].priority <= 10 && type === "minus") {
      goals[index].priority = 0;
      res.status(200).send(goals);
    } else if (type === "plus") {
      goals[index].priority += 1;
      res.status(200).send(goals);
    } else if (type === "minus") {
      goals[index].priority -= 1;
      res.status(200).send(goals);
    } else {
      res.sendStatus(400);
    }
  },
};
